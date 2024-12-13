import React from "react";
import { useNavigate } from "react-router-dom";


const CatatanTambahan = ({ catatan, setCatatan }) => {
  const navigate = useNavigate();

  const handleAjukanSewa = () => {
    navigate("/Riwayat-sewa");
  }

  return (
    <section className="mt-4 mb-16 lg:ml-[2.5rem] space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Catatan Tambahan</h2>
      <p className="text-sm text-gray-500">Jelaskan tentang pengajuan sewa kamu</p>
      <textarea
        placeholder="Misal: Saya ingin ngekos bersama pacar"
        value={catatan}
        onChange={(e) => setCatatan(e.target.value)}
        className="w-full lg:w-[70%] h-52 border border-gray-400 rounded-lg px-4 py-2 text-sm focus:border-[#193F3D] focus:ring-[#193F3D] outline-none bg-gray-100 mt-2"
        aria-label="Isi catatan tambahan"
      />
      <div className="mt-4">
        <button 
          onClick={handleAjukanSewa}
          className="bg-darkGreen text-white rounded-lg px-6 py-2 hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Ajukan Sewa
        </button>
      </div>
    </section>
  );
};

export default CatatanTambahan;
