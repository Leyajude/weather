// WeatherApp.js

import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '8ac5c4d57ba6a4b3dfcf622700447b1e';

  useEffect(() => {
    if (city !== '') {
      fetchWeatherData();
    }
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found. Please enter a valid city name.');
      }

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    }
  };

  return (
  <div className=' mt-5 row row1 pp d-flex justify-content-center align-item-center'style={{width:'100%',height:'100vh mt-5'}} >
    <div className="col-lg-4"></div>
    <div className="col-lg-4 mt-5 border ">
    <div >
      <h1 className='mt-4'>Weather App</h1>
      <div>
        <input className='mt-2'
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      <br />
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
    </div>
    <div className="col-lg-4"></div>
  </div>
  );
};

export default WeatherApp;
