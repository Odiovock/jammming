import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div>
      <SearchBar/>
      <button>Save to Spotify</button>
      <button>Search</button>
    </div>
  );
}

export default App;
