import './App.css';
import { useState, useEffect } from "react"
import axios from 'axios';

function App() {
  const [weather, setweather] = useState(null)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=363a0329911c1b074081245aae1023c3&units=metric`)
      .then(res => {
        const newWeather = res.data;
        console.log(newWeather);

        setweather(newWeather);
      });

  }, []);

  return (
    <div>

      {/* <h1>{weather?.main?.temp}</h1> */}

      {
        (weather !== null) ?
          <>
            {weather.name} Weather
            <h1>{weather?.main?.temp}</h1>
            <h2>{weather?.weather[0].description}</h2>
            <h2>Wind Speed: {weather?.wind.speed}</h2>
          </>
          :
          <h1>Loading...</h1>
      }

    </div>
  );
}
export default App;
