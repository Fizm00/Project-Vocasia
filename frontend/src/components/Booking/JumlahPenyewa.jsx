import React from "react";

const JumlahPenyewa = ({ jumlahPenyewa, setJumlahPenyewa }) => {
  const handleTambah = () =>
    jumlahPenyewa < 4 && setJumlahPenyewa(jumlahPenyewa + 1);
  const handleKurang = () =>
    jumlahPenyewa > 1 && setJumlahPenyewa(jumlahPenyewa - 1);

  return (
    <section className="mt-4 space-y-4 lg:ml-[2.5rem]">
      <h2 className="text-lg font-bold text-gray-800">Jumlah Penyewa</h2>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleKurang}
          className="w-10 h-10 border border-gray-400 rounded-lg flex justify-center items-center text-gray-600 text-lg font-bold transition-transform transform hover:scale-110"
          aria-label="Kurangi jumlah penyewa"
        >
          -
        </button>
        <span className="text-sm font-medium text-gray-800 px-4 py-2 border border-gray-400 rounded-lg">
          {jumlahPenyewa} Orang
        </span>
        <button
          onClick={handleTambah}
          className="w-10 h-10 border border-gray-400 rounded-lg flex justify-center items-center text-gray-600 text-lg font-bold transition-transform transform hover:scale-110"
          aria-label="Tambah jumlah penyewa"
        >
          +
        </button>
        <span className="text-sm text-gray-500">Maksimal 4 orang</span>
      </div>
      <div className="flex items-center text-sm text-gray-500 space-x-2 mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <span>Pemilik Kos melarang membawa Hewan peliharaan</span>
      </div>
    </section>
  );
};

export default JumlahPenyewa;
