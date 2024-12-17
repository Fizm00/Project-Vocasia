import React from "react";

const RincianPembayaran = ({ totalBiaya, property, durasi }) => {
  // const totalPembayaran = totalBiaya;
  const URI_DOMAIN = "http://localhost:3000";
  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(harga);
  };
  return (
    <aside
      className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full md:w-auto space-y-4"
      style={{
        height: "fit-content",
        marginBottom: "1rem",
        marginLeft: "rem",
      }}
    >
      {/* Bagian Informasi Kost */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-3">
        <img
          src={URI_DOMAIN + property?.data.images[0] || "Data tidak tersedia"}
          alt={property?.data.images[0] || "Data tidak tersedia"}
          className="w-20 h-20 rounded-md object-cover"
        />
        <div
          className="space-y-2 text-center md:text-left flex-1"
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          <span className="text-xs font-bold bg-gray-100 text-gray-800 px-1 py-0.5 rounded-md inline-block">
            {property?.data.property_type || "Data tidak tersedia"}{" "}
            {property?.data.gender_type || "Data tidak tersedia"}
          </span>
          <h4 className="text-sm font-semibold mt-1">
            {property?.data.name || "Data tidak tersedia"}
          </h4>
          <p className="text-xs text-gray-500">
            {property?.data.city || "Data tidak tersedia"},{" "}
            {property?.data.address || "Data tidak tersedia"}
          </p>
        </div>
      </div>

      {/* Garis Pembatas */}
      <hr className="border-gray-300" />

      {/* Bagian Rincian Pembayaran */}
      <div className="space-y-5">
        <h4 className="text-sm font-bold">Rincian Pembayaran</h4>
        <p className="text-xs text-gray-600 text-center md:text-left">
          Dibayar setelah pemilik kos menyetujui pengajuan sewa
        </p>
        <div className="flex justify-between items-center text-xs">
          <span>Harga Sewa 1 Bulan</span>
          <span className="font-medium">
            {formatHarga(property?.data.price) || "Data tidak tersedia"}
            {/* {formatHarga(kost.price)} */}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span>Durasi</span>
          <span>{durasi} Bulan</span>
        </div>
        {/* Biaya layanan dihapus */}
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center text-sm font-bold">
          <span>Total Pembayaran</span>
          <span>{formatHarga(totalBiaya)}</span>
        </div>
      </div>
    </aside>
  );
};

export default RincianPembayaran;
