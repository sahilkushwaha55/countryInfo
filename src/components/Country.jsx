import React, { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";

export default function Country({ image, name, alt, id, population, area, onClickHandler }) {
    const { addToFavorite, isFavorite, removeFavorite, updateFavorite } = useContext(FavoriteContext)

    const favoriteCountry = isFavorite(name)

    function toggleFavorite() {
        if (favoriteCountry)
            removeFavorite(name)
        else
            addToFavorite({
                image,
                population,
                area,
                alt,
                id,
                name: {
                    common : name
                }
            })
    }

    return (
        <div style={{position: 'relative'}}>
            <div className="card" onClick={() => onClickHandler(id)}>
                <img src={image} alt={alt} />
                <p>{name}</p>
            </div>
            <span className={`material-icons favorite-icon ${favoriteCountry ? "fill-red" : ""}`} onClick={toggleFavorite}>favorite</span>
        </div>
    )
}