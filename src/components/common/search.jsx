import React from "react";

const Search = ({ value, onSearch }) => {
  return (
    <input
      onChange={onSearch}
      type="text"
      value={value}
      className="form-control"
      placeholder="Search ..."
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  );
};

export default Search;
