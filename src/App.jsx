import axios from 'axios'
import React from 'react'
import { useState , useRef , useEffect } from 'react'

function App() {
const [weatherData , setWeatherData] = useState([])
const cityVal = useRef()

const addCity = (event) => {
  event.preventDefault()

    async function getData() {
      try {
          let weatherVal = await axios(`https://api.weatherapi.com/v1/current.json?key=e3e98122324b454b92f44333241406&q=${cityVal.current.value}&aqi=no`)
          weatherData.push(weatherVal.data)
          setWeatherData([...weatherData])
          console.log(weatherData)
      } catch {
          alert('City not found')
      }
  }
  getData()
  cityVal.current.value = ''       
    } 
  


  return (
    <>
    <div><h1>Weather App</h1></div>
    <form onSubmit={addCity}>
      <input className='border py-2 px-5' type="text" placeholder='City Name' ref={cityVal} required/>
      <button type='submit' className='border p-3'>Show Weather</button>
      </form>
      <div>
      {weatherData ? weatherData.map((item , index) => {
        return <div key={index} className='bg-white border border-gray-800 shadow-lg ring ring-gray-700 ring-opacity-50 w-50 mx-auto mt-5 rounded-lg p-4 mb-5'>
        <h1 className='text-2xl'>{item.location.name}</h1>
        <p className='text-gray-500'>
          {item.location.localtime}, {item.location.country}
        </p>
        <div className='mt-5 flex justify-between items-center mx-5 pb-4'>
          <h2 className='text-4xl md:text-7xl lg:text-8xl'>{item.current.temp_c}°C</h2>
          <img
            width="160px"
            src={item.current.condition.icon}
            alt='weatherImg'
          />
        </div>
        <h4>{item.current.condition.text}</h4>
      </div>
      
      }) : <h1>Loading...</h1>}
      </div>
    </>
  )
}

export default App