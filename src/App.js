import React, {useState, useEffect} from 'react';

import SearchBar from './components/SearchBar';
import Tracklist from './components/Tracklist';
import Playlist from './components/Playlist';
import { Playlists } from './datahandler/TempPlaylists';

import styles from './styles/app.module.css';
import './App.css';

function App() {
  const [playlists, setPlaylists] = useState(Playlists);
  const [newPlaylist, setNewPlaylist] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [searchOffSet, setSearchOffSet] = useState("0");

  const [hasSessionToken, setHasSessionToken] = useState(false);

  const baseEndpoint = "https://api.spotify.com/v1/search";
  let client_id;

  useEffect(() => {
    document.title = "Spotify App";
    localStorage.setItem("spotifyClientId", "723d8a14cbdb4f5e81acee881eb7f308");
    client_id = localStorage.getItem("spotifyClientId");
    
    if(window.location.hash) {
      onAuthorized();
    }
  }, []);

  useEffect(() => {
    queryApi();
  }, [searchOffSet]);

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

  function handleSearchOnSubmit (event) {
    event.preventDefault();
    queryApi();
  }


  async function queryApi () {
  setSearchResults();

  if (searchInput) {
    const endpoint = baseEndpoint + "?q=" + searchInput + "&type=track&limit=9" + "&offset=" + searchOffSet;
    try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {"Authorization" : "Bearer " + window.sessionStorage.getItem("token")}
        });
    
        if (response.ok) {
          const jsonResponse = await response.json();
          setSearchResults(jsonResponse);
        }
      }
      catch (error){
        console.log(error);
      }
  }

  console.log(searchOffSet);
}

  function onAuthorized () {
    const queryHash = window.location.hash;
    const urlParams = new URLSearchParams(queryHash.substring(1));
    const token = urlParams.get("access_token");
    sessionStorage.setItem("token", token);
    setHasSessionToken(true);
  }

  console.log(searchResults);
  if(hasSessionToken) {
    return (
      <div className={styles.mainPage}>
        <section className={styles.sectionContainer}>
          <h2>Create your own playlists</h2>
          <form onSubmit={handleNewPlaylistOnSubmit} className={styles.barComponentMargin}>
            <input type="text" value={newPlaylist} onChange={newPlayListOnChange}/>
            <button type="submit">Create Playlist</button>
          </form>
          <Playlist playlists={playlists} setPlaylists={setPlaylists}/>
        </section>
    
        <section className={styles.sectionContainer}>
          <h2>Track list</h2>
          <form onSubmit={handleSearchOnSubmit} className={styles.barComponentMargin}>
            <SearchBar 
              searchInput={searchInput} 
              setSearchInput={setSearchInput}
              searchResults={searchResults}
              searchOffSet={searchOffSet}
              setSearchOffSet={setSearchOffSet}
            />
          </form>
          <Tracklist searchResults={searchResults}/>
        </section>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <button style={{margin: '30px auto'}}>Save to Spotify</button>    
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
