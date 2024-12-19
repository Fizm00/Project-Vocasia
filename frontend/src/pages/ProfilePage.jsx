import React, { useEffect, useState } from 'react';
import axiosInstance from "../config/axiosInstance";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Menu from '../components/ProfilePage/Menu';
import ProfileDetail from '../components/ProfilePage/ProfileDetail';
import { getUserById, updateUser } from '../api/userApi'; 

const ProfilePage = () => {
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('id'); 
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
          setFormData(data.data);
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!cleanedUserId) {
      setError("User ID is required.");
      return;
    }
  
    try {
      const response = await updateUser(cleanedUserId, formData);
  
      if (response.success) {
        setFormData(response.data); // Perbarui state dengan data terbaru
        console.log("Updated Data:", response.data);
        setIsEditing(false);
      } else {
        setError("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      setError("Failed to save user data.");
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setFormData(formData);
  };

  const handleImageUpload = async (file) => {
    const formDataForUpload = new FormData();
  
    formDataForUpload.append("photo", file);
  
    try {
      const response = await axiosInstance.put(`/user/${cleanedUserId}`, formDataForUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data.success) {
        setFormData((prev) => ({
          ...prev,
          photo: response.data.data.photo, // Perbarui URL gambar
        }));
        console.log("Updated Photo URL:", response.data.data.photo);
      } else {
        setError("Failed to upload photo.");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      setError("Failed to upload photo.");
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

  if (!formData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center gap-6 sm:flex-row p-8 mb-8">
        {/* Menu */}
        <Menu formData={{
            name: formData.name || 'Nama Tidak Tersedia',
            email: formData.email,
            gender: formData.gender || 'Not Available',
            phone: formData.phone,
            address: formData.address,
            image: formData.photo,
        }} />

        {/* Profile Detail */}
        <ProfileDetail
          formData={formData}
          isEditing={isEditing}
          setFormData={setFormData}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          handleImageUpload={handleImageUpload}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
