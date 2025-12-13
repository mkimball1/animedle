import "./Search.css"

export function SearchCard({title, main_picture}){
    return (
        <div 
            className="container"
        >
            {main_picture && 
                <img src={main_picture} alt={title} className="thumbnail"/>
            }
            <span className="title"> {title} </span>
        </div>
    )
}