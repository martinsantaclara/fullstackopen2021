import Country from "./Country";

const showCountry = (country,setFilteredCountries,setFilter) => {
    setFilteredCountries([country])
    setFilter(country.name.common)
}
   
const Countries = ({filteredCountries,setFilteredCountries,setFilter}) => {
    return(
        <div>
            {filteredCountries.length > 10 && <div>Too many matches, specify another filter</div>}
            {filteredCountries.length > 1 && filteredCountries.length <=10 && 
                <div>
                {filteredCountries.map((country) => {
                    return(
                    <div key={country.name.common}>{country.name.common}
                    <button onClick={()=>showCountry(country,setFilteredCountries,setFilter)}>show</button>
                    </div>
                    )
                })}
                </div>}
            {filteredCountries.length === 1 && <Country country={filteredCountries[0]}/>}

        </div>
    )
}
    
export default Countries
