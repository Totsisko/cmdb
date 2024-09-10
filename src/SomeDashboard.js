// src/SomeDashboard.js (Update for all dashboards)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from './firebase'; // Adjust import

const SomeDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <button onClick={() => navigate('/profile')}>Edit Profile</button>
      <button onClick={handleLogout}>Logout</button>
      {/* Rest of your dashboard code */}
    </div>
  );
};

export default SomeDashboard;
