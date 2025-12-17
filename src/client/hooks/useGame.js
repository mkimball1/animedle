import { useCallback, useEffect, useState, useRef } from "react";
import { getRandomAnime } from "../api/malApi";
import * as GuessUtils from "../components/Game/Guess";

export function useGame() {
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);

  const generateRandomAnime = useCallback(async () => {
    try {
      setError(null);
      const raw = await getRandomAnime();
      setSolution(new GuessUtils.Guess(raw));
      setSelectedAnime(null); // optional: reset selection on new round
    } catch (err) {
      setError(err);
      console.error("Failed to get random anime", err);
    }
  }, []);

    const didInit = useRef(false);

    useEffect(() => {
        if (didInit.current) return;
        didInit.current = true;
        generateRandomAnime();
    }, [generateRandomAnime]);

  return {
    selectedAnime,
    setSelectedAnime,
    solution,
    error,
    generateRandomAnime,
  };
}