import React, {useState, useEffect} from 'react';
import './App.css';
import {Tracks, Playlists} from './mockdata/mockdata';
import SearchBar from './components/SearchBar';
import Tracklist from './components/Tracklist';
import Playlist from './components/Playlist';
import styles from './styles/app.module.css';

function App() {
  const [searchResult, setSearchResult] = useState(Tracks);
  const [playlists, setPlaylists] = useState(Playlists);
  const [newPlaylist, setNewPlaylist] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTypeValue, setSearchTypeValue] = useState("track");

  const baseEndpoint = "https://api.spotify.com/v1/search";
  let client_id = localStorage.getItem("spotifyClientId");

  useEffect(() => {
    document.title = "Spotify App";
  }, []);

  function handleLoginOnClick () {
    function createRandomString(length) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }
    
    var redirect_uri = 'http://localhost:3000'; // Your redirect uri

    var state = createRandomString(16);

    localStorage.setItem("stateKey", state);
    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
    onAuthorized();
  }

  function newPlayListOnChange (event) {
    setNewPlaylist(event.target.value);
  }

  function handleNewPlaylistOnSubmit (event) {
    event.preventDefault();

    if (newPlaylist) {
      const customPlaylist = {title: newPlaylist, tracks: []};
      setPlaylists((prevList) => [...prevList, customPlaylist])
      setNewPlaylist("");
    }
  }

  async function handleSearchOnSubmit (event) {
    event.preventDefault();

    if (searchInput) {
      const endpoint = baseEndpoint + "?q=" + searchInput + "&type=" + searchTypeValue;
      try {
          const response = await fetch(endpoint, {
            method: "GET",
            headers: {"Authorization" : "Bearer " + localStorage.getItem("token")}
          });
      
          if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
          }
        }
        catch (error){
          console.log(error);
        }
    }
  }

  function onAuthorized () {
    const queryHash = window.location.hash;
    const urlParams = new URLSearchParams(queryHash.substring(1));
    const token = urlParams.get("access_token");
    localStorage.setItem("token", token);
  }

  if(localStorage.getItem("token")) {
    return (
      <div className={styles.mainPage}>
        <section className={styles.sectionContainer}>
          <Playlist playlists={playlists} setPlaylists={setPlaylists}/>
          <form onSubmit={handleNewPlaylistOnSubmit}>
            <input type="text" value={newPlaylist} onChange={newPlayListOnChange}/>
            <button type="submit">Create Playlist</button>
          </form>
        </section>
    
        <section className={styles.sectionContainer}>
          <Tracklist tracklist={searchResult}/>
          <form onSubmit={handleSearchOnSubmit}>
            <SearchBar 
              searchInput={searchInput} 
              setSearchInput={setSearchInput} 
              searchTypeValue={searchTypeValue}
              setSearchTypeValue={setSearchTypeValue}
            />
            <button type="submit">Search</button>
          </form>
        </section>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <button style={{margin: 'auto'}}>Save to Spotify</button>    
        </div>  
      </div>
    );
  } else {
    return (
      <div style={{display: "flex", height: "100vh", justifyContent: "center"}}>
        <button onClick={handleLoginOnClick} style={{alignSelf: "center", justifyContent: "center"}}>Login</button>
      </div>
    );
  }
}

export default App;
