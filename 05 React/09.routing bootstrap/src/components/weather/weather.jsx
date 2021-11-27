
import { useState, useEffect, useRef } from "react"
import axios from 'axios';

function Weather() {
  const [weather, setweather] = useState(null)

  // const [cityName, setCityName] = useState("karachi")
  const cityName = useRef(null);

  const [location, setLocation] = useState(null)

  const [submit, setSubmit] = useState(false)

  useEffect(() => {

    let name = "";

    if (cityName.current.value) {
      name = `q=${cityName.current.value}`
    } else if (location) {
      
      if (!location) {

      } else if (location === "fail") {
        name = "q=new york";
      } else if (location && location.latitude) {
        name = `lat=${location.latitude}&lon=${location.longitude}`
      }
    }

    console.log("name: ", name)
    if (name) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?${name}&appid=363a0329911c1b074081245aae1023c3&units=metric`)
        .then(res => {
          const newWeather = res.data;
          // console.log("newWeather: ", newWeather);

          setweather(newWeather);
        });
    }

  }, [submit, location]);


  useEffect(() => {

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("position got: ", position.coords.latitude);
          // console.log("position got: ", position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })

        }, function (error) {

          setLocation("fail")

        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    getLocation()

  }, []);

  return (
    <div>

      <h1>City Name:</h1>
      {/* <input onChange={(e) => {

        console.log("e: ", e.target.value)
        setCityName(e.target.value)
      }} /> */}
      <input ref={cityName} />

      <button onClick={() => {

        console.log("name: ", cityName.current.value)

        setSubmit(!submit)

      }} >Submit</button>

      <br />

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
export default Weather;
