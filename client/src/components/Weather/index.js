import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import { CATCH_FORECAST, SET_FORECAST_LOCATION } from '../../utils/actions';
import Moment from 'react-moment';
import "./style.css";

function Weather() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        generateWeather();
    }, []);

    const generateWeather = () => {
        API.getWeather(state.currentHike.latitude, state.currentHike.longitude)
        .then((res) => {
            compileData(res.data);
        })
        .catch(err => console.log(err));
    };

    const compileData = (data) => {
        const dailyData = data.list.filter(reading => {   
            return reading.dt_txt.includes("12:00:00")
            }
          )
        let city = data.city.name
        dispatch({
            type: CATCH_FORECAST,
            weather: dailyData
        });
        dispatch({
            type: SET_FORECAST_LOCATION,
            forecastLocation: city
        });
    }

    return (
        <div>
        <p>Condtions</p>
        <p>{state.forecastLocation}</p>
        {state.weather.map((day, i) => (
            <div key={i}>
            <p>Date:  
                <Moment format="MM/DD h:mm">{day.dt_txt}</Moment>
            </p>
            <img src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="wthr img" />
             <p>Temp: {(Math.floor((day.main.temp * 9 / 5) + 32))} °F</p>
             <p>Humidity: {day.main.humidity} %</p>
             <p>Wind: {day.wind.speed} MPH</p>
             <p>Expect {day.weather[0].description}</p>
           </div>
        ))}
        </div>
    )
};
 
export default Weather;