import React from "react";

const RincianPembayaran = ({ totalBiaya }) => {
  const biayaLayanan = 15000;
  const totalPembayaran = totalBiaya + biayaLayanan;

  return (
    <aside
      className="bg-white border border-gray-200 rounded-xl shadow-md p-4 w-full max-w-full lg:max-w-sm lg:ml-[-8rem] space-y-6 transition-transform transform hover:scale-105"
      style={{
        minHeight: "300px",
        height: "fit-content",
        marginBottom: "2rem",
      }}
    >
      {/* Bagian Informasi Kost */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 overflow-hidden">
        <img
          src="../public/kamarimage.jpg"
          alt="Kost Singgahsini"
          className="w-20 h-20 rounded-md object-cover"
        />
        <div className="space-y-1 text-center sm:text-left flex-1 max-w-full">
          <span className="text-xs font-bold bg-gray-100 text-gray-800 px-2 py-1 rounded-md block truncate">
            Kos Campur
          </span>
          <h4 className="text-sm font-semibold mt-2 truncate">
            Kost Singgahsini Pramesthi UPN
          </h4>
          <p className="text-xs text-gray-500 truncate">
            Depok, D.I. Yogyakarta
          </p>
        </div>
      </div>

      {/* Garis Pembatas */}
      <hr className="border-gray-300" />

      {/* Bagian Rincian Pembayaran */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold">Rincian Pembayaran</h4>
        <p className="text-xs text-gray-600 text-center sm:text-left">
          Dibayar setelah pemilik kos menyetujui pengajuan sewa
        </p>
        <div className="flex justify-between text-sm">
          <span>Biaya Sewa Kos</span>
          <span className="font-medium">Rp {totalBiaya.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Biaya Layanan</span>
          <span className="font-medium">
            Rp {biayaLayanan.toLocaleString()}
          </span>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between text-base font-bold">
          <span>Total Pembayaran</span>
          <span>Rp {totalPembayaran.toLocaleString()}</span>
        </div>
      </div>
    </aside>
  );
};

export default RincianPembayaran;
