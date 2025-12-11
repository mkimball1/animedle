import { SearchCard } from "./SearchCard";


export function SearchResults({res, highlightIndex, onSelect, listRef}){
    if (!res | res.length === 0) return null

    return (
        <div    
        ref={listRef}
        style={{
            maxHeight: "250px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginTop: "8px",
        }}>
            {res.map((node, index) => {
                const data = node.node ?? node
                return (
                    <div
                        key={`sc${index}`}
                        data-index={index} 
                    > 
                        <SearchCard 
                            key={`sc${index}`}
                            title={data.title}
                            main_picture={data.main_picture.medium}
                            isActive={index === highlightIndex}
                            onClick={() => {onSelect?.(data, index)}}
                        />
                    </div>
                    
                )
            })}
        </div>

    )
}