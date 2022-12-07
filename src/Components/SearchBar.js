import React from "react";
import "../App.css";

const SearchBar = (props) => {
  const { handleSearch, searchValue } = props;
  return (
    <div className="headStyle">
      <input
        type="text"
        name="search_bar"
        id="search"
        placeholder="Search by name, email or role"
        onChange={handleSearch}
        value={searchValue}
      />
    </div>
  );
};

export default SearchBar;
