import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,capital,population,languages,flags')
      .then(response => {
        const allCountries = response.data
        setCountries(allCountries)
      })
  },[])

  const handleFilter = (event) => {
    const entryCountry = event.target.value
    setFilter(entryCountry)
    const filterCountries = countries.filter((country)=>country.name.common.toLowerCase().includes(entryCountry.toLowerCase()))
    setFilteredCountries(filterCountries)
  }

  return (
    <div>
      <div> find countries 
        <input  value={filter}
                onChange={handleFilter}
        />
      </div>
       {!filter && <div></div>}
       {filter && <Countries filteredCountries={filteredCountries} 
                             setFilteredCountries={setFilteredCountries}
                             setFilter={setFilter} />}
    </div>

  );
}

export default App
