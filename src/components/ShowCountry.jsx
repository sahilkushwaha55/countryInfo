import React, { useEffect, useState } from "react";
import Loading from "./Loading";

export default function ShowCountry({name}){
    const [countryData, setCountryData] = useState({})
    let currenciesName
    const smallWindow = window.innerWidth < 600

    useEffect(() => {
        async function loadData() {
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${name}`)
            const [data] = await res.json()
            setCountryData(data)
            currenciesName = Object.values(data.currencies)
        }
        loadData()
    }, [name])

    function closeWindow(){
        document.querySelector('.country-container').style.visibility = 'hidden'
    }

    if(countryData.currencies) [currenciesName] = Object.values(countryData.currencies)

    return(
        <div className="country-card">
            <img src={countryData.flags?.svg} alt={countryData.flags?.alt} />
            <p><span>Name: </span> {countryData.name?.common}</p>
            <p><span>Official Name: </span> {countryData.name?.official}</p>
            <p><span>Capital: </span> {countryData.capital}</p>
            <p><span>Currencies: </span>{currenciesName && currenciesName.name} ({currenciesName && currenciesName.symbol}) </p>
            <p><span>Landarea: </span> {countryData.area}</p>
            <p><span>Population: </span> {countryData.population}</p>
            <p><span>Region: </span> {countryData.region}</p>
            <p><span>Sub-region: </span> {countryData.subregion}</p>
            {smallWindow && <span className="material-icons close-icon" onClick={closeWindow}>close</span>}
        </div>
    )
}