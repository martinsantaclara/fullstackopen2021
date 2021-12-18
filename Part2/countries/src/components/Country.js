import React, {useState, useEffect} from 'react'
import axios from 'axios'
const Country = ({country}) => {
  
    const languages = Object.values(country.languages)
    const api_key = process.env.REACT_APP_API_KEY
    const windDirection = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']
    const [temperature, setTemperature] = useState(null)
    const [winSpeed, setWinSpeed] = useState(null)
    const [winDir, setWinDir] = useState(null)
    const [icon, setIcon] = useState(null)

    const getWeather = () => {

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
            .then(response => response.data)
            .then(data => {
              setTemperature(Math.round(data.main.temp)) // temperatura en °Celsius
              setWinSpeed(Math.round((data.wind.speed)*2.24))  // win speed de m/s a mph
              const index = Math.round((data.wind.deg) / 22.5) % 16
              setWinDir(windDirection[index])
              setIcon(data.weather[0].icon)
            })                
    }

    useEffect(getWeather,[country.capital, api_key])  

    return(
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          {languages.map((language)=>
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} alt="flag"></img>
        <h2>Weather in {country.capital}</h2>
        {temperature && <div>temperature: {temperature}°Celsius</div>}
        {icon && <img src={`https://openweathermap.org/img/w/${icon}.png`} alt="flag"></img>}
        {winSpeed && <div>wind: {winSpeed}mph direction {winDir}</div>}
      </div>
    )
}

export default Country
