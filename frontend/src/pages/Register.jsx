import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { registerUser } from "../api/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    let errorMessage = "";

    if (name === "fullName" && !value) {
      errorMessage = "Nama tidak boleh kosong.";
    }

    if (name === "phone" && (!/^\d{10,}$/.test(value) || value === "")) {
      errorMessage = "Nomor handphone harus berupa angka minimal 10 digit.";
    }

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMessage = "Email tidak valid.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (name === "password" && !passwordRegex.test(value)) {
      errorMessage =
        "Password harus minimal 8 karakter, mengandung satu huruf besar, dan satu angka.";
    }

    if (name === "confirmPassword" && value !== formData.password) {
      errorMessage = "Password tidak cocok.";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (e) => {
    try {
      const userData = registerUser(
        formData.fullName,
        formData.phone,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      console.log("User Register:" + userData);
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: error.message }));
    }
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");
    const isEmpty = Object.values(formData).some((field) => field === "");

    if (hasErrors || isEmpty) {
      alert("Harap isi semua kolom dengan benar.");
      return;
    }

    alert("Registrasi berhasil!");
    navigate("/login");
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2">
        <img
          src="../registerImage.jpg"
          alt="Registrasi"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 bg-white">
        <motion.div
          className="w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#193F3D" }}
            variants={itemVariants}
          >
            Registrasi ke AnakKost
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={itemVariants}
          >
            <div>
              <label
                htmlFor="fullName"
                className="block mb-1 font-medium text-sm"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`bg-white border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } text-gray-700 rounded-lg w-full p-3 text-sm`}
                placeholder="Nama Anda"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 font-medium text-sm">
                Nomor Handphone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`bg-white border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } text-gray-700 rounded-lg w-full p-3 text-sm`}
                placeholder="08XXXXXXXXXX"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-sm">
                Alamat Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-white border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } text-gray-700 rounded-lg w-full p-3 text-sm`}
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-sm"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-white border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } text-gray-700 rounded-lg w-full p-3 text-sm`}
                  placeholder="Masukkan password Anda"
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
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-medium text-sm"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`bg-white border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-700 rounded-lg w-full p-3 text-sm`}
                  placeholder="Masukkan konfirmasi password Anda"
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-darkGreen text-white font-bold rounded-lg py-3"
              >
                Daftar
              </button>
            </div>
          </motion.form>

          <motion.div
            className="text-sm font-medium text-gray-700 text-center mt-4"
            variants={itemVariants}
          >
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-[#193F3D] hover:text-[#145B54] hover:underline font-bold"
            >
              Masuk di sini
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
