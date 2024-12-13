import React, { useState } from 'react';
import { ArrowLeft, Upload } from 'react-feather';
import { Link } from 'react-router-dom';
import LayoutWithoutSidebar from '../components/LayoutWithoutSideBar';

export default function Verification() {
  const [formData, setFormData] = useState({
    identityType: 'KTP',
    propertyName: '',
    propertyAddress: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <LayoutWithoutSidebar>
      <div className="max-w-3xl px-8 py-2 mx-auto">
        <div className="mb-6">
          <Link to="/dashboard" className="flex items-center mb-4 text-black">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-2xl font-extrabold">Verifikasi Akun</span>
          </Link>
          <p className="text-gray-600 ml-8">Lakukan verifikasi akun untuk mendaftar sebagai pemilik kos</p>
        </div>

        <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Verifikasi Akun</h2>
          <p className="mb-4 text-sm text-gray-600">Email dan Nomor Handphone</p>
          <p className="mb-4 text-xs text-gray-500">Pastikan email dan nomor handphone yang Anda gunakan aktif. Kami akan mengirimkan kode OTP ke email dan nomor handphone Anda untuk proses verifikasi.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-600">johndoe@example.com</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Nomor Handphone</p>
                <p className="text-sm text-gray-600">+62 812-3456-7890</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Verifikasi Identitas</h2>
            <div className="p-4 mb-4 rounded-md bg-blue-50">
              <p className="text-sm text-gray-600">
                Lengkapi data agar proses pengajuan sewa lebih cepat.
                Kami akan memeriksa kesesuaian data untuk memastikan sewa dan penggunaan data di pihak pengajuan sewa.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-gray-600">Jenis Identitas</label>
                <select
                  name="identityType"
                  value={formData.identityType}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white border rounded-md"
                >
                  <option value="KTP">KTP</option>
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 text-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm font-medium">Kartu Identitas</p>
                  </div>
                </div>

                <div className="p-4 text-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm font-medium">Foto diri dengan Kartu Identitas</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-center text-gray-500">
                Dengan melanjutkan, saya menyetujui data yang diberikan ada di tangan dan merupakan IDENTITAS ASLI
              </p>

              <button type="submit" className="w-full py-2 text-white rounded-lg bg-darkGreen hover:opacity-90">
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </LayoutWithoutSidebar>
  );
}