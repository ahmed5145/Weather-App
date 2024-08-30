import React, { useState } from 'react';
import './WeatherApp.css';
import LoadingSpinner from './LoadingSpinner'; // Import the loading spinner component
import Modal from './Modal'; // Import the modal component

// Get the API key from environment variables
const apiKey = process.env.REACT_APP_API_KEY;

const WeatherApp = () => {
  // State variables to manage city input, weather data, forecast data, error messages, location error, and loading state
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal open/close

  // Handle city input change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Fetch weather data based on the city name
  const fetchWeather = async () => {
    setLoading(true); // Set loading to true when fetch starts
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      // Check if the response is okay, otherwise throw an error
      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          throw new Error('City not found. Please enter a valid city name.');
        } else {
          throw new Error('Unable to fetch weather data. Please try again later.');
        }
      }

      // Parse weather data response
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
      setError('');

      // Fetch the 5-day forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      // Check if the forecast response is okay, otherwise throw an error
      if (!forecastResponse.ok) {
        throw new Error('Could not fetch forecast data. Please try again later.');
      }

      // Parse forecast data response
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
    } catch (err) {
      // Set error messages and clear weather and forecast data in case of an error
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false); // Set loading to false when fetch ends
    }
  };

  // Fetch weather data based on the user's current location
  const fetchWeatherByLocation = () => {
    setLoading(true); // Set loading to true when fetch starts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Fetch weather data using latitude and longitude
          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          );

          // Check if the response is okay, otherwise throw an error
          if (!weatherResponse.ok) {
            throw new Error('Could not fetch weather data for your location.');
          }

          // Parse weather data response
          const weatherData = await weatherResponse.json();
          setWeatherData(weatherData);
          setError('');

          // Fetch the 5-day forecast data for the location
          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          );

          // Check if the forecast response is okay, otherwise throw an error
          if (!forecastResponse.ok) {
            throw new Error('Could not fetch forecast data.');
          }

          // Parse forecast data response
          const forecastData = await forecastResponse.json();
          setForecastData(forecastData);
        } catch (err) {
          // Set error messages and clear weather and forecast data in case of an error
          setError(err.message);
          setWeatherData(null);
          setForecastData(null);
        } finally {
          setLoading(false); // Set loading to false when fetch ends
        }
      }, (err) => {
        // Handle geolocation errors
        setLocationError('Unable to retrieve location. Please check location services settings.');
        setLoading(false); // Ensure loading is false on geolocation error
      });
    } else {
      // If geolocation is not supported
      setLocationError('Geolocation is not supported by your browser.');
      setLoading(false); // Ensure loading is false if geolocation is unsupported
    }
  };

  // Function to group forecast data by day
  const groupForecastByDay = () => {
    if (!forecastData) return {};

    // Group forecast data based on date
    return forecastData.list.reduce((groupedData, forecast) => {
      const date = new Date(forecast.dt_txt).toLocaleDateString(); // Get the date string
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(forecast);
      return groupedData;
    }, {});
  };

  // Get grouped forecast data
  const groupedForecast = groupForecastByDay();

  const handleInfoClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  // Render the Weather App component
  return (
    <div>
      <h1>Weather App</h1>
      <p>Created by Ahmed Mohamed</p> {/* Display my name */}
      <button onClick={handleInfoClick}>Info</button> {/* Info button to display PM Accelerator description */}
      <input 
        type="text" 
        value={city} 
        onChange={handleCityChange} 
        placeholder="Enter city" 
      />
      {/* Button to fetch weather by city name */}
      <button onClick={fetchWeather}>Get Weather</button>
      {/* Button to fetch weather by user's current location */}
      <button onClick={fetchWeatherByLocation}>Use My Location</button>
      
      {/* Show loading spinner if loading */}
      {loading && <LoadingSpinner />} 
      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Display location error message if any */}
      {locationError && <p style={{ color: 'red' }}>{locationError}</p>}
      {/* Display weather data if available */}
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <img 
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
            alt={weatherData.weather[0].description} 
          />
        </div>
      )}

      {/* Display 5-day forecast data if available */}
      {forecastData && (
        <div>
          <h2>5-Day Forecast</h2>
          {Object.keys(groupedForecast).map((date) => (
            <div key={date}>
              <h3>{date}</h3>
              {groupedForecast[date].map((forecast, index) => (
                <div key={index}>
                  <p>
                    {new Date(forecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                    Temp: {forecast.main.temp} °C, 
                    {forecast.weather[0].description}
                  </p>
                  <img 
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
                    alt={forecast.weather[0].description} 
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>About PM Accelerator</h2>
        <p>
          The Product Manager Accelerator Program is designed to support PM professionals through every stage of their career. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.
        </p>
        <p>
          Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavours.
        </p>
        <p>
          Learn product management for free today on our YouTube channel: <a href="https://www.youtube.com/c/drnancyli?sub_confirmation=1" target="_blank" rel="noopener noreferrer">YouTube Channel</a>
        </p>
        <p>
          Interested in PM Accelerator Pro?<br />
          Step 1️⃣: Attend the Product Masterclass to learn more about the program details, price, different packages, and stay until the end to get FREE AI Course.<br />
          Learn how to create a killer product portfolio in 2 weeks that will help you land any PM job (traditional or AI) even if you were laid off or have zero PM experience: <a href="https://www.drnancyli.com/masterclass" target="_blank" rel="noopener noreferrer">Product Masterclass</a><br />
          Step 2️⃣: Reserve your early bird ticket and submit an application to talk to our Head of Admission<br />
          Step 3️⃣: Successful applicants join our PMA Pro community to receive customized coaching!
        </p>
      </Modal>
    </div>
  );
};
export default WeatherApp;