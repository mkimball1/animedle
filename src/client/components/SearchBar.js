import {searchAnime} from "../../server/MAL"
import {useState, useEffect, useRef} from 'react';

import { useCombobox } from "downshift";

import { SearchResults } from "./SearchResults";

export function SearchBar() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const timerRef = useRef(null);

    const handleItemToString = ({item}) => {
        return (item?.title) ?? ""
    }

    const handleInputValueChange = (inputValue) => {
        const q = String(inputValue.inputValue ?? "").trim()
        // console.log(q)

        if (q.length < 2) {
            if (timerRef.current) clearTimeout(timerRef.current);
            setItems([]);
            setLoading(false);
            return;
        } else {
            openMenu();
        }

        // Debounce API calls
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setLoading(true);

        timerRef.current = setTimeout(async () => {
            try {
                const res = await searchAnime(q, 25);
                const normalized = res.data.map((x) => x.node ?? x);
                // console.log(normalized)
                setItems(normalized);
                openMenu();
            } catch (e) {
                console.error(e);
                setItems([]);
            } finally {
                setLoading(false);
            }
        }, 300);
    }

    const handleSelectItem = ({selectedItem}) => {
        if (!selectedItem) {
            return;
        }
        console.log("Selected:", selectedItem);

        setInputValue("");
        closeMenu();
    }

    const {
        isOpen,
        highlightedIndex,

        getMenuProps,
        getInputProps,
        getItemProps,
        getLabelProps,

        openMenu,
        closeMenu,
        setInputValue,
    } = useCombobox({
            items,
            itemToString: handleItemToString,
            onInputValueChange: handleInputValueChange,
            onSelectedItemChange: handleSelectItem
    });
    
    //cleanup
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);
    
    return (
        <>
            <div>
                <label {...getLabelProps()}>
                    Search
                </label>
                <input
                    {...getInputProps({
                        placeholder: "Search anime...",
                    })}
                />

                {loading && <p>loading...</p>}

                <SearchResults
                    isOpen={isOpen}
                    items={items}
                    highlightedIndex={highlightedIndex}
                    getMenuProps={getMenuProps}
                    getItemProps={getItemProps}
                />
            </div>
        </>
    )
}