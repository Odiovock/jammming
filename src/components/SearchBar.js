import React from "react";

function SearchBar (props) {
    const {
        searchInput, 
        setSearchInput, 
    } = props;

    function handleInputOnChange (event) {
        setSearchInput(event.target.value)
    }

    return (
        <>
            <input type="text" value={searchInput} onChange={handleInputOnChange}/>
        </>
    );
}

export default SearchBar;