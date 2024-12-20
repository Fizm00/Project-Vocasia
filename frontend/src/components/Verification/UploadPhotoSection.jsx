import React, { useState } from 'react';
import { Upload } from 'react-feather';

const UploadPhotoSection = ({ onUpload }) => {
  const [identityCardPhoto, setIdentityCardPhoto] = useState(null);
  const [selfPhoto, setSelfPhoto] = useState(null);

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("File size should not exceed 2MB.");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      
      if (type === "identityCard") {
        setIdentityCardPhoto(imageUrl); // Update preview untuk kartu identitas
      } else if (type === "selfPhoto") {
        setSelfPhoto(imageUrl); // Update preview untuk foto diri
      }

      onUpload(file); // Kirim file ke backend
    }
  };

  const triggerFileInput = (inputId) => {
    const fileInput = document.getElementById(inputId);
    if (fileInput) fileInput.click();
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Upload Kartu Identitas */}
      <div className="p-4 text-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "identityCard")}
          style={{ display: 'none' }}
          id="upload-identity-card"
        />
        <div onClick={() => triggerFileInput("upload-identity-card")}>
          <img
            src={identityCardPhoto || "https://via.placeholder.com/100"}
            alt="Identity Card Preview"
            className="w-24 h-24 mx-auto mb-2 object-cover rounded-md"
          />
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm font-medium">Kartu Identitas</p>
        </div>
      </div>

      {/* Upload Foto Diri */}
      <div className="p-4 text-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "selfPhoto")}
          style={{ display: 'none' }}
          id="upload-self-photo"
        />
        <div onClick={() => triggerFileInput("upload-self-photo")}>
          <img
            src={selfPhoto || "https://via.placeholder.com/100"}
            alt="Self Photo Preview"
            className="w-24 h-24 mx-auto mb-2 object-cover rounded-md"
          />
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm font-medium">Foto diri dengan Kartu Identitas</p>
        </div>
      </div>
    </div>
  );
};

export default UploadPhotoSection;