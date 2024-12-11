import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotificationList from "../components/Notification/NotifList";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Invite Your Friends!", date: "12 Mar 2021" },
    { id: 2, title: "Connect to your facebook account.", date: "12 Mar 2021" },
    { id: 3, title: "New privacy alert!", date: "12 Mar 2021" },
    { id: 4, title: "Invite Your Friends!", date: "12 Mar 2021" },
    { id: 5, title: "Connect to your facebook account.", date: "12 Mar 2021" },
    { id: 6, title: "New privacy alert!", date: "12 Mar 2021" },
  ]);

  const handleDelete = (id) => {
    // Filter out the notification with the matching id
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 px-4 lg:px-20 py-10">
        {/* Pass the notifications and handleDelete function as props */}
        <NotificationList notifications={notifications} handleDelete={handleDelete} />
      </main>
      <Footer />
    </div>
  );
};

export default Notification;
