function SearchBar() {
  return (
    <form action="GET">
      <input
        className="search-input"
        style={{ width: "100%", paddingRight: "50px" }}
        type="text"
        placeholder="search something..."
      />
    </form>
  );
}

export default SearchBar;
