import React, {useState} from "react";

function SearchBar () {
    const [searchInput, setSearchInput] = useState("");

    function handleOnChange (event) {
        setSearchInput(event.target.value)
    }

    return (
        <input type="text" value={searchInput} onChange={handleOnChange}/>
    );
}

export default SearchBar;