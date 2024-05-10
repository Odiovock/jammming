import React, {useEffect} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  const [tracks, setTracks] = useState(
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
  );

  useEffect(() => {
    document.title = "Spotify App";
  }, []);

  return (
    <div>
      <SearchBar/>
      <button>Save to Spotify</button>
      <button>Search</button>
    </div>
  );
}

export default App;
