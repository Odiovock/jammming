import React, {useState, useEffect} from 'react';
import './App.css';
import {Tracks, Playlists} from './mockdata/mockdata';
import SearchBar from './components/SearchBar';
import Tracklist from './components/Tracklist';
import Playlist from './components/Playlist';

function App() {
  const [searchResult, setSearchResult] = useState(Tracks);
  const [playlists, setPlaylists] = useState(Playlists);

  useEffect(() => {
    document.title = "Spotify App";
  }, []);

  return (
    <div>
      <Playlist playlists={playlists} setPlaylists={setPlaylists} />
      <button>Save to Spotify</button>
      <div>
        <Tracklist tracklist={searchResult}/>
        <SearchBar/>
        <button>Search</button>
      </div>      
    </div>
  );
}

export default App;
