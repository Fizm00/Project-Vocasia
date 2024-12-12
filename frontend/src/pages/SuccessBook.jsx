import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdLocationOn } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";

const SuccessBook = () => {
  const [kost, setKost] = useState(null);
  const [payment, setPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const dummyKost = {
          id: 1,
          name: "Kost Trinanda",
          startDate: "12 Mar 2023",
          endDate: "12 Apr 2023",
          duration: "1 Bulan",
          price: 1500000,
          image: "/1-kostImage.png",
          status: "Disetujui",
          location: "Jakarta Selatan, Jalan Jagakarsa No. 1",
          type: "Putri",
        };
        const dummyPayment = {
          booking_id: "1",
          transaction_id: "INV/202231268",
          order_id: "ORD12345",
          payment_method: "DANA",
          payment_status: "Disetujui",
          amount: 1500000,
          transaction_date: "20 November 2022, 15:10 WIB",
        };

        setKost(dummyKost);
        setPayment(dummyPayment);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  if (!kost || !payment || kost.status !== "Disetujui" || payment.payment_status !== "Disetujui") {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 mb-9">
        <Navbar />
        <main className="container mx-auto flex-grow px-4 lg:px-8 py-4 bg-white rounded-lg shadow-lg mt-4">
          <h2 className="text-lg font-semibold text-red-600 mb-6 flex items-center">
            Pengajuan Sewa Gagal! <span className="ml-2 text-red-700 text-xl">✖</span>
          </h2>
          <div className="flex justify-center">
            <p className="text-gray-800 text-lg">Status pembayaran atau status booking belum disetujui.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const durationInMonths = parseInt(kost.duration.split(" ")[0]);
  const totalPayment = kost.price * durationInMonths;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 lg:px-8 py-4 mt-0">
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2 flex flex-col justify-start">
              <h2 className="text-2xl font-extrabold text-gray-800 flex items-center">
                Pengajuan Sewa Berhasil!{" "}
                <BsCheckCircle className="ml-2 text-green-700 text-2xl" />
              </h2>
              <div className="space-y-6 mt-2">
                <h3 className="text-md font-bold text-gray-800 mt-4">Detail Pengajuan</h3>
                <div className="space-y-6 text-gray-900 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">No. Invoice</span>
                    <span className="text-gray-800">{payment.transaction_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Tanggal Transaksi</span>
                    <span className="text-gray-800">{payment.transaction_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Jenis Pembayaran</span>
                    <span className="text-gray-800">{payment.payment_method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Dibayar pada</span>
                    <span className="text-gray-800">{payment.transaction_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status Transaksi</span>
                    <span className="text-gray-800">{payment.payment_status}</span>
                  </div>
                  <div className="flex justify-start mt-8">
                    <Link
                      to="/"
                      className="bg-[#193F3D] text-white px-7 py-2 rounded-md hover:bg-green-900 text-sm shadow-md transition-all"
                    >
                      Beranda
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 p-4 mx-auto w-full max-w-lg sm:max-w-xl md:max-w-2xl hover:scale-105 hover:translate-y-2">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={kost.image}
                  alt={kost.name}
                  className="rounded-md w-16 h-16 object-cover"
                />
                <div className="flex flex-col justify-center">
                  <button className="px-3 py-0 text-xs font-normal rounded-full bg-[#DADCC0] text-[#193F3D] w-fit mt-1">
                    {kost.type}
                  </button>
                  <p className="text-gray-800 font-bold text-sm mt-2 mb-1">{kost.name}</p>
                  <div className="flex items-center text-xs text-gray-600 space-x-2">
                    <MdLocationOn className="text-gray-600 text-sm" />
                    <span className="text-xs">{kost.location}</span>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="space-y-4 text-gray-900">
                <p className="text-gray-800 font-semibold text-xs">Informasi Sewa</p>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Tanggal Masuk</span>
                  <span>{kost.startDate}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Tanggal Keluar</span>
                  <span>{kost.endDate}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Durasi Sewa</span>
                  <span>{kost.duration}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Biaya Sewa Kos</span>
                  <span>Rp {kost.price.toLocaleString()}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-semibold text-xs">
                  <span>Total Pembayaran</span>
                  <span>Rp {totalPayment.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessBook;