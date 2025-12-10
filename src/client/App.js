import './App.css';
import {getSeasonAnime, searchAnime} from "../server/MAL"
import {useState} from 'react';

function App() {
  const [query, setQuery] = useState("")
  const [res, setRes] = useState()

  const handleSearch = async (q) => {
    const results = await searchAnime(q);
    console.log(results.data);
    return results.data
  };

  function submitQuery(){
    console.log(`Query: ${query}`)
    setRes(handleSearch(query))
    setQuery("")
  }

  return (
    <div>
        <input placeholder='input...' value={query} onChange={(e) => {setQuery(e.target.value)}}/>
        <button onClick={submitQuery}> Submit! </button>
        <p> {query} </p>
        {/* <p> {res} </p> */}
    </div>
  );
}

export default App;
