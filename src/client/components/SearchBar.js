import {getSeasonAnime, searchAnime} from "../../server/MAL"
import {useState, useEffect} from 'react';

import { SearchCard } from "./SearchCard";

export function SearchBar() {
    const [query, setQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const [loading, setLoading] = useState(false)
    
    const [res, setRes] = useState([])

    // Update debounced query after 500 ms of no activity
    useEffect(() => {
        if (!query) {
            setDebouncedQuery("");
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
        };

        fetchData();
        
    }, [debouncedQuery])

    function updateQuery(e){
        setQuery(e.target.value)
    }
    
    function submitQuery(){
        console.log(`Query: ${query}`)
        // setRes(handleSearch(query))
        // setQuery("")
    }

    return (
        <>
            <input placeholder='input...' value={query} onChange={updateQuery}/>
            <button onClick={submitQuery}> Submit! </button>
            {loading ? <p> loading... </p> : 
                res.map((node, index) => {
                    const data = node.node
                    return (
                        <SearchCard key={`sc${index}`} title={data.title} main_picture={data.main_picture.medium}/>
                    )
                })
            }
            
            
        </>
    )
}