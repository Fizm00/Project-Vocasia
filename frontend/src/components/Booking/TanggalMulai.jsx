import React from "react";
import { format, addMonths } from "date-fns";
import idLocale from "date-fns/locale/id";

const TanggalMulai = ({ tanggalMulai, setTanggalMulai, durasi }) => {
  const formatTanggal = (tanggal) => {
    if (!tanggal) return "";
    const dateObj = new Date(tanggal);
    return format(dateObj, "EEEE, d MMMM yyyy", { locale: idLocale });
  };

  // Hitung tanggal akhir hanya jika tanggalMulai tersedia
  const formattedEndDate = tanggalMulai
    ? format(addMonths(new Date(tanggalMulai), durasi), "EEEE, d MMMM yyyy", {
        locale: idLocale,
      })
    : null;

  return (
    <section className="mt-4 space-y-4 lg:ml-[2.5rem]">
      <h2 className="text-lg font-bold text-gray-800">Tanggal Mulai Ngekos</h2>
      <input
        type="date"
        value={tanggalMulai}
        onChange={(e) => setTanggalMulai(e.target.value)}
        className="border border-gray-400 rounded-lg px-4 py-2 text-sm hover:border-[#193F3D] focus:border-[#193F3D] focus:ring-[#193F3D] outline-none bg-white"
        aria-label="Pilih tanggal mulai ngekos"
      />
      <p className="text-sm font-medium text-gray-500 mt-2">
        {tanggalMulai ? `Tanggal Dipilih: ${formatTanggal(tanggalMulai)}` : ""}
      </p>
      {formattedEndDate && (
        <p className="text-sm text-gray-600 mt-4">
          Periode ngekos akan berakhir pada:{" "}
          <span className="font-semibold text-gray-800">
            {formattedEndDate}
          </span>
        </p>
      )}
    </section>
  );
};

export default TanggalMulai;
