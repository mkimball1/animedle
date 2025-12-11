import "./SearchCard.css"

export function SearchCard({title,main_picture}){
    return (
        <div className="container">
            <img src={main_picture} alt={title} className="thumbnail"/>
            <h2 className="title"> {title} </h2>
        </div>
    )
}