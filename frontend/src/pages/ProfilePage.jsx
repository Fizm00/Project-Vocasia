import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Menu from '../components/ProfilePage/Menu';
import ProfileDetail from '../components/ProfilePage/ProfileDetail';

const ProfilePage = () => {
  const initialFormData = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    gender: 'Laki-laki',
    phone: '08123456789',
    address: 'Jalan Raya No. 123',
    image: 'https://i.pinimg.com/736x/26/9e/85/269e85382feef27766c544729c1abaa3.jpg', 
  };

  const [formData, setFormData] = useState(initialFormData);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Logic to save data to backend (e.g., API call)
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(initialFormData); // Restore to original state if user cancels
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setFormData({ ...formData, image: imageUrl }); 
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center gap-6 sm:flex-row p-8 mb-8">
        {/* Menu */}
        <Menu image={formData.image} />

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
