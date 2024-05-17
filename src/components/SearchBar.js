import React, {useState} from "react";

function SearchBar (props) {
    const {
        searchInput, 
        setSearchInput, 
        searchTypeValue,
        setSearchTypeValue
    } = props;

    function handleInputOnChange (event) {
        setSearchInput(event.target.value)
    }

    function handleSearchTypeOnChange (event) {
        setSearchTypeValue(event.target.value);
    }

    return (
        <>
            <label htmlFor="searchType">Search by:</label>
            <select id="searchType" name="searchType" value={searchTypeValue} onChange={handleSearchTypeOnChange}>
                <option value="artist">Artist</option>
                <option value="audiobook">Audiobook</option>
                <option value="episode">Episode</option>
                <option value="playlist">Playlist</option>
                <option value="show">Show</option>
                <option value="track">Track</option>
            </select>
            <input type="text" value={searchInput} onChange={handleInputOnChange}/>
        </>
    );
}

export default SearchBar;