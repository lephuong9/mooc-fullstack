import axios from "axios";

const getWeatherAPI = (city, apiKey) => {
    const request = axios
                     .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
    
    return request.then(response => response.data)
}

export default getWeatherAPI

//  ($env:VITE_SOME_KEY="c3d083b376d4c7bfdf411e770748b8f8") -and (npm run dev)