import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#193F3D] text-white py-8 px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-start space-x-2">
          <img
            src="/logoAnakKost.png"
            alt="AnakKost Logo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <h3 className="text-base font-bold text-white">AnakKost</h3>
            <p className="text-xs text-white mt-1">
              AnakKost memudahkan pencarian kost terjangkau dengan fasilitas lengkap, terverifikasi, dan layanan pelanggan responsif.
            </p>
          </div>
        </div>

        <div className="pl-4">
          <h3 className="text-base font-semibold mb-2">Perusahaan</h3>
          <ul className="text-xs">
            <li className="mb-1"><Link to="/about" className="hover:text-green-400">Tentang AnakKost</Link></li>
            <li className="mb-1"><Link to="/search" className="hover:text-green-400">Temukan Kost</Link></li>
            <li className="mb-1"><Link to="/blog" className="hover:text-green-400">Blogs</Link></li>
            <li className="mb-1"><Link to="/faq" className="hover:text-green-400">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-2">Help Center</h3>
          <ul className="text-xs">
            <li className="mb-1"><Link to="/register" className="hover:text-green-400">Gabung Dengan AnakKost</Link></li>
            <li className="mb-1"><Link to="/rental-guides" className="hover:text-green-400">Aturan dan Kebijakan</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-2">Informasi Kontak</h3>
          <ul className="text-xs">
            <li className="flex items-center mb-1">
              <FaPhoneAlt className="mr-2" />
              <span>Telepon: 0858 1234 5678</span>
            </li>
            <li className="flex items-center mb-1">
              <FaEnvelope className="mr-2" />
              <span>Email: anakkost.company@gmail.com</span>
            </li>
            <li className="flex items-center mb-1">
              <FaMapMarkerAlt className="mr-2" />
              <span>Lokasi: Jalan Telukjambe Timur No. 1234, Karawang, Jawa Barat</span>
            </li>
          </ul>
          <div className="flex justify-start gap-6 mt-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-600">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-600">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-700">
              <FaLinkedin />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-red-600">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-400 mt-8 pt-4">
        <div className="text-center text-xs">
          <p>© 2024 AnakKost | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;