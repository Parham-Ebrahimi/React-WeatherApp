import React, {useState} from 'react'
import axios from 'axios'
import rain from './assets/rain.png'
import cloud from './assets/clouds.png'
import clear from './assets/clear.png'
import drizzle from './assets/drizzle.png'
import mist from './assets/mist.png'
import snow from './assets/snow.png'
import wind from './assets/wind.png'
import temp from './assets/temp.png'
import looks from './assets/looks.png'
import feel from './assets/feel.png'

function App() {
const [data, setData] = useState({})
const [city, setCity] = useState('')
const [imgSrc, setImgSrc] = useState(rain)
const [showDescription,setShowDescription] = useState(false)

const forecast = new Map([
  ['Clouds', cloud],
  ['Rain', rain],
  ['Clear', clear],
  ['Drizzle', drizzle],
  ['Mist', mist],
  ['Snow', snow],
])
const api_key ='72714c8c3b41107818ad03b8e7c7b200'
//api calls
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`

const searchCity = (event) => {
  axios.get(apiUrl)
    .then((response) => {
      const weatherData = response.data;
      setData(weatherData);

      // Check for weather data and update image source
      if(forecast.has(weatherData.weather[0].main)) {
        setImgSrc(forecast.get(weatherData.weather[0].main))
      }
    }).catch(function (error) {
      if(error.response.status === 400){
        console.log("Please enter a city")
      }
      if(error.response.status === 404){
        console.log("Please enter a city")
      }
    });
  setCity('');
  setShowDescription(true)
};

return (
//front end
    <div className="app">
      <div className="container">
        <div className="search">
          <input
            value= {city} 
            onChange ={event => setCity(event.target.value)}
            placeholder='Enter Location'
            type="text"
          />
          <button onClick={searchCity}>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
          </button>
        </div>
        {showDescription &&
        <div>
        <img src={imgSrc} className="weather-icon" alt=""/>
          <div className="location">
            <h1>{data.name}</h1>
          </div> 
        </div> }
        {showDescription &&
        <div className="weather">
          <div className="temp">
            <img src={temp}></img>
            <p>{data.main ? `${data.main.temp}° F` : 'N/A'}</p>
          </div>
          <div className="description">
            <img src={looks}></img>
            <p>{data.weather ? data.weather[0].description : 'N/A'}</p>
          </div>
          <div className="feels">
            <img src={feel}/>
            <p>{data.main ? `Feels likes ${data.main.feels_like}° F` : 'N/A'}</p>
          </div>
          <div className="windspeed">
            <img src={wind} alt=""></img>
            <p>{data.wind ? `The wind of ${data.wind.speed} mph` : 'N/A'}</p>
          </div>
        </div> }
      </div>
    </div>
  );
}

export default App;

