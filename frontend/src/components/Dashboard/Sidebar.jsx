import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Home, Menu, User } from 'react-feather';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [isManajemenOpen, setIsManajemenOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <button
        className="fixed z-50 p-2 text-white rounded-md md:hidden top-3 left-4 bg-darkGreen"
        onClick={toggleMobileMenu}
      >
        <Menu size={24} />
      </button>

      <div className={`fixed inset-y-auto z-30 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out w-64 bg-white border-r border-b border-gray-200 overflow-y-auto`}>
        <div className="flex flex-col p-4">
          <Link
            to="/dashboard"
            className="flex items-center p-3 space-x-3 text-white rounded-md bg-darkGreen"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link
            to="/properties"
            className="flex items-center p-3 mt-2 space-x-3 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home size={20} />
            <span>Kos Saya</span>
          </Link>

          <div className="mt-2">
            <button
              onClick={() => setIsManajemenOpen(!isManajemenOpen)}
              className="flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-100"
            >
              <div className="flex items-center space-x-3">
                <Home size={20} />
                <span>Manajemen Kos</span>
              </div>
              {isManajemenOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {isManajemenOpen && (
              <div className="mt-2 ml-8 space-y-2">
                <Link
                  to="/rent-approval"
                  className="block p-2 rounded-md hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pengajuan Sewa
                </Link>
                <Link
                  to="/add-kost"
                  className="block p-2 rounded-md hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tambah Kos
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/account"
            className="flex items-center p-3 mt-2 space-x-3 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <User size={20} />
            <span>Akun</span>
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}