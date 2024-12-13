import React, { useState } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Validasi jenis file
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      setErrorMessage("Hanya file gambar yang diperbolehkan.");
      return;
    }

    // Validasi jumlah file
    const uploadedImages = validFiles.map((file) => URL.createObjectURL(file));
    if (images.length + uploadedImages.length > 5) {
      setErrorMessage("Maksimal 5 foto dapat diunggah.");
      return;
    }

    setErrorMessage(""); // Reset pesan kesalahan
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      URL.revokeObjectURL(prevImages[index]); // Revoke URL untuk membersihkan memori
      return newImages;
    });
  };

  return (
    <div className="mb-6 border p-10 rounded-lg">
      <h2 className="text-lg font-bold text-center mb-4">Upload Foto Tempat</h2>
      <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
        <p className="text-sm text-gray-500 mb-4">
          Unggah foto properti Anda untuk menarik calon penyewa (maksimal 5 foto).
        </p>
        {errorMessage && (
          <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
        )}
        <label htmlFor="file-upload" className="bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-pointer mb-4">
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {images.map((image, index) => (
            <div key={index} className="relative border rounded-lg overflow-hidden">
              <img src={image} alt={`Foto ${index + 1}`} className="w-full h-32 object-cover" />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;