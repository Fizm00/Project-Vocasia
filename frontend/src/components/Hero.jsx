import React from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/homeImage.png')", backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      <div className="relative z-20 text-center text-white flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 transition-all duration-500 ease-out hover:scale-110 hover:translate-x-2 hover:translate-y-2">
          Temukan Kost Impianmu <br /> dengan Mudah dan Cepat!
        </h1>

        <div className="w-full max-w-5xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;