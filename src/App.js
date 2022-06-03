import React, { useState } from 'react';

const api = {
  key: 'e1f1d4d5e93c88b7d691f31c54f679f9', //free api
  base: "https://api.openweathermap.org/data/2.5/"
}


// Date Method 1
// const datebuilder = (d) => {
//   let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//   let days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   let day = days[d.getDay()];
//   let month = months[d.getMonth()];
//   let year = d.getFullYear();
//   let date = d.getDate();

//   return `${day} ${date} ${month} ${year}`
// }

// Date Method 2
let date = String(new window.Date())
date = date.slice(3, 15)

function App() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState('');
  const [title, setTitle] = useState('Welcome to WeatherApp');


  const titlehandler = () => {
    setTitle('');
  }

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${input}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setInput('');
          titlehandler();
          console.log(result);
        }
        )
    };
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app hot' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input className='search-bar' type="text" placeholder='Search' onChange={e => setInput(e.target.value)} value={input} onKeyPress={search}></input>
        </div>
        <div className='title-box'>
          <h2>{title}</h2>
        </div>
        {
          (typeof weather.main != "undefined") ? (
            <div>
              <div className='location-box'>
                <div className='location'>{weather.name}, {weather.sys.country}</div>
                <div className='date'>{date}</div>
              </div>
              <div className='weather-box'>
                <div className='temp'>{Math.round(weather.main.temp)}°c
                </div>
                <div className='weather'>{weather.weather[0].main}</div>

              </div>
            </div>
          ) : ('')
        }
      </main >

    </div >
  );
}

export default App;
