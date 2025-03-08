import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const [temp, updateTemp] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5a0f7ce8698587978535d40301c86747
  `

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  const updateC = ev => updateTemp({
    c: ev.target.value,
    f: (+ev.target.value * 9 / 5 + 32).toFixed(2)
  })
  const updateF = ev => updateTemp({
    c: ((+ev.target.value - 32) * 5 / 9).toFixed(2),
    f: ev.target.value
  })

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter the Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{(((data.main.temp - 32) * 5) / 9).toFixed()}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
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
                  {data.wind.speed * (1.60934).toFixed()} KPH
                </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}

        <div className="bottom">
          {data.main ? (
            <>
              <p>
                {(() => {
                  const tempCelsius = ((data.main.temp - 32) * 5) / 9;
                  if (tempCelsius < 0) {
                    return "It's freezing cold today!";
                  } else if (tempCelsius >= 0 && tempCelsius < 15) {
                    return "It's quite chilly today.";
                  } else if (tempCelsius >= 15 && tempCelsius < 25) {
                    return "The weather is pleasant today.";
                  } else if (tempCelsius >= 25 && tempCelsius < 35) {
                    return "It's warm today.";
                  } else {
                    return "It's really hot today!";
                  }
                })()}
              </p>
            </>
          ) : null}
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div id="box2">
              {" "}
              <h3>Fahrenheit</h3>
              <input type="number" value={temp.f} onChange={updateF}></input>
            </div>

            <div id="box1">
              <h3>Celsius</h3>
              <input type="number" value={temp.c} onChange={updateC}></input>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;