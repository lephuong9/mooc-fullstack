// idea is : save all the country info into countryList at first with a GET request
// then only if users type in the country or click show button, then make another request for Weather
// using updatedCountry for when user search for country and selectedCountry when user click show
// using regular variable isButtonClicked is a game changer since it helps switching between the search and the click Show button
// if it false -> user type in -> updatedCountry is available -> show info users searched
// if it true -> user click show -> selectedCountry is available -> show info users clicked



import { useState, useEffect } from 'react'
import axios from 'axios'
//import getWeatherAPI from './services/weather.js'
const api_key = import.meta.env.VITE_WEATHER_KEY
// variable api_key now has the value in .env file




const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.filterCountry} onChange={props.handleFilterCountry} ></input>
    </div>
  )
  
}



const CountrySearchDisplay = ({ searchedCountries, filterCountry, handleButton, updatedCountry }) => {

  //because at first, isButtonClicked is default to false, so updatedCountry is available
  const countries = searchedCountries()
  console.log(countries.length)

  if (filterCountry === '') {     // when there's no input, nothing will show
    return ''                     // otherwise it will show everything because .includes method on 
  }                               // empty string will return all countries 
  else {
    if (countries.length > 10) {
      return 'Too many matches, specify another filter'
    } 
    else if (countries.length <= 10 && countries.length > 1) {
      return countries.map((country) => {
        console.log(country)
        return (
          <div key={country.id}>
            {country.name}
            <button onClick={() => {handleButton(country.id)}}>show</button>
          </div>   // use () => {} instead of just a function because of there's arguments in it
        )
      }) 
    } 
    else if (countries.length === 1) {
      if (updatedCountry) {
        return (
          <div>
            <h2>{updatedCountry.name}</h2>
            <p>capital {updatedCountry.capital}</p>
            <p>area {updatedCountry.area}</p>
          
            <h3>languages</h3>
            {Object.entries(updatedCountry.languages).map(([key, lang]) => {
              return ( 
                <li key={key}>{lang}</li>
              )
            })}
            <img src={updatedCountry.flag}/>

            <h2>Weather in {updatedCountry.capital}</h2>
            <p>temperature {updatedCountry.temp} Celcius</p>
            <p>wind {updatedCountry.wind} m/s</p>
          </div>
        ) 
      } else {
        console.log('no update yet')
      }
    }
  }                      
}


const CountryShowDisplay = ({ searchedCountries, selectedCountry }) => {
  // because we add para TRUE in the handleButton to getWeatherAPI, now selectedCountry will available
  
  const countries = searchedCountries()
  if (selectedCountry && countries.length <= 10 && countries.length > 1) {
    return (
      <div>
        <h2>{selectedCountry.name}</h2>
        <p>capital {selectedCountry.capital}</p>
        <p>area {selectedCountry.area}</p>
      
        <h3>languages</h3>
        {Object.entries(selectedCountry.languages).map(([key, lang]) => {
          return ( 
            <li key={key}>{lang}</li>
          )
        })}
        <img src={selectedCountry.flag}/>
        <h2>Weather in {selectedCountry.capital}</h2>
        <p>temperature {selectedCountry.temp} Celcius</p>
        <p>wind {selectedCountry.wind} m/s</p>
      </div>
    ) 
    
  } else {
    return ''
  }
}




function App() {
  const [countryList, setCountryList] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')   // for click show
  const [updatedCountry, setUpdatedCountry] = useState(null)   // for search



  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const allCountries = response.data.map(country => {
          return {
            name : country.name.common,
            id : country.population,
            capital : country.capital,
            area : country.area,
            languages : country.languages,
            flag : country.flags.png
          }
        })
        setCountryList(allCountries)
      }).catch(error => {
        alert('Something wrong happen, please refresh the page and try again.')
      })
  }, [])


  // because the lesson example API from Finland is too broad it does not close to the capital of Finland so when using openweathermap site, we have to do 2 steps to get the correct weather info
  // 1st get the latitude and longitude info using country capital (that's what this website api do)
  const getWeatherAPI = (country, isButtonClicked = false) => {
    let location
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&appid=${api_key}`) 
      .then(response => response.data)
      .then((data) => {
        location = {
          lat : data[0].lat,
          lon : data[0].lon
        }
      }).then(() => {
        convertWeatherAPI(location.lat, location.lon, country, isButtonClicked)
      }).catch(error => {
        alert('Something wrong happen, please refresh the page and try again.')
      })
  }   //then use lat and long to find weather info



  //2nd: use lat and long to find weather info(temperature, wind speed,..)(another website API method)
  const convertWeatherAPI = (lat, lon, country, isButtonClicked) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then((response) => {
        return response.data
      })
      .then((data) => {
        const countryWeatherData = {
          temp : data.main.temp,
          wind : data.wind.speed
        }
        if (isButtonClicked) {
          setSelectedCountry({...country, ...countryWeatherData})
        } else {
          setUpdatedCountry({...country, ...countryWeatherData}) 
        }
      }).catch(error => {
        alert('Something wrong happen, please refresh the page and try again.')
      })
  }


  //function to make an array of countries that match users input
  const searchedCountries = () => {
    const countries = countryList
    .filter(country => country.name.toLowerCase().includes(filterCountry.toLowerCase()))
    return countries
  }



  // get weatherAPI when there only one country left in the list from the user input
  useEffect(() => { 
    const countries = searchedCountries()

    if (filterCountry !== '' && countries.length === 1) {
      getWeatherAPI(countries[0])   // because countries is an array with 1 element
    }                               // this try to get data into the updatedCountry variable
    
    setSelectedCountry('') // after users click Show of one country and then continue to type another country or delete the letter, the showed Country will disappear and only show the type in country
  }, [filterCountry])  //this useEffect will trigger everytime filterCountry changes (when users type)
    //2nd parameter is good here cause after users click Show button, they definitely will change the input by typing or deleting letters in it so setSelectedCountry to '' is necessary  




  const handleFilterCountry = (event) => {
    setFilterCountry(event.target.value)
  }




  // handle when users click the show button on the country they want to see, also get weatherAPI
  const handleButton = (id) => {  
    const theCountry = countryList.filter(country => country.id === id)[0]//access 1st index in array
    getWeatherAPI(theCountry, true)
  }
 
  
  
  
  return (
    <>
      <Filter filterCountry={filterCountry} handleFilterCountry={handleFilterCountry} />

      <CountrySearchDisplay searchedCountries={searchedCountries} 
                      filterCountry={filterCountry}
                      updatedCountry={updatedCountry} 
                      handleButton={handleButton} />

      <CountryShowDisplay searchedCountries={searchedCountries} selectedCountry={selectedCountry}  />
    </>
  )
}

export default App

