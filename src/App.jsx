import axios from 'axios';
import React, { useState, useRef } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const cityVal = useRef();

  const addCity = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const weatherVal = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=e3e98122324b454b92f44333241406&q=${cityVal.current.value}&aqi=no`
      );
      setWeatherData((prevData) => [...prevData, weatherVal.data]);
    } catch (error) {
      alert('City not found');
    } finally {
      setLoading(false);
      cityVal.current.value = ''; // Clear input here
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-600 min-h-screen flex flex-col items-center justify-center">
      <h1 className='text-white font-bold text-6xl my-5 drop-shadow-lg'>Weather App</h1>
      <form className='text-center' onSubmit={addCity}>
        <input
          type="text"
          placeholder="City Name"
          ref={cityVal}
          required
          className="input px-16 input-bordered w-full max-w-xs mt-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <br />
        <button type="submit" className="bg-blue-700 text-white rounded-lg p-3 my-3 transition duration-200 hover:bg-blue-800 disabled:opacity-50" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-md"></span> : 'Show Weather'}
        </button>
      </form>
      <div className="flex flex-col items-center mt-10 p-5">
        {weatherData.length > 0 ? (
          weatherData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-5 mb-5 text-center transition-transform transform hover:scale-105"
            >
              <h1 className="text-2xl font-semibold">{item.location.name}</h1>
              <p className="text-gray-500">{item.location.localtime}, {item.location.country}</p>
              <div className="mt-5 flex justify-center items-center mx-5">
                <h2 className="text-4xl md:text-7xl lg:text-8xl">{item.current.temp_c}°C</h2>
                <img width="100px" src={item.current.condition.icon} alt="weatherImg" />
              </div>
              <h4 className="mt-3 text-lg font-medium text-gray-600">{item.current.condition.text}</h4>
            </div>
          ))
        ) : (
          <h1 className="text-white">No Data Available</h1>
        )}
      </div>
    </div>
  );
}

export default App;
