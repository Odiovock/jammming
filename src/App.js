import React, {useState, useEffect} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Tracklist from './components/Tracklist';

function App() {
  const [tracks, setTracks] = useState(
    [
      {
        title: "Song of test",
        artist: "Zelda",
        album: "Ocarina fire"
      },
      {
        title: "Song of time",
        artist: "Zelda",
        album: "Ocarina oldies"
      }
    ]
  );

  useEffect(() => {
    document.title = "Spotify App";
  }, []);

  return (
    <div>
      <Tracklist tracks={tracks}/>
      <SearchBar/>
      <button>Save to Spotify</button>
      <button>Search</button>
    </div>
  );
}

export default App;
