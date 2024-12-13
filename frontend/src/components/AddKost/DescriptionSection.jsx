import React from "react";

const DescriptionSection = ({ description, onDescriptionChange }) => (
  <div className="mb-6 border p-10 rounded-lg md:mt-2">
    <h2 className="text-lg font-bold mb-2">Beritahu kami lebih lengkap tentang tempatmu!</h2>
    <p className="text-sm text-gray-400 mb-4">
      Isi deskripsi dengan detail, seperti fasilitas tambahan, aksesibilitas, atau hal unik dari tempatmu.
    </p>
    <textarea
      rows="6"
      placeholder="Deskripsikan mengenai tempatmu..."
      className="w-full border rounded p-2"
      value={description} 
      onChange={onDescriptionChange}
    ></textarea>
  </div>
);

export default DescriptionSection;
