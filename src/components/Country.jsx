import React, { useContext, useEffect, useRef, useState } from "react";
import { FavoriteContext } from "../context/FavoriteContext";

export default function Country({ image, name, alt, id, population, area, onClickHandler }) {
    const ref = useRef()
    const [inView, setInView] = useState(false)
    const { addToFavorite, isFavorite, removeFavorite } = useContext(FavoriteContext)

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
                    common: name
                }
            })
    }

    let callback = (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) setInView(true)
        });
    }

    useEffect(() => {
        let observer = new IntersectionObserver(callback);

        if(ref?.current) observer.observe(ref.current)

        return () => {
            observer.disconnect()
        }

    }, [])

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <div className="card" onClick={() => onClickHandler(id)}>
                {inView && <img src={image} alt={alt} loading="lazy" />}
                <p>{name}</p>
            </div>
            <span className={`material-icons favorite-icon ${favoriteCountry ? "fill-red" : ""}`} onClick={toggleFavorite}>favorite</span>
        </div>
    )
}