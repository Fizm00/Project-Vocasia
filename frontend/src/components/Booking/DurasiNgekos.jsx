import React from "react";

const DurasiNgekos = ({ durasi, setDurasi }) => {
  const handleTambahDurasi = () => {
    // if (durasi < 12) {
    //   setDurasi(durasi + 1);
    //   setTotalBiaya((durasi + 1) * biayaPerBulan);
    // }
    if (durasi < 12) setDurasi(durasi + 1);
  };

  const handleKurangDurasi = () => {
    // if (durasi > 1) {
    //   setDurasi(durasi - 1);
    //   setTotalBiaya((durasi - 1) * biayaPerBulan);
    // }
    if (durasi > 1) setDurasi(durasi - 1);
  };

  return (
    <section className="mt-4 space-y-4 lg:ml-[2.5rem]">
      <h2 className="text-lg font-bold text-gray-800">Durasi Ngekos</h2>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleKurangDurasi}
          className="w-10 h-10 border border-gray-400 rounded-lg flex justify-center items-center text-gray-600 text-lg font-bold transition-transform transform hover:scale-110"
          aria-label="Kurangi durasi"
        >
          -
        </button>
        <span className="text-sm font-medium text-gray-800 px-4 py-2 border border-gray-400 rounded-lg">
          {durasi} Bulan
        </span>
        <button
          onClick={handleTambahDurasi}
          className="w-10 h-10 border border-gray-400 rounded-lg flex justify-center items-center text-gray-600 text-lg font-bold transition-transform transform hover:scale-110"
          aria-label="Tambah durasi"
        >
          +
        </button>
        <span className="text-sm text-gray-500">
          Durasi dapat disesuaikan kembali di lain waktu
        </span>
      </div>
    </section>
  );
};

export default DurasiNgekos;
