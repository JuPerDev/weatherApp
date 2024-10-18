import { useEffect, useState } from "react";
import trash_icon from "/trash.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(
    () => JSON.parse(localStorage.getItem("weatherData")) || []
  );
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("weatherData", JSON.stringify(weatherData));
  }, [weatherData]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (city.length > 0) fetchWeather(city);
    setCity("");
  };
  const URL_BASE = "https://api.openweathermap.org/data/2.5/weather?q=";
  const API_KEY = "b8a84cd64b007bd7f7ea5f208fe1850e";

  const fetchWeather = async (city) => {
    if (
      weatherData.some((item) => item.name.toLowerCase() === city.toLowerCase())
    ) {
      setError("City already exists");
      return;
    }
    try {
      const res = await fetch(
        `${URL_BASE}${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (res.ok) {
        setWeatherData((prevData) => [...prevData, data]);
        setError("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  const handleDeleteCity = (cityToDelete) => {
    setWeatherData((prevData) =>
      prevData.filter((data) => data.name !== cityToDelete)
    );
  };

  return (
    <div className='flex justify-center items-center flex-col p-4 gap-4'>
      <div className='container relative flex justify-center items-center flex-col p-4 gap-4 h-40'>
        <h1 className='w-[250px] text-3xl text-blue-500 flex justify-center items-center gap-2'>
          Weather App
          <DotLottieReact
            src='https://lottie.host/b046172a-27f4-40e2-b374-6bdea0099edc/jOQZbpqmK2.lottie'
            loop
            autoplay
            className='right-0 w-10 h-10'
          />
        </h1>
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
        {error && (
          <p className='absolute text-red-500 text-center bottom-0'>{error}</p>
        )}
      </div>
      <section className='flex flex-wrap items-center justify-center gap-4 rounded-xl p-6'>
        {weatherData.length > 0 &&
          weatherData.map((data, index) => {
            return (
              <div
                className='flex flex-col items-center justify-center gap-4 w-[350px] bg-slate-50 rounded-xl p-6 drop-shadow-lg'
                key={index}
              >
                <h1 className='relative text-3xl text-blue-500 w-[100%] text-center flex justify-center'>
                  {data.name}{" "}
                  <button
                    className='absolute top-0 right-0 flex justify-center items-center text-white rounded-md hover:bg-slate-200 p-1'
                    onClick={() => handleDeleteCity(data.name)}
                  >
                    <img
                      src={trash_icon}
                      alt='delete_city'
                      className='w-6 h-6'
                    />
                  </button>
                </h1>
                <p className='text-2xl'>{Math.round(data.main.temp)}</p>
                <p className='text-xl text-slate-500'>
                  {data.weather[0].description}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt=''
                />
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default App;
