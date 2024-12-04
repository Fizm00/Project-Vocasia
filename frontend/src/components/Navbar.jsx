import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const navItems = [
    { path: '/', label: 'Beranda' },
    { path: '/search', label: 'Cari' },
    { path: '/about', label: 'Tentang' },
    { path: '/contact', label: 'Kontak' },
  ];

  return (
    <nav className="w-full bg-[#193F3D] text-white py-2 px-6 fixed top-0 left-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src="/logoAnakKost.png" 
            alt="AnakKost Logo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-base font-bold">AnakKost</span>
        </div>

        <div className="flex items-center space-x-6">
          <ul className="flex space-x-10 text-xs font-semibold">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={`hover:underline ${
                    location.pathname === item.path ? 'border-b-2 border-white' : ''
                  }`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            onClick={handleLoginClick}
            className="bg-white text-[#193F3D] px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200"
          >
            Masuk
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;