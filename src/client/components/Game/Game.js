import { useEffect, useState } from "react"
import { searchAnimeByID } from "../../../server/MAL"

export function Game({selectedAnime}) {
    const [animeInfo, setAnimeInfo] = useState({})

    const fetchAnime = async () => {
        try{
            console.log(selectedAnime.id)
            const res = await searchAnimeByID(selectedAnime.id)
            console.log(res)
        } catch (e){
            console.error(e);
        }
    }

    useEffect( () => {
        if (!selectedAnime) { return }
        fetchAnime()

    }, [selectedAnime])

    return (
        <div>
            {selectedAnime && <p> {selectedAnime.title} </p>}
        </div>
        
    )
}