import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotificationList from "../components/Notification/NotifList";
import axiosInstance from "../config/axiosInstance";

const Notification = () => {
  const [notifications, setNotifications] = useState([
  ]);

  const userId = localStorage.getItem("id");
  console.log(userId);

  useEffect(() => {
    // Fungsi untuk mengambil notifikasi
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get(
          `/notifications/${userId}`
        );
        setNotifications(response.data.data); // Simpan data notifikasi ke state
      } catch (err) {
        console.error("Error fetching notifications:", err.message);
      }
    };
    // Panggil fungsi fetch jika userId tersedia
    if (userId) {
      fetchNotifications();
    }
  }, [userId]); // useEffect akan dijalankan setiap kali userId berubah

  const handleDelete = (id) => {
    // Filter out the notification with the matching id
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 px-4 lg:px-20 py-10">
        {/* Pass the notifications and handleDelete function as props */}
        <NotificationList
          notifications={notifications}
          handleDelete={handleDelete}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Notification;
