import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function LayoutWithoutSideBar({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
      <Footer />
    </div>
  );
}