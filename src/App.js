import React, {useState, useEffect} from 'react';

import SearchBar from './components/SearchBar';
import Tracklist from './components/Tracklist';
import Playlist from './components/Playlist';

import styles from './styles/app.module.css';
import './App.css';

function App() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylistInput] = useState("");
  const [playlistId, setPlaylistId] = useState(0);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistSavedToSpotify, setNewPlaylistSavedToSpotify] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [searchOffSet, setSearchOffSet] = useState("0");

  const [client_id, setClientId] = useState("723d8a14cbdb4f5e81acee881eb7f308");
  const [userId, setUserId] = useState("");
  const [hasSessionToken, setHasSessionToken] = useState(false);

  const searchBaseEndpoint = "https://api.spotify.com/v1/search";

  useEffect(() => {
    document.title = "Spotify App";
    
    if(window.location.hash) {
      onAuthorized();
    }

    if(localStorage.getItem("savedPlaylists")) {
      const localsave = localStorage.getItem("savedPlaylists");
      setPlaylists(JSON.parse(localsave));
      setPlaylistId(parseInt(localStorage.getItem("savedIndex")));
    }
  }, []);

  useEffect(() => {
    queryApi();
  }, [searchOffSet]);

  useEffect(() => {
    const selectedPlaylist = getSelectedPlaylist();
    if(playlists.length > 0) {
      if(selectedPlaylist.isAddingTracks && newPlaylistSavedToSpotify) {
        addPlaylistTracksToSpotifySave();
      }
    }
  }, [newPlaylistSavedToSpotify])

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
    var scope = 'playlist-read-private playlist-modify-private user-library-modify user-library-read';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
  }

  function newPlayListOnChange (event) {
    setNewPlaylistInput(event.target.value);
  }

  function handleNewPlaylistOnSubmit (event) {
    event.preventDefault();

    if (newPlaylist) {
      let customPlaylist;
      if(playlists.length > 0) {
        customPlaylist = {
          id: playlistId, 
          title: newPlaylist, 
          tracks: [],
          spotifyId: "", 
          isSelected: false,
          isRenaming: false,
          isRenamed: false,
          isAddingTracks: false,
          isCreated: false,
          isChanged: true
        };
      } else {
        customPlaylist = {
          id: playlistId, 
          title: newPlaylist, 
          tracks: [],
          spotifyId: "", 
          isSelected: true,
          isRenaming: false,
          isRenamed: false,
          isAddingTracks: false,
          isCreated: false,
          isChanged: true
        };
      }

      setPlaylists((prevList) => [...prevList, customPlaylist])
      setNewPlaylistInput("");
      setPlaylistId((prev) => prev += 1);
    }
  }

  function handleSearchOnSubmit (event) {
    event.preventDefault();
    queryApi();
  }


  async function queryApi () {
  setSearchResults();

  if (searchInput) {
    const endpoint = searchBaseEndpoint + "?q=" + searchInput + "&type=track&limit=9" + "&offset=" + searchOffSet;
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
  }

  async function getUserId () {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {"Authorization" : "Bearer " + window.sessionStorage.getItem("token")}
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setUserId(jsonResponse.id);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  function handleSavePlaylistsToSpotifyOnClick () {
    const selectedPlaylist = getSelectedPlaylist();
    if (selectedPlaylist.isChanged) {
      if (!selectedPlaylist.isCreated) {
        createPlaylistToSpotify(selectedPlaylist);
      }

      if (selectedPlaylist.isAddingTracks && selectedPlaylist.isCreated) {
        addPlaylistTracksToSpotifySave(selectedPlaylist);
      }

      if (selectedPlaylist.isRenamed && selectedPlaylist.isCreated) {
        renameSpotifyPlaylist(selectedPlaylist);
      }
    } else {
      alert("The playlist you selected is already saved to spotify");
    }

    setPlaylists((prev) => {
      console.log(prev);
      for (const playlist of prev) {
        console.log(playlist.id, selectedPlaylist.id);
        if (playlist.id.toString() === selectedPlaylist.id.toString()) {
          playlist.isChanged = false;
        }
      }

      return [...prev];
    });
  }

  function onAuthorized () {
    const queryHash = window.location.hash;
    const urlParams = new URLSearchParams(queryHash.substring(1));
    const token = urlParams.get("access_token");
    sessionStorage.setItem("token", token);
    setHasSessionToken(true);
    getUserId();
  }

  function getSelectedPlaylist () {
    return playlists.filter((playlist) => playlist.isSelected)[0];
  }

  async function createPlaylistToSpotify () {
    try{
      const selectedPlaylist = getSelectedPlaylist();
      const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization" : "Bearer " + window.sessionStorage.getItem("token") 
        },
        ContentType : "application/json",
        body: JSON.stringify({
          "name" : selectedPlaylist.title,
          "public" : false
        })
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setPlaylists((prev) => {
          for (const playlist of prev) {
            if (playlist.id === selectedPlaylist.id) {
              playlist.spotifyId = jsonResponse.id;
              playlist.isCreated = true;
            }
          }

          return [...prev];      
        });

        if(selectedPlaylist.isAddingTracks) {
          setNewPlaylistSavedToSpotify(true);
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  async function renameSpotifyPlaylist () {
    try {
      const selectedPlaylist = getSelectedPlaylist();
      const endpoint = `https://api.spotify.com/v1/playlists/${selectedPlaylist.spotifyId}`;
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Authorization" : "Bearer " + window.sessionStorage.getItem("token") 
        },
        ContentType : "application/json",
        body: JSON.stringify({
          "name" : selectedPlaylist.title
        })
      });

      if (response.ok) {
        setPlaylists((prev) => {
          for (const playlist of prev) {
            if (playlist.id === selectedPlaylist.id) {
              playlist.isRenamed = false;
            }
    
            return [...prev];
          }
        });
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  async function addPlaylistTracksToSpotifySave () {
    try {
      const selectedPlaylist = getSelectedPlaylist();
      const endpoint = `https://api.spotify.com/v1/playlists/${selectedPlaylist.spotifyId}/tracks`;
      let uris = [];
      let first = true;

      for (const track of selectedPlaylist.tracks) {
        const trackUri = track.uri;
        uris.push(trackUri);
      }

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Authorization" : "Bearer " + window.sessionStorage.getItem("token") 
        },
        ContentType : "application/json",
        body : JSON.stringify({
          "range_start" : 0,
          "uris" : uris
        })
      });

      if (response.ok) {
        setPlaylists((prev) => {
          for (const playlist of prev) {
            if (playlist.id === selectedPlaylist.id) {
              playlist.isAddingTracks = false;
            }
    
            return [...prev];
          }
        });

        if(newPlaylistSavedToSpotify) {
          setNewPlaylistSavedToSpotify(false);
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  if(hasSessionToken) {
    if(playlists.length > 0) {
      localStorage.setItem("savedPlaylists", JSON.stringify(playlists));
      localStorage.setItem("savedIndex", playlistId);
    } else if (playlists.length === 0) {
      if(localStorage.getItem("savedPlaylists")) {
        localStorage.removeItem("savedPlaylists");
        localStorage.removeItem("savedIndex");
      }
    }
    
    return (
      <div className={styles.mainPage}>
        <div className={styles.backgroundOverlay}>
          <header className={styles.header}>
            <h1 style={{display: "inline", textAlign: "center", width: "100%"}}>My spotify Custom playlists</h1>
          </header>

          <section className={styles.playlistSectionContainer}>
            <h2>Create your own playlists</h2>
            <form onSubmit={handleNewPlaylistOnSubmit} className={styles.barComponentMargin}>
              <input type="text" value={newPlaylist} onChange={newPlayListOnChange}/>
              <button type="submit">Create Playlist</button>
            </form>
            <Playlist 
              playlists={playlists} 
              setPlaylists={setPlaylists}
              newPlaylistName={newPlaylistName}
              setNewPlaylistName={setNewPlaylistName}
            />
          </section>
      
          <section className={styles.trackListSectionContainer}>
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
            <Tracklist 
              searchResults={searchResults}
              playlists={playlists}
              setPlaylists={setPlaylists}
            />
          </section>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <button style={{margin: '30px auto', maxHeight: "30px"}} onClick={handleSavePlaylistsToSpotifyOnClick}>Save selected playlist to Spotify</button>    
          </div>  
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.mainPage}>
        <div className={styles.backgroundOverlay}>
          <div style={{display: "flex", height: "100vh", justifyContent: "center"}}>
            <button onClick={handleLoginOnClick} style={{alignSelf: "center", justifyContent: "center", width: "300px", fontSize: "48px", padding: "25px"}}>Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;