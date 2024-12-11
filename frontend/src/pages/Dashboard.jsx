import React from "react";
import { ChevronRight } from 'react-feather';
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold">Halo, Username!</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
          {/* Pending Items */}
          <div className="p-6 mb-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">Ada yang Menunggu</h2>
            <div className="space-y-4">
              <Link to="#" className="flex items-center justify-between p-4 border rounded-lg border-darkGreen hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-darkGreen">
                    7
                  </div>
                  <div>
                    <h3 className="font-medium">Booking Menunggu</h3>
                    <p className="text-sm text-gray-500">Balas pengajuan sewa pencari kos</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </Link>

              <Link to="/review" className="flex items-center justify-between p-4 border rounded-lg border-darkGreen hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-darkGreen">
                    5
                  </div>
                  <div>
                    <h3 className="font-medium">Ulasan Baru</h3>
                    <p className="text-sm text-gray-500">Ulasan penyewa menunggu dibalas</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          {/* Income */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">Pendapatan</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">Pendapatan total</p>
                <div className="text-2xl font-bold">Rp 150.254.000</div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pendapatan Bulanan</p>
                <div className="text-2xl font-bold">Rp 15.352.000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}