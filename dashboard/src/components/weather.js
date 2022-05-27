import React from 'react';
import './styles.css';
import moment from 'moment';

const CardExampleCard = ({weatherData}) => (
  <div className="main">
      <p className="header">{weatherData.server.services[0].widgets[0].data[0].name}</p>
      <div className="flex">
        <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
        <p className="description">{weatherData.server.services[0].widgets[0].data[0].situation[0].main}</p>
      </div>

      <div className="flex">
        <p className="temp">Temprature: {weatherData.server.services[0].widgets[0].data[0].temp} &deg;C</p>
        <p className="temp">Humidity: {weatherData.server.services[0].widgets[0].data[0].humidity} %</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">Sunrise: {new Date(weatherData.server.services[0].widgets[0].data[0].sunrise * 1000).toLocaleTimeString('en-GB')}</p>
        <p className="sunrise-sunset">Sunset: {new Date(weatherData.server.services[0].widgets[0].data[0].sunset * 1000).toLocaleTimeString('en-GB')}</p>
      </div>
     
  </div>
)

export default CardExampleCard;