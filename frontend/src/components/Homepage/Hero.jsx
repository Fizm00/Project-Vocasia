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
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      <div className="relative z-20 text-center text-white flex flex-col items-center justify-center min-h-screen transition-all duration-500 hover:scale-105">
        <h1
          className="text-3xl md:text-6xl font-bold mb-6"
          data-aos="fade-up"
        >
          Temukan Kost Impianmu <br /> dengan Mudah dan Cepat!
        </h1>

        <p
          className="text-xl font-semibold mb-10 transition-all duration-500 hover:scale-105"
          data-aos="fade-up"
          data-aos-delay="100"
        >
         Tinggal di kost impian kini lebih mudah dengan AnakKost! Temukan lokasi favoritmu tanpa repot.
        </p>

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