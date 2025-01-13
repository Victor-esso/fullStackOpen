import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const all = () => {
    const request =  axios.get(`${baseUrl}all`);
    return request.then( resp => resp.data);
}
const weather = ( lat , lon ) => {
    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
    return request.then( resp => resp.data);
}

const weatherIcon = (icon , size=2) => `https://openweathermap.org/img/wn/${icon}@${size}x.png`;

export default {all , weather , weatherIcon}