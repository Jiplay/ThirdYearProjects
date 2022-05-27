import React, { useState } from 'react';
import { render } from "react-dom";


function dateConvertor(date, bool) {
  let data = date.replace(' ', '');
  let resp = '2022-XX-YYT09:00:00-07:00'

  resp = resp.replace('YY', data.substring(0, 2))
  resp = resp.replace('XX', data.slice(-2))
  
  if (bool === 1) {
    resp = resp.slice(0, -14)
    resp = resp + '17:00:00-07:00'
  } 
  return resp
}

const Calendar = () => {
  const [date, setDate] = useState("17/01");
  const [title, setTitle] = useState("Usman bd");

  var gapi = window.gapi
  var CLIENT_ID = "252043609237-pkr40igh8j04f43qjlca16nnp9438fo0.apps.googleusercontent.com"
  var API_KEY = "AIzaSyB_Ms58SWfl04H1ZhPR3-5pChdNn9tGJOg"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const handleClick = (date, setTitle) => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('user loged in!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': title,
          'location': 'zoom.com/713705',
          'description': 'Happy birthday :)',
          'start': {
            'dateTime': dateConvertor(date, 0),
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': dateConvertor(date, 1),
            'timeZone': 'America/Los_Angeles'
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
      })
    })
  }

  return (
    <div className="App">
      <header className="App-header">
      <p>Don't forget his/her birthday, add it to your calendar !</p>
      <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="currency"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="currency"
        />
        <button className="converter" onClick={() => {
            handleClick(date, title);}}>
          Add EVENT
        </button>
      </header>
    </div>
  );
}

render(<Calendar />, document.querySelector("#root"));
export default Calendar;
