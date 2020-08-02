import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query);
            console.log(data);
            setWeather(data);
            setQuery('');
        }
    }

    const searchweather = async () => {
        const data = await fetchWeather(query);
        setWeather(data);
        setQuery('');
    }

    return (
        <div className="main-container">
            <div className="search-field">
                <input type="text" className="search" placeholder="Search your city name.." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
                <SearchIcon className="search-icon" onClick={searchweather} />
            </div>
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                        <br />
                        <p className="humidity">Humidity: {Math.round(weather.main.humidity)}</p>
                    </div>
                    <div className="info">
                        <img className="city-icon"
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description} />
                        <p className="drescription">{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;