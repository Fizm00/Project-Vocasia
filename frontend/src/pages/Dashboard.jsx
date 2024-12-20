import React from "react";
import { ChevronRight } from 'react-feather';
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { FaHome } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { MdAddHome } from "react-icons/md";

const Dashboard = () => {
  const userName = localStorage.getItem('name');
  const cleanedUserName = userName ? userName.replace(/"/g, '') : null;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mb-20">
        <h1 className="mb-8 text-3xl font-bold">Selamat Datang, {cleanedUserName}!</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
          {/* Pending Items */}
          <div className="p-6 mb-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">Kelola semua kost kamu dengan mudah dan efisien.</h2>
            <div className="space-y-4">
              <Link to="/properties" className="flex items-center justify-between p-4 border rounded-lg border-darkGreen hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-darkGreen">
                  <FaHome />
                  </div>
                  <div>
                    <h3 className="font-medium">Lihat Kost Kamu</h3>
                    <p className="text-sm text-gray-500">Periksa daftar kost yang kamu kelola, pantau detailnya, dan pastikan semuanya berjalan lancar.</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </Link>

              <Link to="/reviews" className="flex items-center justify-between p-4 border rounded-lg border-darkGreen hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-darkGreen">
                  <MdRateReview />
                  </div>
                  <div>
                    <h3 className="font-medium">Ulasan untuk Kost Kamu</h3>
                    <p className="text-sm text-gray-500">Lihat apa yang penyewa katakan tentang kost kamu! Kumpulkan feedback dan tingkatkan kualitas pelayananmu.</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </Link>

              <Link to="/add-kost" className="flex items-center justify-between p-4 border rounded-lg border-darkGreen hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-darkGreen">
                  <MdAddHome />
                  </div>
                  <div>
                    <h3 className="font-medium">Tambahkan Kost Baru</h3>
                    <p className="text-sm text-gray-500">Punya kost baru? Daftarkan sekarang dan mulai jangkau lebih banyak penyewa!</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          {/* Income */}
          {/* <div className="p-6 bg-white rounded-lg shadow">
            {/* <h2 className="mb-4 text-xl font-semibold">Pendapatan</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">Pendapatan total</p>
                <div className="text-2xl font-bold">Rp 150.254.000</div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pendapatan Bulanan</p>
                <div className="text-2xl font-bold">Rp 15.352.000</div>
              </div>
            </div> */}
          {/* </div> */} 
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;