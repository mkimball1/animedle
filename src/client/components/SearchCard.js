import "./SearchCard.css"

export function SearchCard({title, main_picture, index, isActive, onClick}){
    return (
        <div 
            className="container"
            data-index={index}
            onClick={onClick}
            style={{
                backgroundColor: isActive ? "#eee" : "white",
            }}

        >
            {main_picture && 
                <img src={main_picture} alt={title} className="thumbnail"/>
            }
            <span className="title"> {title} </span>
        </div>
    )
}