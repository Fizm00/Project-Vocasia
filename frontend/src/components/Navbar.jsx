import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from '../assets/logo-anakkost.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-darkGreen shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo dan Nama Web */}
        <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-lg md:text-2xl font-bold text-white">
            AnakKost
          </span>
        </div>

        {/* Navbar Links dan Login/Avatar Button */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-md font-semibold text-white relative group"
          >
            Beranda
            <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link
            to="/search"
            className="text-md font-semibold text-white relative group"
          >
            Cari
            <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link
            to="/about"
            className="text-md font-semibold text-white relative group"
          >
            Tentang
            <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link
            to="/contact"
            className="text-md font-semibold text-white relative group"
          >
            Kontak
            <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <FaUserCircle className="text-white text-2xl" />
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-darkGreen text-sm font-semibold py-2 px-6 rounded-full hover:bg-hoverGreen hover:text-white transition duration-200"
            >
              Masuk
            </Link>
          )}
        </div>

        {/* Menu Hamburger untuk Tampilan Mobile */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <div className="space-y-1">
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-darkGreen p-4 space-y-2">
          <Link to="/" className="text-md font-semibold text-white">
            Beranda
          </Link>
          <Link to="/search" className="text-md font-semibold text-white">
            Cari
          </Link>
          <Link to="/about" className="text-md font-semibold text-white">
            Tentang
          </Link>
          <Link to="/contact" className="text-md font-semibold text-white">
            Kontak
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 text-white">
              <FaUserCircle className="text-2xl" />
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-darkGreen text-sm font-semibold py-2 px-6 rounded-full hover:bg-hoverGreen hover:text-white transition duration-200"
            >
              Masuk
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
