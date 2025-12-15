import './App.css';
import {useState} from 'react';
import { SearchBar } from './components/Search/SearchBar';
import { Game } from './components/Game/Game';

function App() {
  const [selectedAnime, setSelectedAnime] = useState(null)
  
  return (
    <div>
        <SearchBar setSelectedAnime={setSelectedAnime}/>
        <Game selectedAnime={selectedAnime}/> 
        
    </div>
  );
}

export default App;
