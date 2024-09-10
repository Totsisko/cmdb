import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    // Implement save logic here
    console.log('Profile saved');
    navigate('/dashboard'); // Redirect to the dashboard after saving
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      {/* Add form fields for profile editing here */}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditProfile;
