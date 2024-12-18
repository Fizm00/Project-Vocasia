import React from "react";

const DetailImage = ({ images, openModal }) => {
  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }

  const URI_DOMAIN = "https://api-anakkost.vocasia-fsjs-c.fun/api/v1";
  console.log("cekgambar: " + images[0]);
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center">
      {/* Gambar Utama */}
      <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <img
          src={images[0]}
          alt="Main"
          className="w-full h-80 object-cover rounded-lg cursor-pointer"
          onClick={() => openModal(images[0])}
        />
      </div>

      {/* Gambar Kecil */}
      <div className="w-full sm:w-1/3 flex flex-col space-y-3 sm:space-y-3">
        {/* Baris pertama: Gambar 1 dan Gambar 2 */}
        <div className="grid grid-cols-2 gap-3">
          <img
            src={images[1]}
            alt="Image 1"
            className="w-full h-40 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(images[1])}
          />
          <img
            src={images[2]}
            alt="Image 2"
            className="w-full h-40 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(images[2])}
          />
        </div>

        {/* Baris kedua: Gambar 3 dan Gambar 4 */}
        <div className="grid grid-cols-2 gap-3">
          <img
            src={images[3]}
            alt="Image 3"
            className="w-full h-40 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(images[3])}
          />
          <img
            src={images[4]}
            alt="Image 4"
            className="w-full h-40 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(images[4])}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailImage;
