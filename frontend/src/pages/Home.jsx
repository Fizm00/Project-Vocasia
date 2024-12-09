import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Homepage/Hero";
import Card from "../components/Homepage/Card";
import Banner from "../components/Banner";
import Promo from "../components/Homepage/Promo";
import Reasons from "../components/Homepage/Reasons";
import Reviewer from "../components/Homepage/Reviewer";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div className="min-h-screen overflow-auto">
      <Navbar />
      <Hero />
      <Card />
      <Banner />
      <Promo />
      <Reasons />
      <Reviewer />
      <Footer />
    </div>
  );
};

export default Home;