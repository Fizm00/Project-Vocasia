import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Banner from "../components/Banner";
import Promo from "../components/Promo";
import Reasons from "../components/Reasons";
import Reviewer from "../components/Reviewer";
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