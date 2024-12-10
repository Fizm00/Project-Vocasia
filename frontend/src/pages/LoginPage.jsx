import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import bgLogin from "../assets/background-login.jpg";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { loginUser } from "../api/auth";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsPageReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      alert("Login dengan Google berhasil!");
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMessage = "Email tidak valid.";
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (name === "password" && !passwordRegex.test(value)) {
      errorMessage =
        "Password harus minimal 8 karakter, mengandung satu huruf besar, dan satu angka.";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const userData = loginUser(formData.email, formData.password);
      console.log("User Login:" + userData);

      if (!userData) {
        throw new Error("User not found.");
      }

      navigate("/home");
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: error.message }));
    }

    if (
      errors.email ||
      errors.password ||
      !formData.email ||
      !formData.password
    ) {
      alert("Harap isi semua kolom dengan benar.");
      return;
    }

    alert("Login berhasil!");
    navigate("/home");
  };

  const handleRegister = () => {
    navigate("/register");
  };

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
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-16">
        <motion.div
          className="w-full max-w-md"
          initial="hidden"
          animate={isPageReady ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1
            className="text-darkGreen text-3xl font-bold mb-12 text-center"
            variants={itemVariants}
          >
            Login ke AnakKost
          </motion.h1>
          <motion.form
            className="w-full max-w-md"
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } text-gray-700 rounded-md`}
                placeholder="Masukkan email"
                aria-label="Masukkan email Anda"
                aria-invalid={!!errors.email}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } text-gray-700 rounded-md`}
                placeholder="Masukkan password"
                aria-label="Masukkan password Anda"
                aria-invalid={!!errors.password}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-11 text-gray-500"
              >
                {passwordVisible ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <motion.div className="mt-4 text-right" variants={itemVariants}>
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-darkGreen text-sm hover:text-hoverGreen hover:underline"
              >
                Lupa Password?
              </button>
            </motion.div>
            <motion.div
              className="my-4 flex items-center"
              variants={itemVariants}
            >
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">atau</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </motion.div>

            <motion.button
              type="button"
              className={`w-full flex items-center justify-center p-3 mb-4 border border-gray-300 rounded-md hover:bg-gray-100 ${
                isGoogleLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              variants={itemVariants}
            >
              {isGoogleLoading ? (
                <FaSpinner className="animate-spin h-5 w-5 text-gray-500" />
              ) : (
                <>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                    alt="Google Logo"
                    loading="lazy"
                    className="w-4 h-4 mr-2"
                  />
                  Login menggunakan Google
                </>
              )}
            </motion.button>
            <motion.button
              type="submit"
              className="w-full bg-darkGreen text-white p-3 rounded-md hover:bg-hoverGreen"
              variants={itemVariants}
            >
              Login
            </motion.button>
          </motion.form>
          <motion.div
            className="text-sm font-medium text-gray-700 text-center mt-4"
            variants={itemVariants}
          >
            Belum punya akun AnakKost?{" "}
            <button
              onClick={handleRegister}
              className="bg-white text-darkGreen font-bold hover:text-hoverGreen hover:underline"
            >
              Daftar Sekarang
            </button>
          </motion.div>
        </motion.div>
      </div>
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
