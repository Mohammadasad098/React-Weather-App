import axios from 'axios';
import React, { useState, useRef } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const cityVal = useRef();

  const addCity = (event) => {
    event.preventDefault();
    setLoading(true);

    async function getData() {
      try {
        let weatherVal = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=e3e98122324b454b92f44333241406&q=${cityVal.current.value}&aqi=no`
        );
        setWeatherData((prevData) => [...prevData, weatherVal.data]);
      } catch (error) {
        alert('City not found');
      } finally {
        setLoading(false);
      }
    }
    getData();
    cityVal.current.value = '';
  };

  return (
    <>
      <div>
        <h1 className='text-center font-bold text-6xl my-5'>Weather App</h1>
      </div>
      <form className='text-center' onSubmit={addCity}>
        <input
          type="text"
          placeholder="City Name"
          ref={cityVal}
          required
          className="input input-bordered w-full max-w-xs mt-6"
        />{' '}
        <br />
        <button type="submit" className="border p-3 my-3" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-md"></span> : 'Show Weather'}
        </button>
      </form>
      <div>
        {weatherData ? (
          weatherData.map((item, index) => (
            <div
              key={index}
              className="text-center md:my-3 bg-white md:border border-gray-800 shadow-lg ring ring-gray-700 ring-opacity-50 w-50 md:mt-5 rounded-lg md:p-4 md:mb-5 md:mx-60"
            >
              <h1 className="text-2xl">{item.location.name}</h1>
              <p className="text-gray-500">
                {item.location.localtime}, {item.location.country}
              </p>
              <div className="mt-5 flex justify-between items-center mx-5 pb-4">
                <h2 className="text-4xl md:text-7xl lg:text-8xl">
                  {item.current.temp_c}°C
                </h2>
                <img
                  width="160px"
                  src={item.current.condition.icon}
                  alt="weatherImg"
                />
              </div>
              <h4>{item.current.condition.text}</h4>
            </div>
          ))
        ) : (
          <h1>No Data Available</h1>
        )}
      </div>
    </>
  );
}

export default App;
