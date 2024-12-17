import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo-anakkost.png";
import { logoutUser } from "../api/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem("name");
    if (storedUser) {
      const userData = storedUser;
      setUsername(userData);
      setIsLoggedIn(true);
      // setProfileImage(userData.profileImage);
    }
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   setIsLoggedIn(false);
  //   setUser(null);
  //   setProfileImage(null);
  //   setIsMenuOpen(false);
  //   navigate("/", { replace: true });
  // };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const name = localStorage.getItem("name");
  //   setIsLoggedIn(!!token);
  //   if (name) {
  //     setUsername(JSON.parse(name));
  //   }
  // }, []);

  return (
    <header className="bg-darkGreen shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-lg md:text-2xl font-bold text-white">
            <Link to="/"> AnakKost </Link>
          </span>
        </div>
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
          {isLoggedIn && (
            <Link
              to="/notification"
              className="text-md font-semibold text-white relative group"
            >
              Notification
              <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
            </Link>
          )}
          {isLoggedIn ? (
            <div className="relative">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={toggleDropdown}
              >
                <FaUserCircle className="text-white text-2xl" />
                <span className="text-white text-md font-semibold">
                  Hi, {username}
                </span>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-darkGreen hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-darkGreen hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
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
          {isLoggedIn && (
            <div className="flex flex-col items-start space-y-2">
              <Link to="/profile" className="text-md font-semibold text-white">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-md font-semibold text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
