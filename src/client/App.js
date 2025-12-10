import './App.css';
import {getSeasonAnime, searchAnime} from "../server/MAL"

function App() {
  const handleSearch = async () => {
    const results = await searchAnime("Naruto: Shippuuden", 5);
    console.log(results);
  };

  return (
    <div>
        <button onClick={handleSearch}>
          Search "Naruto"
        </button>

    </div>
  );
}

export default App;
