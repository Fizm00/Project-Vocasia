import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SearchBar from "./SearchBar";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/homeImage.png')", backgroundSize: "cover" }}
    >
      {/* Overlay Background */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Konten Hero */}
      <div className="relative z-20 text-center text-white flex flex-col items-center justify-center min-h-screen">
        <h1
          className="text-3xl md:text-5xl font-bold mb-8"
          data-aos="fade-up"
        >
          Temukan Kost Impianmu <br /> dengan Mudah dan Cepat!
        </h1>

        <div
          className="w-full max-w-5xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;
