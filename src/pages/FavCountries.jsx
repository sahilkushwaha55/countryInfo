import React, { useContext, useEffect, useRef, useState } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import Country from "../components/Country";
import { SearchContext } from "../context/SearchContext";
import ShowCountry from "../components/ShowCountry";
import { ascending, descending } from "../function/sortingFunction";
import { SortContext } from "../context/SortContext";

export default function FavCountries(){
    const{ searchValue, setSearchValue } = useContext(SearchContext)
    const {favoriteCountries, updateFavorite} = useContext(FavoriteContext)
    const {sortValue} = useContext(SortContext)
    const [countryDetail, setCountryDetail] = useState(favoriteCountries[0]?.id || 'IND');
    const ref = useRef()

    useEffect(() => setSearchValue(""), [])

    updateFavorite()

    function handleSelection(name){
        ref.current.style.visibility = "visible"
        setCountryDetail(name)
    }

    const filterData = favoriteCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.trim()))

    if(sortValue === 'az') filterData.sort(ascending)
    else if(sortValue === 'za') filterData.sort(descending)
    else if(sortValue === 'area') filterData.sort((a, b) => b.area - a.area)
    else if(sortValue === 'population') filterData.sort((a, b) => b.population - a.population)
    
    return(
        <div className="main-container">
            <div className="countries-container">
                {filterData.map(country => (
                    <Country key={country.name.common} 
                    onClickHandler={handleSelection} 
                    id={country.id} 
                    image={country.image} 
                    alt={country.alt} 
                    name={country.name.common}
                    area={country.area}
                    population={country.population} />
                ))}
            </div>
            <div ref={ref} className="country-container">
                    <ShowCountry name={countryDetail} container={ref}/>
            </div>
        </div>
    )
}