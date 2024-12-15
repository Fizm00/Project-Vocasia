import React from "react";

const DetailImage = ({ images, openModal }) => {
  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }

  const URI_DOMAIN = "http://localhost:3000";
  console.log("cekgambar: " + URI_DOMAIN + images[0]);
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center">
      {/* Gambar Utama */}
      <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <img
          src={URI_DOMAIN + images[0]}
          alt="Main"
          className="w-full h-80 object-cover rounded-lg cursor-pointer"
          onClick={() => openModal(URI_DOMAIN + images[0])}
        />
      </div>

      {/* Gambar Kecil */}
      <div className="w-full sm:w-1/3 flex flex-col space-y-3 sm:space-y-3">
        {/* Baris pertama: Gambar 1 dan Gambar 2 */}
        <div className="grid grid-cols-2 gap-3">
          <img
            src={URI_DOMAIN + images[1]}
            alt="Image 1"
            className="w-full h-40 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(URI_DOMAIN + images[1])}
          />
          <img
            src={URI_DOMAIN + images[2]}
            alt="Image 2"
            className="w-full h-40 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(URI_DOMAIN + images[2])}
          />
        </div>

        {/* Baris kedua: Gambar 3 dan Gambar 4 */}
        <div className="grid grid-cols-2 gap-3">
          <img
            src={URI_DOMAIN + images[3]}
            alt="Image 3"
            className="w-full h-40 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(URI_DOMAIN + images[3])}
          />
          <img
            src={URI_DOMAIN + images[4]}
            alt="Image 4"
            className="w-full h-40 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(URI_DOMAIN + images[4])}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailImage;
