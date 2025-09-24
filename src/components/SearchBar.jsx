import React from "react";

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      placeholder="Search patients..."
      className="border p-2 rounded w-full md:w-1/2"
    />
  );
}

export default SearchBar;
