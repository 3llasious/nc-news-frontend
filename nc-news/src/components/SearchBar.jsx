import { useState } from "react";

function SearchBar({ setSearchTerm }) {
  const [inputVal, setInputVal] = useState("");
  return (
    <input
      className="search-input"
      value={inputVal}
      onChange={(e) => {
        setInputVal(e.target.value); //sets input
        setSearchTerm(e.target.value); // updates the search page about it
      }}
      placeholder="search something..."
    />
  );
}

export default SearchBar;
