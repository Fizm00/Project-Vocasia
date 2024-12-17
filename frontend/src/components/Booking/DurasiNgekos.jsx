import React from "react";
import { format, addMonths } from "date-fns";
import idLocale from "date-fns/locale/id";

const DurasiNgekos = ({ durasi, tanggalAkhir, setTanggalAkhir }) => {
  const formatTanggal = (tanggal) => {
    if (!tanggal) return "";
    const dateObj = new Date(tanggal);
    return format(dateObj, "EEEE, d MMMM yyyy", { locale: idLocale });
  };

  // Jika durasi 0 atau tidak ada, end_date = start_date
  const formattedEndDate = tanggalAkhir
    ? format(addMonths(new Date(tanggalAkhir), durasi), "EEEE, d MMMM yyyy", {
        locale: idLocale,
      })
    : null;

  return (
    <section className="mt-4 space-y-4 lg:ml-[2.5rem]">
      <h2 className="text-lg font-bold text-gray-800">Durasi Ngekos</h2>
      <input
        type="date"
        value={tanggalAkhir}
        onChange={(e) => setTanggalAkhir(e.target.value)}
        className="border border-gray-400 rounded-lg px-4 py-2 text-sm hover:border-[#193F3D] focus:border-[#193F3D] focus:ring-[#193F3D] outline-none bg-white"
        placeholder="Masukkan durasi dalam bulan"
        aria-label="Pilih durasi ngekos"
      />
      <p className="text-sm font-medium text-gray-500 mt-2">
        {tanggalAkhir ? `Tanggal Dipilih: ${formatTanggal(tanggalAkhir)}` : ""}
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

export default DurasiNgekos;
