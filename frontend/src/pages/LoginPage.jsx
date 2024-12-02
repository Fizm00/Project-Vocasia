import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import bgLogin from "../assets/background-login.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home"); 
  };

  const handleRegister = () => {
    navigate("/register"); 
  };

  return (
    <div className="flex h-screen">
      {/* Bagian Kiri: Form Login */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-16">
        <h1 className="text-darkGreen text-3xl font-bold mb-12">Login ke AnakKost</h1>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 text-gray-700 rounded-md"
              placeholder="Masukkan email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full p-3 border border-gray-300 text-gray-700 rounded-md"
              placeholder="Masukkan password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 text-gray-500"
            >
              {passwordVisible ? (
                <FaEyeSlash className="h-6 w-6 text-gray-500" />
              ) : (
                <FaEye className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
          <div className="my-4 text-center text-gray-500">atau</div>
          <button
            type="button"
            className="w-full flex items-center justify-center p-3 mb-4 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
              alt="Google Logo"
              className="w-4 h-4 mr-2"
            />
            Login menggunakan Google
          </button>
          <button
            type="submit"
            className="w-full bg-darkGreen text-white p-3 rounded-md hover:bg-hoverGreen"
          >
            Login
          </button>
        </form>
        <div className="text-xs font-medium text-gray-700 text-center mt-4">
          Belum punya akun AnakKost?{" "}
          <button
            onClick={handleRegister}
            className="bg-white text-darkGreen font-bold hover:text-hoverGreen hover:underline"
          >
            Daftar Sekarang
          </button>
        </div>
      </div>
      {/* Bagian Kanan: Gambar */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgLogin})`,
        }}
      ></div>
    </div>
  );
};

export default LoginPage;