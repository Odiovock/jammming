import React, {useState, useEffect} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Tracklist from './components/Tracklist';
import Playlist from './components/Playlist';

function App() {
  const [searchResult, setSearchResult] = useState(
    [
      {
        id: 1,
        name: "Song of test",
        artist: "Zelda",
        album: "Ocarina fire"
      },
      {
        id: 2,
        name: "Song of time",
        artist: "Zelda",
        album: "Ocarina oldies"
      }
    ]
  );
  const [playlist, setPlaylist] = useState(
    [
      {
        title: "My sherona",
        tracks: [
          "Song of test",
          "Song of time"
        ]
      },
      {
        title: "Guilty pleasures",
        tracks: [
          "Photograph",
          "Hero"
        ]
      }
    ]
  );

  useEffect(() => {
    document.title = "Spotify App";
  }, []);

  return (
    <div>
      <Playlist playlists={playlist} />
      <Tracklist tracklist={searchResult}/>
      <SearchBar/>
      <button>Save to Spotify</button>
      <button>Search</button>
    </div>
  );
}

export default App;
