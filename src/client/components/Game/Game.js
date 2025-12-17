import { useEffect, useState } from "react"
import { searchAnimeByID } from "../../api/malApi";
import { GameTable } from "./GameTable";

import * as GuessUtils from "./Guess";

export function Game({selectedAnime, setSelectedAnime, solution, error, onNewGame}){
    console.log("solution:", solution)
    const [guesses, setGuesses] = useState([])

    useEffect(() => {
        if (!selectedAnime) return;

        let cancelled = false;

        (async () => {
            try {
            const res = await searchAnimeByID(selectedAnime.id);
            if (cancelled) return;

            setGuesses(prev => {
                if (prev.some(g => g.id === selectedAnime.id)) return prev;
                return [new GuessUtils.Guess(res), ...prev];
            });

            if (selectedAnime.id === solution?.id) {
                console.log("You win!");
            }
            } catch (e) {
            console.error(e);
            }
        })();

        return () => { cancelled = true; };
    }, [selectedAnime, solution]);


    function playAgain(){
        setGuesses([])
        setSelectedAnime(null)
        onNewGame()
    }

    if (!solution) {
        return <div>Loading solution…</div>; // or spinner
    }

    return (
        <div>
            {guesses.length !== 0 && <GameTable guesses={guesses} solution={solution} />}
            <button onClick={playAgain}>play again</button>
        </div>
    );
}

// When selected the solution, what rules should be in place to filter possible solutions?
// I can flatten the lists (graph problem) to only include 1st seasons using the related_anime field
// Or i can check if it has a prequel, and if it does generate a new show
// Pros: Don't need to worry about mha s1 vs mha s9, the entire season will be encapsulated by mha s1
// Cons: Series with more seasons weighted heavier, but would happen anyways
//     - I could just have an index on disc with preflattened data, so shows would be weighted equally
//     - Would also require less API calls since i could just read from a txt file with vaild IDs

// media_type: "movie", "tv" || Cannot be of type ova, ona, special
// related_anime: in related_anime, if there is an entry with relation_type of "full story", "alternative_version", ignore it