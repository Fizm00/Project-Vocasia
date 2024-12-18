import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const NotificationList = ({ notifications, handleDelete }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md" data-aos="fade-up">
      <h2 className="text-xl font-bold text-white bg-darkGreen p-4 rounded-t-lg">
        All Notifications
      </h2>
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex justify-between items-center px-4 py-3 hover:bg-gray-100"
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-800">{notification.title}</h3>
              <p className="text-xs text-gray-500">{notification.date}</p>
            </div>
            <button
              onClick={() => handleDelete(notification.id)}
              className="text-gray-500 hover:text-red-700 font-bold text-lg"
              aria-label="Delete notification"
            >
              &#x2715;
            </button>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-6" data-aos="fade-up">
            No notifications available.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
