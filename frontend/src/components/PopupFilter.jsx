import React from 'react';

const PopupFilter = ({ filters, setFilters, closeFilterModal }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 p-6 rounded-lg shadow-lg max-w-lg sm:max-w-full">
        <h2 className="font-bold text-xl mb-4">Filter Pencarian</h2>

        {/* Filter Nama Kost */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Nama Kost</label>
          <input
            type="text"
            name="namaKost"
            value={filters.namaKost}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
            placeholder="Nama Kost"
          />
        </div>

        {/* Filter Tipe Kost */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Tipe Kost</label>
          <select
            name="tipeKost"
            value={filters.tipeKost}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Tipe Kost</option>
            <option value="Campur">Campur</option>
            <option value="Putra">Putra</option>
            <option value="Putri">Putri</option>
          </select>
        </div>

        {/* Filter Durasi */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Durasi</label>
          <select
            name="durasi"
            value={filters.durasi}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Durasi</option>
            <option value="Bulan">Bulan</option>
            <option value="Hari">Hari</option>
          </select>
        </div>

        {/* Filter Lokasi */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Lokasi</label>
          <input
            type="text"
            name="lokasi"
            value={filters.lokasi}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
            placeholder="Lokasi"
          />
        </div>

        {/* Filter Harga */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2"> Rentang Harga</label>
          <div className="flex space-x-4">
            {/* Input Harga Min */}
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1">Harga Minimal</label>
              <input
                type="number"
                name="hargaMin"
                value={filters.hargaMin}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
                placeholder="Harga Minimal"
              />
            </div>
            {/* Input Harga Max */}
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1">Harga Maksimal</label>
              <input
                type="number"
                name="hargaMax"
                value={filters.hargaMax}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
                placeholder="Harga Maksimal"
              />
            </div>
          </div>
        </div>

        {/* Tombol Tutup */}
        <div className="flex justify-end mt-4">
          <button
            onClick={closeFilterModal}
            className="bg-greenButton text-white font-semibold px-4 py-2 rounded-md hover:bg-hoverGreen"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupFilter;
