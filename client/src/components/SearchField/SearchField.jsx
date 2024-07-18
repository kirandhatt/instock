import React from "react";
import "./SearchField.scss";

function SearchField() {
  return (
    <div className="search-field">
      <input
        className="search-field__input"
        type="text"
        id="searchField"
        placeholder="Search..."
      />
      <div className="search-field__icon"></div>
    </div>
  );
}

export default SearchField;
