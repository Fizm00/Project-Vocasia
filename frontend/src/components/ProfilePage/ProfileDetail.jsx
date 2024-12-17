import React from 'react';
import { FaEdit, FaCamera } from 'react-icons/fa';

const ProfileDetail = ({
  formData,
  isEditing,
  setFormData,
  handleSave,
  handleEdit,
  handleCancel,
  handleImageUpload
}) => {
  return (
    <div className="w-full sm:w-2/3 p-8 bg-white border rounded-lg shadow-lg">
      <div className="text-2xl font-bold mb-2">Biodata Diri</div>
      <hr className="w-full border-t-1 border-gray-300 mb-6" />

      <div className="flex flex-col sm:flex-row space-y-6 sm:space-x-6">
        {/* Profile Picture Section */}
        <div className="w-full sm:w-1/4 bg-white">
          <div className="p-2 border border-gray-300 rounded-md">
            <img
              src={formData.image || 'https://via.placeholder.com/100'}
              alt="User"
              className="w-40 h-40 mb-2 mt-2 ml-16 mr-12 sm:ml-2 object-cover rounded-md"
            />
            {/* File Input for Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="upload-photo"
            />
            <label htmlFor="upload-photo">
              <button className="w-full text-center text-darkGreen py-2 px-4 border border-darkGreen rounded-md">
                <FaCamera className="inline mr-2" /> Upload Foto
              </button>
            </label>
          </div>
        </div>

        {/* Profile Form */}
        <div className="flex-1">
          {/* Full Name Input */}
          <div className="space-y-1 mb-2">
            <label className="block text-sm font-semibold">Nama Lengkap</label>
            <input
              type="text"
              value={formData.name}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Email Display */}
          <div>
            <label className="block text-sm mb-1 font-semibold mt-4">Email</label>
            <div className="p-2 border rounded-md mb-4">{formData.email}</div>
          </div>

          {/* Gender Select */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Jenis Kelamin</label>
            <select
              value={formData.gender}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Nomor Handphone</label>
            <input
              type="text"
              value={formData.phone}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />
          </div>

          {/* Address Input */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Alamat</label>
            <input
              type="text"
              value={formData.address}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="px-4 py-2 bg-darkGreen text-white rounded-md">
                  Save
                </button>
                <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-md">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={handleEdit} className="px-4 py-2 bg-darkGreen text-white rounded-md">
                <FaEdit className="inline mr-2" /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
