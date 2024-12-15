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
    <div className="flex items-center justify-between w-full max-w-3xl bg-white px-4 py-2 rounded-full shadow-md mt-6 mx-auto sm:px-6 md:px-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Cari Nama Kos, Lokasi, Alamat, Harga, atau Tipe"
        className="flex-1 p-2 border border-gray-300 text-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#193F3D] sm:text-sm md:text-base"
      />
      <button
        onClick={handleSearch}
        className="ml-3 bg-[#193F3D] text-white p-2 rounded-full hover:bg-[#145B54] focus:outline-none focus:ring-2 focus:ring-[#145B54]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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