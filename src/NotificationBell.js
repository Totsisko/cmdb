// src/NotificationBell.js
import React, { useState } from 'react';
import './NotificationBell.css'; // Import the CSS file for styling

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="notification-bell-container">
      <div className="notification-bell" onClick={handleBellClick}>
        🔔 {/* Bell icon, you can use an icon library for a better icon */}
      </div>
      {showNotifications && (
        <div className="notification-popup">
          <p>No new notifications.</p> {/* Replace with actual notifications */}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
