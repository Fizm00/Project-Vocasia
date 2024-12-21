import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import LayoutWithoutSidebar from '../components/LayoutWithoutSideBar';
import UploadPhotoSection from '../components/Verification/UploadPhotoSection';
import { getUserById, updateUser } from '../api/userApi';

const Verification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: '',
  });
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('user_id');
  const cleanedUserId = userId ? userId.replace(/"/g, '') : null;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!cleanedUserId) {
        setError('User ID not found.');
        setLoading(false);
        return;
      }

      try {
        const data = await getUserById(cleanedUserId);
        if (data.success) {
          console.log("userData", data.data);
          setUserData(data.data);
          setFormData((prevState) => ({
            ...prevState,
            role: data.data.role || 'user',
          }));
        } else {
          setError('User not found.');
        }
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [cleanedUserId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cleanedUserId) {
      setError('User ID is required.');
      return;
    }

    try {
      const updatedData = {
        ...userData,
        role: formData.role,
      };

      const response = await updateUser(cleanedUserId, updatedData);
      if (response.success) {
        localStorage.setItem('role', formData.role);
        alert('Berhasil mendaftar sebagai pemilik kost!');
        navigate('/dashboard');
      } else {
        setError('Failed to update role.');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Error updating user role.');
    }
  };

  const handleImageUpload = async (file) => {
    const formDataForUpload = new FormData();
    formDataForUpload.append("photo", file);
  
    try {
      const response = await updateUser(cleanedUserId, formDataForUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.success) {
        // alert('Photo uploaded successfully!');
      } else {
        alert('Failed to upload photo.');
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert('Error uploading photo.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <LayoutWithoutSidebar>
      <div className="max-w-3xl px-8 py-2 mx-auto">
        <div className="mb-6">
          <Link to="/profile" className="flex items-center mb-4 text-black">
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
                <p className="text-sm text-gray-600">{userData?.email || 'Email tidak tersedia'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Nomor Handphone</p>
                <p className="text-sm text-gray-600">{userData?.phone || 'Nomor Handphone tidak tersedia'}</p>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Verifikasi Identitas</h2>
            <div className="p-4 mb-4 rounded-md bg-blue-50">
              <p className="text-sm text-gray-600">
                Lengkapi data agar proses pengajuan sewa lebih cepat.
                Kami akan memeriksa kesesuaian data untuk memastikan sewa dan penggunaan data di pihak pengajuan sewa.
              </p>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                className="w-full p-2 bg-white border rounded-md"
              >
                <option value="user">User</option>
                <option value="owner">Owner</option>
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-gray-600">Jenis Identitas</label>
                <select
                  name="identityType"
                  className="w-full p-2 bg-white border rounded-md"
                >
                  <option value="KTP">KTP</option>
                </select>
              </div>

              <UploadPhotoSection onUpload={handleImageUpload} />

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

export default Verification;  