import React from 'react';

const MapSection = ({ kostDetail }) => {
  return (
    <div className="mt-6 sm:ml-0 lg:ml-20">
      <p className="text-2xl font-bold mb-6">Lokasi</p>

      {/* Menampilkan peta hanya jika linkMaps tersedia */}
      {kostDetail.linkMaps ? (
        <div className="mt-4 flex justify-left">
          <iframe
            title="Google Maps"
            width="100%"
            height="400"
            src={kostDetail.linkMaps}
            frameBorder="0"
            style={{ border: '0', borderRadius: '10px' }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      ) : (
        <p className="text-red-500 mt-4">Peta tidak tersedia.</p>
      )}

      {/* Tombol untuk membuka di Google Maps */}
      {kostDetail.linkMaps && (
        <div className="mt-10">
          <a
            href={kostDetail.linkMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-darkGreen text-white text-sm px-8 py-3 font-semibold rounded-full hover:bg-white hover:text-darkGreen border border-darkGreen transition duration-300 ease-in-out"
          >
            Lihat di Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default MapSection;
