import React from "react";
import Sidebar from "./Dashboard/Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:ml-64 md:p-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
}