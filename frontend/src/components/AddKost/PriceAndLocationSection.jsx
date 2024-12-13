import React from 'react';

const PriceAndLocationSection = ({ price, location, onPriceChange, onLocationChange }) => (
  <div className="mb-6 border p-10 rounded-lg">
    <h2 className="text-lg font-bold mb-4">Masukkan Detail Harga dan Lokasi</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col">
        <label htmlFor="harga" className="mb-2 font-medium text-gray-700">Harga (Rp)</label>
        <input
          type="text"
          id="harga"
          placeholder="500000"
          className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-darkGreen"
          value={price} 
          onChange={onPriceChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="link-maps" className="mb-2 font-medium text-gray-700">Link Google Maps</label>
        <input
          type="text"
          id="link-maps"
          placeholder="https://www.google.com/maps/embed"
          className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-darkGreen"
          value={location} 
          onChange={onLocationChange}
        />
      </div>
    </div>
  </div>
);

export default PriceAndLocationSection;
