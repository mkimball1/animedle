import { SearchCard } from "./SearchCard";
import "./Search.css";

export function SearchResults({
  isOpen,
  items,
  highlightedIndex,
  getMenuProps,
  getItemProps,
}) {
  return (
    <div
      {...getMenuProps()}
      className="search-results"
      style={{ display: isOpen && items.length ? "block" : "none" }}
    >
      {items.map((item, index) => (
        <div
          key={item.id ?? index}
          {...getItemProps({ item, index })}
          className={`search-item ${index === highlightedIndex ? "active" : ""}`}
        >
          <SearchCard
            title={item.title}
            main_picture={item.main_picture?.large}
          />
        </div>
      ))}
    </div>
  );
}