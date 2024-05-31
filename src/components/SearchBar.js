import React from "react";

function SearchBar (props) {
    const {
        searchInput, 
        setSearchInput,
        searchResults,
        searchOffSet,
        setSearchOffSet 
    } = props;

    function handleInputOnChange (event) {
        setSearchInput(event.target.value)
    }

    function handleOnClickPrevious (event) {
        event.preventDefault();
        if (parseInt(searchOffSet) - 9 >= 0) {
            setSearchOffSet((previous) => {
                    let previousInt = parseInt(previous);
                    previousInt -= 9
                    return previousInt.toString();
            });
        }
    }

    function handleOnClickNext (event) {
        event.preventDefault();
        if(parseInt(searchOffSet) + 9 <= 900) {
            setSearchOffSet((previous) => {
                    let previousInt = parseInt(previous);
                    previousInt += 9
                    return previousInt.toString();
            });
        }
    }

    if(searchResults) {
        return (
            <>
                <button onClick={handleOnClickPrevious}>Previous</button>
                <input type="text" value={searchInput} onChange={handleInputOnChange}/>
                <button type="submit">Search</button>
                <button onClick={handleOnClickNext}>next</button>
            </>
        );
    } else {
        return (
            <>
                <input type="text" value={searchInput} onChange={handleInputOnChange}/>
                <button type="submit">Search</button>
            </>
        );
    }

}

export default SearchBar;