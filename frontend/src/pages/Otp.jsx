import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OtpInput = ({ otp, onChange, onKeyDown }) => {
  return (
    <div className="grid grid-cols-6 gap-4 mb-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          value={digit}
          onChange={(e) => onChange(e, index)}
          onKeyDown={onKeyDown}
          maxLength={1}
          className="w-full sm:w-14 lg:w-16 h-14 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

const OtpVerification = ({ isVerified, errorMessage, onVerify, isError }) => {
  return (
    <button
      onClick={onVerify}
      className={`w-full text-white py-3 rounded-md focus:outline-none focus:ring-2 ${
        isVerified
          ? "bg-green-700 hover:bg-green-800 focus:ring-green-700"
          : isError
          ? "bg-red-700 hover:bg-red-800 focus:ring-red-700"
          : "bg-darkGreen hover:bg-green-900 focus:ring-green-900"
      }`}
    >
      Verifikasi
    </button>
  );
};

const SuccessMessage = ({ animationClass }) => {
  return (
    <div className={`text-center ${animationClass}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-20 w-20 mt-14 mb-14 text-green-900"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.704 5.296a1 1 0 010 1.408L8.412 14.5 3.29 9.378a1 1 0 111.418-1.416L8.5 11.292l7.786-7.788a1 1 0 011.418 0z"
          clipRule="evenodd"
        />
      </svg>
      <h3 className="text-xl mt-4 font-bold mb-6 text-gray-800">Verifikasi akun AnakKost berhasil!</h3>
    </div>
  );
};

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [animationClass, setAnimationClass] = useState("");
  const navigate = useNavigate();

  const storedToken = "123456";

  const handleOTPChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value !== "" && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleVerifyOTP = () => {
    const otpString = otp.join("");
    if (otpString === storedToken) {
      setIsVerified(true);
      setErrorMessage("");
      setAnimationClass("fade-out");
      setTimeout(() => navigate("/login"), 1000);
    } else {
      setIsVerified(false);
      setErrorMessage("OTP tidak valid, silahkan coba lagi!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleVerifyOTP();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <div
          className={`max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md my-8 ${
            isVerified
              ? "border-2 border-green-700"
              : errorMessage
              ? "border-2 border-red-700"
              : "border border-gray-300"
          }`}
        >
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Verifikasi Akun Anda</h2>
          {!isVerified ? (
            <div>
              <p className="text-gray-600 text-center mb-4">Masukkan kode OTP yang telah dikirimkan ke email Anda:</p>
              <OtpInput otp={otp} onChange={handleOTPChange} onKeyDown={handleKeyDown} />
              <OtpVerification
                isVerified={isVerified}
                errorMessage={errorMessage}
                onVerify={handleVerifyOTP}
                isError={!!errorMessage}
              />
              {errorMessage && <p className="text-red-600 font-semibold text-center mt-4">{errorMessage}</p>}
            </div>
          ) : (
            <SuccessMessage animationClass={animationClass} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Otp;