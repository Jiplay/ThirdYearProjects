
### If you want to run the app with docker

Basically, you can't rn, but you can launch the server with :

0) If 1st time -> ```(sudo) docker-compose up --build```

1) docker-compose up

2) done :)
   

# Dashboard
Dashboard is a third year project @ EPITECH

The project decompose itself in 3 parts :

1) Front in react.js (localhost:3000)

2) Back in node.js (localhost:8080)

3) Realtime database with Firebase

  ```mermaid
graph LR
A[Front] 
B[Back]
C[Database]
A -->B --> C
```

The front should (if possible) ask to the back to deal with request.

The back should, listen to them and ask Internet or Database to fufill them.

Firebase manage authentification system.

  ## How do i do.. launch the project with docker

Go at the root of the repo and type ``docker-compose up --build``
If it doesn't work, use ``sudo docker-compose up --build``
Then you can go here http://localhost:3000

If you're using Chrome, add this extension to enable communication between 2 localhost project.  https://mybrowseraddon.com/access-control-allow-origin.html 

## How do I do.. ask something to the Server ?

Example :
```javascript
await fetch(`http://localhost:8080/about.json?lat=${lat}&long=${long}`, {
	headers : {
	'Content-Type': 'application/json',
	'Accept': 'application/json',
	'mode': 'no-cors'
}
})
```
You can do this way :
	1) First the adress
	2) specify wich part of the app you wanna access
	3) Put these values in header (it's for accessing between 2 localhosts adresses)
  
 ## How do I do.. Tell the server listen to localhost:8080/<new_things> ?
Example in server/index.js
```javascript
app.get('/user', async (req, res) => {
let  user  =  usernameParser(req.url)
let  data  =  await  getDataFromDB(user);

if (data.widgets ===  undefined) {
  writeDataInDB(user, true)
  } else {
    let  final  =  JSON.stringify(data);
    res.end(final);
  }
})
```
You just have to copy and edit the first line, if you don't want it to be asynchrone
you can remove  `async`  from the line. But most of the time, you need it

## How do i do.. Add a service in localhost:8080/about.json
Example with widget to show weather in California
```json
"services": [{
  "name":  "weather",
  "widgets": [{
    "name":  "your city temperature",
    "description":  "display your city temperature and some other cool infos",
    "data": [{
      "situation":  resp.weather,
      "name":  resp.name,
      "sunrise":  resp.sys.sunrise,
      "sunset":  resp.sys.sunset,
      "humidity":  resp.main.humidity,
      "temp":  resp.main.temp,
    }]
  }]
  },
  {
    "name":  'weather in California',
    "widgets": [{
       "name":  "weather in california",
      "description":  "it shows the weather and some cool infos",
      "data": [{
        "data1":  "data",
      }]
  }]
}]
```

You should fetch data with request, if you don't know how to do it, scroll up

## How do i do.. check what is in database

Ask someone with access to the project on https://firebase.google.com/
then go to console -> select our project -> realtime database -> data

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

 Then another developer will review your code and merge it 

Please make sure to update tests as appropriate.

## License

EPITECH 3rd year Project## UML diagrams
