import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { SortContext } from "../context/SortContext";

export default function Navbar() {
    const{searchValue, setSearchValue} = useContext(SearchContext);
    const {sortValue, setSortValue} = useContext(SortContext);

    function handleChange(event){
        setSearchValue(event.target.value.toLowerCase())
    }

    function handleClearSearch(){
        setSearchValue("")
    }

    return (
        <nav>
            <div className="nav_search-bar-container">
                <input type="text" placeholder="search" className="nav_search-bar" onChange={handleChange} value={searchValue}/>
                <div className="nav_search-bar-icons">
                    {searchValue && <span className="material-icons" onClick={handleClearSearch}>close</span>}
                    <span className="material-icons">search</span>
                </div>
            </div>
            <div className="nav-menu">
                <NavLink to="/" className={({isActive}) => isActive ? "text-bold" : ""}>All Countries</NavLink>
                <NavLink to="/favorite" className={({isActive}) => isActive ? "text-bold" : ""}>Favorite</NavLink>
                <select name="sort" onChange={(e) => setSortValue(e.target.value)} value={sortValue}>
                    <option value="">Sort By</option>
                    <option value="az">A To Z</option>
                    <option value="za">Z To A</option>
                    <option value="area">Area</option>
                    <option value="population">Population</option>
                </select>
                {sortValue && <button onClick={() => setSortValue("")}>Clear Sort</button>}
            </div>
        </nav>
    )
}