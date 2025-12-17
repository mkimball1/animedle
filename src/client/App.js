import "./App.css";
import { SearchBar } from "./components/Search/SearchBar";
import { Game } from "./components/Game/Game";
import { useGame } from "./hooks/useGame";

function App() {
  const {
    selectedAnime,
    setSelectedAnime,
    solution,
    error,
    generateRandomAnime,
  } = useGame();

  return (
    <div>
      <SearchBar 
        setSelectedAnime={setSelectedAnime}
      />

      <Game
        selectedAnime={selectedAnime}
        setSelectedAnime={setSelectedAnime}
        solution={solution}
        error={error}
        onNewGame={generateRandomAnime}
      />
    </div>
  );
}

export default App;
