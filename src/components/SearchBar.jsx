import React from 'react';

function SearchBar({ searchQuery, handleSearch }) {
  return (
    <div className="text-center mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for universities..."
        className="px-4 py-2 rounded-lg border border-gray-300 w-1/2 text-lg"
      />
    </div>
  );
}

export default SearchBar;
