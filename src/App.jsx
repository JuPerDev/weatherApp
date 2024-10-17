import { useState } from "react";
import viteLogo from "/vite.svg";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (city.length > 0) fetchWeather(city);
  };
  const URL_BASE = "https://api.openweathermap.org/data/2.5/weather?q=";
  const API_KEY = "b8a84cd64b007bd7f7ea5f208fe1850e";
  const fetchWeather = async (city) => {
    try {
      const res = await fetch(
        `${URL_BASE}${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center items-center flex-col p-4 gap-4'>
      <div className='container flex justify-center items-center flex-col p-4 gap-4'>
        <h1 className='text-3xl text-blue-500'>Weather App</h1>
        <form
          action=''
          onSubmit={onSubmit}
          className='flex w-[600px] items-center justify-center gap-4'
        >
          <input
            type='text'
            value={city}
            className='ring-1 ring-blue-500 w-60 px-4 py-2 rounded-md'
            onChange={handleCityChange}
            placeholder='Enter a city'
            required
          />
          <button
            type='submit'
            className='bg-blue-500 text-slate-50 px-4 py-2 rounded-md'
          >
            Search
          </button>
        </form>
      </div>
      {weatherData.name ? (
        <div className='flex flex-col items-center justify-center gap-4 w-[400px] bg-slate-50 rounded-xl p-6 drop-shadow-lg'>
          <h1 className='text-3xl text-blue-500'>{weatherData.name}</h1>
          <p className='text-2xl'>{Math.round(weatherData.main.temp)}</p>
          <p className='text-xl text-slate-500'>
            {weatherData.weather[0].description}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt=''
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
