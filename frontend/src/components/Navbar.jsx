import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo-anakkost.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);
      setProfileImage(userData.profileImage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setProfileImage(null);
    setIsMenuOpen(false);
    navigate("/", { replace: true });
  };

  const handleProfileClick = () => navigate("/profile");

  return (
    <header className="bg-darkGreen shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-lg md:text-2xl font-bold text-white">AnakKost</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-md font-semibold text-white relative group">
            Beranda
            <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link to="/search" className="text-md font-semibold text-white relative group">
            Cari
            <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link to="/about" className="text-md font-semibold text-white relative group">
            Tentang
            <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link to="/contact" className="text-md font-semibold text-white relative group">
            Kontak
            <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
          </Link>
          {isLoggedIn && (
            <Link to="/notification" className="text-md font-semibold text-white relative group">
              Notification
              <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
            </Link>
          )}
          {isLoggedIn ? (
            <div className="flex items-center space-x-6 cursor-pointer" onClick={handleProfileClick}>
              <span className="text-white font-semibold">{user.name}</span>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-white">P</span>
                  </div>
                )}
              </div>
              <button onClick={handleLogout} className="text-white font-semibold ml-6">
                <FaSignOutAlt className="text-white text-xl" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-darkGreen text-sm font-semibold py-2 px-6 rounded-full hover:bg-hoverGreen hover:text-white transition duration-200">
              Masuk
            </Link>
          )}
        </div>
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <div className="space-y-1">
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </div>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-darkGreen p-4 space-y-2">
          <Link to="/" className="text-md font-semibold text-white">Beranda</Link>
          <Link to="/search" className="text-md font-semibold text-white">Cari</Link>
          <Link to="/about" className="text-md font-semibold text-white">Tentang</Link>
          <Link to="/contact" className="text-md font-semibold text-white">Kontak</Link>
          {isLoggedIn && <Link to="/notification" className="text-md font-semibold text-white">Notifikasi</Link>}
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 text-white">
              <span className="text-sm font-semibold">{user.name}</span>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-white">P</span>
                  </div>
                )}
              </div>
              <button onClick={handleLogout} className="text-white text-sm font-semibold ml-2">
                <FaSignOutAlt className="text-white text-xl" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-darkGreen text-sm font-semibold py-2 px-6 rounded-full hover:bg-hoverGreen hover:text-white transition duration-200">
              Masuk
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;