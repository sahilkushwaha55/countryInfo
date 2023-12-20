import React, { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import Country from "../components/Country";
import ShowCountry from "../components/ShowCountry";
import { ascending, descending } from "../function/sortingFunction";
import { SortContext } from "../context/SortContext";
import { useLoaderData } from "react-router-dom";
import { FavoriteContext } from "../context/FavoriteContext";

export async function loader(){
    const res = await fetch('https://restcountries.com/v3.1/all')
    if(!res.ok){
        throw{
            message: "Failed to load data",
            statusTest: res.statusText,
            status: res.status
        }
    }
    
    return await res.json()
}

export default function Home() {
    const { searchValue, setSearchValue } = useContext(SearchContext)
    const {sortValue} = useContext(SortContext)
    const {updateFavorite} = useContext(FavoriteContext)
    const [countryDetail, setCountryDetail] = useState('IND');
    const countriesData = useLoaderData();
    const ref = useRef()

    useEffect(() => setSearchValue(""), [])

    updateFavorite();

    function handleSelection(name){
        ref.current.style.visibility = "visible"
        setCountryDetail(name)
    }

    const filterData = countriesData.filter(country => country.name.common.toLowerCase().includes(searchValue.trim()))

    if(sortValue === 'az') filterData.sort(ascending)
    else if(sortValue === 'za') filterData.sort(descending)
    else if(sortValue === 'area') filterData.sort((a, b) => b.area - a.area)
    else if(sortValue === 'population') filterData.sort((a, b) => b.population - a.population)

    return (
        <div className="main-container">
            <div className="countries-container">
                {filterData.map(country => (
                    <Country key={country.cca3} 
                    onClickHandler={handleSelection} 
                    id={country.cca3} 
                    image={country.flags.svg} 
                    alt={country.flags.alt} 
                    name={country.name.common}
                    population={country.population}
                    area={country.area} />
                ))}
            </div>
            <div ref={ref} className="country-container">
                    <ShowCountry name={countryDetail} container={ref}/>
            </div>
        </div>
    )
}