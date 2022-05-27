import React, { useEffect, useState } from "react";
import "./App.css"
import firebase from "firebase/compat/app"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "firebase/compat/auth"
import Weather from './components/weather';
import GoogleMap from './components/googlemap';
import CurrencyConverter from './components/convert';
import Calendar from './components/calendar';


firebase.initializeApp({
  apiKey: "AIzaSyB_Ms58SWfl04H1ZhPR3-5pChdNn9tGJOg",
  authDomain: "fir-auth-dashboard.firebaseapp.com"
})

async function updateData(nb) {
  try {
    console.log(firebase.auth().currentUser.getIdToken())
    await fetch(`http://localhost:8080/update?${firebase.auth().currentUser.displayName},${nb}`, {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'mode': 'no-cors'
       }
      })
  } catch (error) {
  }
}

function App() {
  const [isSigned, setInSigned] = useState(false)
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);// eslint-disable-next-line
  const [data, setData] = useState([]); // eslint-disable-next-line no-unused-vars
  const [time, setTime] = useState(Date.now());// eslint-disable-next-line
  const [userData, setUserData] = useState();

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 3000);
      return () => {
        askDatabase()
        clearInterval(interval)
      };
  },);

  const uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
          signInSuccess: () => false
      }
  }
  const [weather, setWeather] = useState({});// eslint-disable-next-line
  const [locations, setLocations] = useState("london");// eslint-disable-next-line
  var [previousLoc, setPreviousLoc] = useState("");
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    ifClicked();
  });
  function ifClicked() {
    if (locations !== previousLoc) {
      setPreviousLoc(locations)
      fetch(
            `http://localhost:8080/weather?${locations}`
        )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((object) => {
          setWeather(object);
        })
        .catch((error) => console.log(error));
      fetch(
        `http://localhost:8080/picture?${locations}`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("You made a mistake");
          }
        })
        .then((data) => {
          setPhotos(data?.results[0]?.urls?.raw);
        })
        .catch((error) => console.log(error));
      }
    }

  firebase.auth().onAuthStateChanged(user => {
    setInSigned(!!user)
  })

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    
      await fetch(`http://localhost:8080/call?lat=${lat}&long=${long}`, {
          headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'mode': 'no-cors'
         }
        })
        .then(res => res.json())
        .then(result => {
          setData(result)
        });
    }
    fetchData();
    console.log(data.main); // eslint-disable-next-line
  }, [lat, long]);

  function processInfo(userData, nb) {
    try {
      if (userData.widgets[nb] === '1')
        return 1;
      return 0;
    } catch (error) {
    }
  }

  async function askDatabase() {
    try {
      await fetch(`http://localhost:8080/user?${firebase.auth().currentUser.displayName}`, {
          headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'mode': 'no-cors'
         }
        }).then(res => res.json())
        .then(result => {
          setUserData(result)
        })
    } catch (error) {
    }
  }

  return (
    <div className="container">
      {isSigned ? (
        <span>
          <div className="app">
            <div className="wrapper">
              <div className="search">
                <input
                  type="text"
                  value={locations}
                  onChange={(e) => setLocations(e.target.value)}
                  placeholder="Enter location"
                  className="location_input"
                />
                <button className="location_searcher" onClick={ifClicked}>
                  Search Location
                </button>
              </div>
              <div className="app__data">
                <p className="temp">Current Temparature: {weather?.main?.temp}</p>
              </div>
              <img className="app__image" src={photos} alt="" />
            </div>
          </div>
          <div className="openweather">
              {(typeof data.client != 'undefined' && processInfo(userData, 0) === 1) ? (
              <Weather weatherData={data}/>
              ): (
              <div></div>
              )}
          </div>
          <div className="convert">
              {(typeof data.client != 'undefined' && processInfo(userData, 1) === 1) ? (
              <CurrencyConverter CurrencyConverterData/>
              ): (
              <div></div>
              )}
          </div>
          <div className="Event">
              <Calendar Calendar/>
          </div>
          <div className="map">
              {(typeof data.client != 'undefined') && processInfo(userData, 2) === 1 ? (
              <GoogleMap GoogleMapData={data}/>
              ): (
              <div></div>
              )}
          </div>
          <input class="signout" type="button" value="Sign out!" onClick={()=>firebase.auth().signOut()}/>
          <input class="HideWidgets" type="button" value="Able/Disable Widgets 1" onClick={() => updateData('0')}/>
          <input class="HideWidgets1" type="button" value="Able/Disable Widgets 2" onClick={() => updateData('1')}/>
          <input class="HideWidgets2" type="button" value="Able/Disable Widgets 3" onClick={() => updateData('2')}/>
        </span>
      ) : (
        <StyledFirebaseAuth
          uiConfig = {uiConfig}
          firebaseAuth={firebase.auth()}
        />
        )
      }
    </div>
  );
}

export default App;