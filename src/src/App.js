import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import ParishionerDashboard from './ParishionerDashboard';
import PriestDashboard from './PriestDashboard';
import AltarServerDashboard from './AltarServerDashboard';
import AltarServerPresidentDashboard from './AltarServerPresidentDashboard';
import EditProfile from './EditProfile';
import ManageEvents from './ManageEvents'; // Import ManageEvents component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/parishioner-dashboard" element={<ParishionerDashboard />} />
          <Route path="/priest-dashboard" element={<PriestDashboard />} />
          <Route path="/altar-server-dashboard" element={<AltarServerDashboard />} />
          <Route path="/altar-server-president-dashboard" element={<AltarServerPresidentDashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/manage-events" element={<ManageEvents />} /> {/* Route for ManageEvents */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
