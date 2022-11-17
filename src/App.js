import React, { useState } from "react";
import axios from "axios";

/**
 * L'API envoit les données en Kelvin et mph 
 * Pour convertir Kelvin en Celcius je vais soustraire 273 
 * Pour convertir Mph en kmh je multiplis par 1.609344 
 * La fonctionnalité .toFixed() permet d'arrondir a 2 chiffres apres la virgule
 */

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2f4363e05912089afa861d6f1a3fb25c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data)
      });
      setLocation("");
    }
  };

  
  //ajouter la date 
  //
  const dateBuilder = (d) => {
    let months = ["January","February ","March ","April ","May ","June ","July ","August ","September","October ","November ","December"];
    let days =["Sunday","Monday ","Tuesday ","Wednesday  ","Thursday ", "Friday ","Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year} `
  }
  
  return (

    <div className={
      (typeof data.main != "undefined") 
      ? ((data.main.temp > 18 +(273)) 
        ? "app warm" : "app") 
      : "app"}>

      <main>

      <div className="search">
        <input
          type="text"
          value={location}
          placeholder="Enter location"
          onKeyPress={searchLocation}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>

      
      <div className="container">
        <div className="top">
          <div className="location">
            {data.name ? <p className="name">{(data.name) + " , "}</p>: null }
            {data.name ? <p>{data.sys.country}</p> : null }
          </div>

          <div className="date">
            {data.name ? <p>{dateBuilder(new Date())}</p> : null }
          </div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed() - (273)}°C</h1> : null}
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        
        {data.name != undefined && (

          <div className="bot">

            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {data.main.feels_like.toFixed() - (273)}°C
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>

            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>

            <div className="wind">
              {data.wind ? (
                <p className="bold">
                  {" "}
                  {data.wind.speed * (1.609344).toFixed()}KMH
                </p>
              ) : null}
              <p>Wind</p>
            </div>

          </div>

        )}

      </div>

      </main>
    </div>
  );
}

export default App;




