import './App.css';
import {getSeasonAnime, searchAnime} from "../server/MAL"
import {useState} from 'react';
import { SearchBar } from './components/SearchBar';

function App() {
  

  return (
    <div>
        <SearchBar/>
    </div>
  );
}

export default App;
