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

  useEffect(() => {
    document.title = "Spotify App";
  }, []);

  function newPlayListOnChange (event) {
    setNewPlaylist(event.target.value);
  }

  function handleNewPlaylistOnSubmit (event) {
    event.preventDefault();
    if(newPlaylist) {
      const customPlaylist = {title: newPlaylist, tracks: []};
      setPlaylists((prevList) => [...prevList, customPlaylist])
      setNewPlaylist("");
    }
  }

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
        <SearchBar/>
        <button>Search</button>
      </section>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <button style={{margin: 'auto'}}>Save to Spotify</button>    
      </div>  
    </div>
  );
}

export default App;
