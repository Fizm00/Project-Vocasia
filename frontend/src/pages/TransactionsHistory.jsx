import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TransactionsList from "../components/TransactionsHistory/TransactionsList";

const TransactionsHistory = () => {
  const transactions = [
    {
      id: 1,
      name: "Kost Singgahsini Pramesthi UPN Tipe C Yogyakarta",
      checkIn: "12 Mar 2021",
      duration: "1 Bulan",
      price: "Rp 1.500.000",
      image: "/1-kostImage.png",
    },
    {
      id: 2,
      name: "Kost Singgahsini Pramesthi UPN Tipe C Yogyakarta",
      checkIn: "12 Mar 2021",
      duration: "1 Bulan",
      price: "Rp 1.500.000",
      image: "/2-kostImage.png",
    },
    {
      id: 3,
      name: "Kost Singgahsini Pramesthi UPN Tipe C Yogyakarta",
      checkIn: "12 Mar 2021",
      duration: "1 Bulan",
      price: "Rp 1.500.000",
      image: "/3-kostImage.png",
    },
    {
      id: 4,
      name: "Kost Singgahsini Pramesthi UPN Tipe C Yogyakarta",
      checkIn: "12 Mar 2021",
      duration: "1 Bulan",
      price: "Rp 1.500.000",
      image: "/4-kostImage.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow px-8 lg:px-28 py-12">
        <TransactionsList transactions={transactions} />
      </main>
      <Footer />
    </div>
  );
};

export default TransactionsHistory;
