import React, { useEffect, useState } from 'react';
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
      setError('User ID is required.');
      return;
    }
  
    try {
      const updatedData = await updateUser(cleanedUserId, formData);
      setFormData(updatedData.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
      setError(error.message || 'Failed to update user data.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(formData);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: imageUrl });
  
      const formDataForUpload = new FormData();
      formDataForUpload.append("photo", file);
  
      try {
        const uploadResponse = await axios.put(`/user/${cleanedUserId}/photo`, formDataForUpload);
        if (uploadResponse.data.success) {
          setFormData({ ...formData, photo: uploadResponse.data.photo });
        } else {
          setError("Error uploading photo.");
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
        setError("Failed to upload photo.");
      }
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
          formData={{
            name: formData.name || 'Nama Tidak Tersedia',
            email: formData.email,
            gender: formData.gender || 'Not Available',
            phone: formData.phone,
            address: formData.address,
            image: formData.photo,
          }}
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
