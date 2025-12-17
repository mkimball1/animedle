import { useEffect, useState } from "react"
import { searchAnimeByID, getRandomAnime } from "../../api/malApi";
import { GameTable } from "./GameTable";

import * as GuessUtils from "./Guess";

export function Game({selectedAnime}) {
    const [guesses, setGuesses] = useState([])

    useEffect(() => {
        if (!selectedAnime) return;

        // check for duplicates
        if (guesses.some(g => g.id === selectedAnime.id)) {
            return;
        }

        const fetchAnime = async () => {
            try {
                const res = await searchAnimeByID(selectedAnime.id);
                setGuesses(prev => [new GuessUtils.Guess(res), ...prev]);
                console.log(res)
            } catch (e) {
                console.error(e);
            }
        };

        fetchAnime();
        if(selectedAnime.id === 31988) {
            console.log("You win!")
        }
    }, [selectedAnime, guesses]);

    async function generateRandomAnime() {
        try {
            const anime = await getRandomAnime();
            console.log(anime)
        } catch (err) {
            console.error("Failed to get random anime", err);
        }
        }

    return (
        <div>
            {guesses.length !== 0 && <GameTable guesses={guesses}/>}

            <button onClick={() => {console.log(generateRandomAnime())}}> get random </button>
        </div>
        
        
    )
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