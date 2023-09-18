import { createContext, useState } from "react";

export const FavoriteContext = createContext()

export const FavoriteProvider = ({children}) => {
    const [favoriteCountries, setFavoriteCountry] = useState(JSON.parse(localStorage.getItem("countryData")) || [])

    const addToFavorite = (newFavorite) =>{
        setFavoriteCountry(prevFavorite => [...prevFavorite, newFavorite])
    }

    const removeFavorite = (name) => {
        setFavoriteCountry(prevFavorite => prevFavorite.filter(country => country.name.common !== name))
    }

    const updateFavorite = () => localStorage.setItem("countryData", JSON.stringify(favoriteCountries))

    const isFavorite = (name) => {
        return favoriteCountries.some(country => country.name.common === name)
    }

    return(
        <FavoriteContext.Provider value={{favoriteCountries, addToFavorite, removeFavorite, isFavorite, updateFavorite}}>
            {children}
        </FavoriteContext.Provider>
    )
}