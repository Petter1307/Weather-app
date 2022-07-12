/* eslint-disable no-restricted-syntax */
/* eslint-disable sonarjs/no-all-duplicated-branches */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useAuth from '@hooks/useAuth';
import * as cityData from '../../assets/city.list.json';

const Weatherpage = () => {
  const apiKey = '6ca0e379d6df5aa5ad2f22af75d00f8e';
  const { authed, saveLastLocation } = useAuth();
  const [wData, setWData] = useState();
  const [authedState, setAuthedState] = useState();
  const [city, setCity] = useState();
  const [locationError, setLocationError] = useState('');
  const [cityError, setCityError] = useState('');
  const [currentLocation, setCurrentLocation] = useState({ lan: 0, lon: 0 });

  const getCityList = () => {
    console.log(cityData[0].name);
    for (const x of cityData) {
      console.log(x.name);
    }
  };

  const getWeatherByCurrentLocation = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
      .then(resp => resp.json())
      .then(data => {
        setWData(data);
        const { name } = data;
        saveLastLocation({ lon, lat, name });
      });
  };

  const location = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        e => {
          setCityError('');
          console.log(e);
          setLocationError('granted');
          setCurrentLocation({
            lan: e.coords.latitude,
            lon: e.coords.longitude,
          });
          getWeatherByCurrentLocation(e.coords.latitude, e.coords.longitude);
        },
        e => {
          console.log(e);
          setLocationError(e.message);
        }
      );
    }
  };

  useEffect(() => {
    setAuthedState(authed);
    location();
  }, []);

  const getWeatherByName = event => {
    if (event.key === 'Enter') {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
        .then(response => response.json())
        .then(data => {
          const { coord, name, cod } = data;
          setCityError(cod);
          if (cod !== '404') {
            setWData(data);
            const { lon, lat } = coord;
            saveLastLocation({ lon, lat, name });
          }
        });
    }
  };

  return (
    <>
      <h1>Current weather</h1>
      {authedState ? (
        <>
          <input
            placeholder="City name"
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyDown={getWeatherByName}
          />
          {typeof wData === 'undefined' ? (
            <h1>Please enter a city name to see the weather data!</h1>
          ) : (
            <>
              {cityError === '404' ? (
                <h1>Please enter a valid city name</h1>
              ) : (
                <>
                  <p>{wData.name}</p>
                  <p>{Math.round(wData.main.temp)}</p>
                  <p>{wData.weather[0].main}</p>
                </>
              )}
              <h1> </h1>
            </>
          )}
          {locationError !== 'granted' && locationError !== '' ? (
            <h6>There was an error: {locationError}</h6>
          ) : (
            <>
              <button type="submit" onClick={() => location()}>
                Local Weather
              </button>
              <h1>
                {currentLocation.lan === 0 && currentLocation.lon === 0
                  ? 'Please give permision for your location'
                  : `Current location lan: ${currentLocation.lan} lon: ${currentLocation.lon}`}
              </h1>
            </>
          )}
          <button
            type="submit"
            onClick={() => {
              getCityList();
            }}
          >
            Log city list
          </button>
        </>
      ) : (
        <h1>Please auth yourself</h1>
      )}
    </>
  );
};

export default Weatherpage;
