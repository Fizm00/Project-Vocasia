import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); 

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="w-full md:w-1/2 h-screen">
        <img
          src="../registerImage.jpg"
          alt="Registrasi"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 h-screen flex flex-col justify-center items-center px-4 bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#193F3D" }}>
          Registrasi ke AnakKost
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-xs">
          <div>
            <label htmlFor="full-name" className="block mb-1 font-medium text-sm">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="full-name"
              id="full-name"
              className="bg-white border border-gray-300 text-gray-700 rounded-lg w-full p-2 text-sm"
              placeholder="Nama Anda"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 font-medium text-sm">
              Nomor Handphone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="bg-white border border-gray-300 text-gray-700 rounded-lg w-full p-2 text-sm"
              placeholder="08XXXXXXXXXX"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-sm">
              Alamat Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-white border border-gray-300 text-gray-700 rounded-lg w-full p-2 text-sm"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="bg-white border border-gray-300 text-gray-700 rounded-lg w-full p-2 text-sm pr-10"
                placeholder="* * * * * * * * * *"
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <FaEyeSlash size={15} className="text-gray-500" />
                ) : (
                  <FaEye size={15} className="text-gray-500" />
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block mb-1 font-medium text-sm">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm-password"
                id="confirm-password"
                className="bg-white border border-gray-300 text-gray-700 rounded-lg w-full p-2 text-sm pr-10"
                placeholder="* * * * * * * * * *"
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={15} className="text-gray-500" />
                ) : (
                  <FaEye size={15} className="text-gray-500" />
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full text-white font-bold rounded-lg py-2"
              style={{
                backgroundColor: "#193F3D",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#145B54")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#193F3D")}
            >
              Daftar
            </button>
          </div>

          <div className="text-xs font-medium text-gray-700 text-center mt-4">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-[#193F3D] hover:text-[#145B54] hover:underline"
            >
              Masuk di sini
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;