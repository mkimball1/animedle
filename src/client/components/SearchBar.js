import {getSeasonAnime, searchAnime} from "../../server/MAL"
import {useState, useEffect, useReducer, useRef} from 'react';

import { SearchCard } from "./SearchCard";
import { SearchResults } from "./SearchResults";

export function SearchBar() {
    const [query, setQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(-1)
    
    const [loading, setLoading] = useState(false)
    const [res, setRes] = useState([])

    const listRef = useRef(null) // what does useref do

    // Update debounced query after 500 ms of no activity
    useEffect(() => {
        if (!query) {
            setDebouncedQuery("");
            setHighlightIndex(-1)
            return;
        }

        setLoading(true)
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            setLoading(false)
        }, 500)

        
        // Update Query here
        return () => {
            clearTimeout(timer)
            setLoading(false)
        }
    }, [query])

    // When debounced query changes (500 ms have passed), call API & update states
    useEffect(() => {
        if(!debouncedQuery) return;

        console.log("Found results!")
        const fetchData = async () => {
            const results = await searchAnime(debouncedQuery);
            console.log(results.data);
            setLoading(false)
            setRes(results.data)
            setHighlightIndex(results.data.length ? 0 : -1) 
        };

        fetchData();
        
    }, [debouncedQuery])

    useEffect(() => {
        if (!listRef.current) return;
        if (highlightIndex < 0) return;

        const item = listRef.current.querySelector(
            `[data-index="${highlightIndex}"]`
        );
        if (item) {
            item.scrollIntoView({ block: "nearest" });
        }
            
    }, [highlightIndex])

    const handleKeyDown = (e) => {
    if (!res.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < res.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } 
    // If you want TAB to move selection instead of leaving input:
    // else if (e.key === "Tab") { ...; e.preventDefault(); }
  };

    return (
        <>
            <input 
                type="text"
                placeholder='Search...' 
                value={query} 
                onChange={(e) => {setQuery(e.target.value)}}
                onKeyDown={handleKeyDown}
            />

            {loading && <p> loading... </p>}
            <SearchResults
                res={res}
                highlightIndex={highlightIndex}
                listRef={listRef}
                onSelect={(data, index) => {
                    console.log(data, index)
                    setHighlightIndex(index)
                }}
            />
            
            
        </>
    )
}