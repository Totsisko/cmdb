// src/PriestDashboard.js
import React from 'react';
import MenuButton from './MenuButton';
import NotificationBell from './NotificationBell'; // Import the NotificationBell component

const PriestDashboard = () => {
  return (
    <div>
      <MenuButton />
      <NotificationBell /> {/* Add NotificationBell here */}
      <h1>Priest Dashboard</h1>
      {/* Dashboard content here */}
    </div>
  );
};

export default PriestDashboard;
