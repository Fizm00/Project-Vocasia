import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/search');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-between w-full bg-white px-4 py-2 rounded-full shadow-md mt-6 max-w-lg mx-auto">
      <div className="flex flex-col w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Cari Nama Kos, Lokasi, Alamat, Harga, atau Tipe"
          className="p-1.5 border border-gray-300 rounded-full text-xs text-center text-black w-full"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-[#193F3D] text-white px-3 py-1.5 rounded-full hover:bg-[#145B54] ml-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;