import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const NavbarSearch = ({ toggleFilterSidebar, setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    setIsLoggedIn(!!token);
    if (name) {
      setUsername(JSON.parse(name));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-darkGreen shadow-md p-4 sticky top-0 z-50">
      <div className="container ml-1 mr-0 flex justify-between items-center">
        {/* Logo dan Nama Web */}
        <div className="flex items-center space-x-2">
          <img
            src="./src/assets/logo-anakkost.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="text-lg md:text-2xl font-bold text-white">
            <Link to="/"> AnakKost </Link>
          </span>
        </div>

        {/* Form Pencarian */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center sm:w-1/2 max-w-lg border rounded-lg overflow-hidden"
        >
          <span className="absolute left-3 text-gray-700">
            <FaSearch />
          </span>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-16 py-2 text-sm border-none focus:outline-none rounded-l-lg transition duration-200"
            placeholder="Cari Kost..."
          />
          <button
            type="submit"
            className="absolute right-1 bg-greenButton px-5 py-1 text-sm font-semibold text-white hover:bg-hoverGreen transition duration-200 rounded-lg"
          >
            Cari
          </button>
        </form>

        {/* Filter Button */}
        <button
            onClick={toggleFilterSidebar}
            className="flex items-center space-x-1 bg-greenButton px-3 py-1 font-semibold text-white rounded-md hover:bg-hoverGreen focus:outline-none transition duration-200 hidden sm:flex"
          >
            <IoFilter className="text-lg" />
            <span className="hidden sm:inline">Filter</span>
          </button>

          <button
            onClick={toggleFilterSidebar}
            className="flex items-center justify-center bg-greenButton px-3 py-2 font-semibold text-white rounded-md hover:bg-hoverGreen focus:outline-none transition duration-200 sm:hidden"
          >
            <IoFilter className="text-lg" />
          </button>

        {/* Navbar Links */}
        <div className="flex items-center mr-2 space-x-8 hidden md:flex">
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
          {isLoggedIn && (
            <Link to="/notification" className="text-md font-semibold text-white relative group">
              Notification
            </Link>
          )}
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <FaUserCircle className="text-white text-2xl" />
              <Link to="/profile" className="hover:bg-hoverGreen">
                <span className="text-white text-md font-semibold">
                  Hi, {username}
                </span>
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-darkGreen text-sm font-semibold p-2 px-6 rounded-full hover:bg-hoverGreen hover:text-white transition duration-200"
            >
              Masuk
            </Link>
          )}
        </div>

        {/* Menu Hamburger untuk Mobile */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <div className="space-y-1 ml-1 mr-2">
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col items-center mt-4 bg-darkGreen p-4 md:hidden">
          <Link to="/" className="text-md font-semibold text-white py-2">
            Beranda
          </Link>
          <Link to="/search" className="text-md font-semibold text-white py-2">
            Search
          </Link>
          <Link to="/about" className="text-md font-semibold text-white py-2">
            About
          </Link>
          <Link to="/contact" className="text-md font-semibold text-white py-2">
            Contact
          </Link>
          {isLoggedIn && (
            <Link to="/notification" className="text-md font-semibold text-white py-2">
              Notification
            </Link>
          )}
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 text-white py-2">
              <FaUserCircle className="text-2xl" />
              <span className="font-semibold">User</span>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-darkGreen text-sm font-semibold p-2 px-6 rounded-full hover:bg-hoverGreen hover:text-white transition duration-200"
            >
              Masuk
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default NavbarSearch;
