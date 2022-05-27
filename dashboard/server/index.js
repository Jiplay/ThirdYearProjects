import fetch from "node-fetch";
import express from 'express';
import cors from 'cors'
import firebase from "firebase/compat/app";
import config from './config.js';
import { getDatabase, ref, set, child, get } from "firebase/database";

const app = express()
var long, lat = 0;


app.get('/user', async (req, res) => {
  let user = usernameParser(req.url, 0)
  let data = await getDataFromDB(user);
  
  if (data.widgets === undefined) {
    writeDataInDB(user, '11111')
  } else {
    let final = JSON.stringify(data);
    res.end(final);
  }
})

app.get('/update', async (req, res) => {
  try {
    let user = usernameParser(req.url, 1)
    let data = await getDataFromDB(user)
    let widgets = await findWidget(req.url, data.widgets);

    writeDataInDB(user, widgets)
  } catch (error) { 
    console.log('error :  ', error)
  }
  res.end('  ')
})


app.get('/weather', async (req, res) => {
  try {
    let loc = await getLocFromURL(req.url)
    let response = await call_to_get_located_weather(loc)
    let data = JSON.stringify(response);
    res.end(data);
  } catch (error) { 
    console.log('error :  ', error)
  }
})

app.get('/picture', async (req, res) => {
  try {
    let loc = await getLocFromURL(req.url)
    let response = await call_to_get_located_pic(loc)
    let data = JSON.stringify(response);
    res.end(data);
  } catch (error) { 
    console.log('error :  ', error)
  }
})


app.get('/', (req, res) => {  
  let response = {
    "client": {
        "host": req.ip,
        "latitude": lat,
        "longitude": long,
    },
    "server": {
        "current_time": Math.floor(new Date().getTime() / 1000),
        "services": [{
          "name": "weather",
          "widgets": [{
            "name": "your city temperature",
            "description": "display your city temperature and some other cool infos",
            "data": [{
              "situation": "N/A",
              "name": "N/A",
              "sunrise": "N/A",
              "sunset": "N/A",
              "humidity": "N/A",
              "temp": "N/A",
            }]
          }]
        }]
    }
};
let data = JSON.stringify(response);
res.end(data);
})

app.get('/call', async (req, res) => {
  res.writeHead(200);
  let coord = parser(req.url);
  lat = coord[0];
  long = coord[1];
  let resp = await call_to_get_weather(coord)
  try {
    let response = {
        "client": {
            "host": req.ip,
            "latitude": lat,
            "longitude": long,
        },
        "server": {
            "current_time": Math.floor(new Date().getTime() / 1000),
            "services": [{
              "name": "weather",
              "widgets": [{
                "name": "your city temperature",
                "description": "display your city temperature and some other cool infos",
                "data": [{
                  "situation": resp.weather,
                  "name": resp.name,
                  "sunrise": resp.sys.sunrise,
                  "sunset": resp.sys.sunset,
                  "humidity": resp.main.humidity,
                  "temp": resp.main.temp,
                }]
              }]
            }]
        }
    };
    let data = JSON.stringify(response);
    res.end(data);
  } catch (error) {
  }
})

app.get('/about.json', async (req, res) => {

  let response = {
    "client": {
        "host": req.ip,
    },
    "server": {
        "current_time": Math.floor(new Date().getTime() / 1000),
        "services": [{
          "name": "weather",
          "widgets": [{
            "name": "weather on your localisation with lat / long",
            "description": "display your city temperature and some other cool infos",
            "params": [{
              "situation": 'string',
              "name": 'string',
              "sunrise": 'string',
              "sunset": 'string',
              "humidity": 'string',
              "temp": 'string',
            }]
          }]
        },
        {
          "name": "Google maps",
          "widgets": [{
            "name": "maps around your position",
            "description": "display a map",
            "params": [{
              "latitude": "int",
              "longitude": "int",
            }]
          }]
        },
        {
          "name": "Google Calendar (Oauth2)",
          "widgets": [{
            "name": "Calendar",
            "description": "Add an event on user Google Calendar",
            "params": [{
              "date": "string",
              "title": "string",
              }
            ]
          }]
        },
        {
          "name": "pictures around the world",
          "widgets": [{
            "name": "pictures around the world",
            "description": "a pic of a city, wherever you want on Earth",
            "params": [{
              "city": "string",
            }]
          }]
        },
        {
          "name": "Weather around the world",
          "widgets": [{
            "name": "weather around the world",
            "description": "the weather wherever you want on Earth",
            "params": [{
              "city": "string",
            }]
          }]
        },
        {
          "name": "CurrConv(ertissor)",
          "widgets": [{
            "name": "Convertissor",
            "description": "convert devises",
            "params": [{
              "first_devise": "string",
              "second_devise": "string",
            }]
          }]
        }]
      } 
    };
  let data = JSON.stringify(response);
  res.end(data);
})


app.use(cors());
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

function getLocFromURL(url) {
  return(url.substr(9));
}

function findWidget(url, data) {
  let delimiter = url.indexOf(',') +1;
  let newData = url.substr(delimiter, url.length)
  let dest = '';
  let count = 0;

  for (let index = 0; index < data.length; index++) {
    if (newData[0].toString() === count.toString()) {
      if (data[index] === '1') {
        dest = dest + '0';
      } else {
        dest = dest + '1';
      }
    } else {
      dest = dest + data[index]
    }
    count++;
  }
  return dest;
}

function usernameParser(url, mode) {
  let delimiter = url.indexOf('?') + 1;
  
  if (mode !== 1) {
    return (url.substr(delimiter, url.length))
  }
  let delimiterbis = url.indexOf(',');
  let temp = url.substr(delimiter, delimiterbis+1)

  return (temp.slice(0, -2))
}

function writeDataInDB(user, str) {
  firebase.initializeApp(config)
  var db = getDatabase();
  set(ref(db, '/' + user), {
    username: user,
    widgets: str,
  });
}

async function getDataFromDB(user) {
  firebase.initializeApp(config)
  var dbRef = ref(getDatabase());
  var rep = '';
  
  await get(child(dbRef, `${user}`)).then((snapshot) => {
    if (snapshot.exists()) {
      rep = snapshot.val();
    } else {
      console.log("No data available for ", user);
    }
  }).catch((error) => {
    console.error(error);
  });
  return (rep)
}

function parser(query)
{
  let lat_begin = query.indexOf("lat=") + 4;
  let lat_last = query.indexOf("&");
  let length = lat_last - lat_begin;
  let latitude = query.substr(lat_begin, length);

  let long_begin = query.lastIndexOf("long=");
  let long_last = query.length;
  length = long_last - long_begin - 5;
  let longitude = query.substr(long_begin + 5, length -3);
  return [latitude, longitude];
}

async function call_to_get_weather(resp) 
{
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${resp[0]}&lon=${resp[1]}&units=metric&APPID=d842cd4afcad440de77e45f608352f6c`);
  const json = await response.json();

  return json;
}

async function call_to_get_located_weather(loc) 
{
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=ab22018089b37f82cc084867cd1a3743&units=metric`);
  const json = await response.json();

  return json;
}

async function call_to_get_located_pic(loc) 
{
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${loc}&client_id=cVZ4QXCGnje3KUPaa3YiAV6V4lN3a-h5OreKuVXsBbA`);
  const json = await response.json();

  return json;
}

app.listen(8080)
