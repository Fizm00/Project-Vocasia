import React, { useState } from "react";
import { forgotPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { FaArrowLeft } from "react-icons/fa";
import { set } from "date-fns";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email tidak valid. Masukkan email yang benar.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      const response = await forgotPassword(email);
      console.log("forgotPassword -> handleSubmit -> response:" + response);
    } catch (error) {
      setError(error.message || "Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000); // Simulasi waktu pengiriman
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative flex h-screen justify-center items-center bg-gray-100">
      <button
        onClick={() => navigate("/login")}
        className="absolute top-5 left-5 flex items-center gap-2 p-3 hover:scale-105 transition-transform"
      >
        <FaArrowLeft className="text-darkGreen text-xl" />
        <span className="text-darkGreen text-sm font-medium">
          Kembali ke Login
        </span>
      </button>

      <motion.div
        className="bg-white rounded-lg shadow-md w-full max-w-lg min-h-[370px] p-12 flex flex-col justify-center items-center gap-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {!isSubmitted ? (
          <>
            <div className="w-full max-w-sm">
              <h2 className="text-xl font-bold text-gray-700 mb-6">
                Reset Password
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-600 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 border ${
                      error ? "border-red-500" : "border-gray-300"
                    } rounded-lg text-sm`}
                    placeholder="Masukkan email Anda"
                    required
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className={`w-full bg-darkGreen text-white p-3 rounded-lg hover:bg-hoverGreen ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Link Reset"}
                </button>
              </form>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
          >
            <h2 className="text-xl font-bold text-gray-700 mb-6 text-center">
              Link Reset Terkirim!
            </h2>
            <p className="text-gray-600 text-sm text-center mb-6">
              Periksa email Anda untuk melanjutkan proses reset password.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
