import React from "react";

const PopupFilter = ({ filters, setFilters, closeFilterModal }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name.includes("price") ? Number(value) || 0 : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full sm:w-1/3 md:w-1/4 p-6 rounded-lg shadow-lg max-w-lg">
        <h2 className="font-bold text-xl mb-4">Filter Pencarian</h2>

        {/* Filter Nama Kost */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Nama Kost</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
            placeholder="Nama Kost"
          />
        </div>

        {/* Filter Tipe Kost */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Tipe Kost</label>
          <select
            name="property_type"
            value={filters.property_type}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Tipe Kost</option>
            <option value="Campur">Campur</option>
            <option value="Putra">Putra</option>
            <option value="Putri">Putri</option>
          </select>
        </div>

        {/* Filter Lokasi */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Lokasi</label>
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
            placeholder="Lokasi (Contoh: Jakarta)"
          />
        </div>

        {/* Filter Harga */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Rentang Harga</label>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1">Harga Min</label>
              <input
                type="number"
                name="price_min"
                value={filters.price_min}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
                placeholder="Minimal"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1">Harga Max</label>
              <input
                type="number"
                name="price_max"
                value={filters.price_max}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
                placeholder="Maksimal"
              />
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={closeFilterModal}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={closeFilterModal}
            className="bg-greenButton text-white font-semibold px-4 py-2 rounded-md hover:bg-hoverGreen"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupFilter;
