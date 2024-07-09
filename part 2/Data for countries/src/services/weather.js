import axios from "axios";

const getWeatherAPI = (city, apiKey) => {
    const request = axios
                     .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
    
    return request.then(response => response.data)
}

export default getWeatherAPI

