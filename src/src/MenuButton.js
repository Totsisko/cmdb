import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { auth } from './firebase'; // Import Firebase auth instance
import './MenuButton.css'; // Import custom styles

const MenuButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleEditProfile = () => {
    navigate('/edit-profile'); // Navigate to the edit profile page
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/'); // Redirect to the homepage is only '/'
    } catch (error) {
      console.error('Error signing out:', error);
    }
    setMenuOpen(false);
  };

  return (
    <div className="menu-button-container">
      <button className="menu-button" onClick={handleMenuClick}>
        ☰ Menu
      </button>
      {menuOpen && (
        <div className="menu-dropdown">
          <button onClick={handleEditProfile}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
