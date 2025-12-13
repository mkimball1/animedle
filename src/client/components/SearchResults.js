import { SearchCard } from "./SearchCard";
import "./SearchResults.css";

export function SearchResults({
    isOpen,
    items,
    highlightedIndex,
    getMenuProps,
    getItemProps,
}) {
    if (!isOpen || !items.length) return null;

    return (
        <div {...getMenuProps()} className="search-results">
        {items.map((item, index) => (
            <div
                key={item.id ?? index}
                {...getItemProps({ item, index })}
                className={`search-item ${ index === highlightedIndex ? "active" : "" }`} // conditional class naming
            >
            <SearchCard
                title={item.title}
                main_picture={item.main_picture?.medium}
            />
            </div>
        ))}
        </div>
    );
}