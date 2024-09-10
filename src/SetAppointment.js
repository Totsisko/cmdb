// src/SetAppointment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import Calendar styles

const SetAppointment = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleBackClick = () => {
    navigate('/parishioner-dashboard');
  };

  const handleSaveAppointment = () => {
    // Logic to save the appointment
    console.log('Appointment set for:', date);
  };

  return (
    <div>
      <h1>Set Appointment</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
      <button onClick={handleSaveAppointment}>Save Appointment</button>
      <button onClick={handleBackClick}>Back to Dashboard</button>
    </div>
  );
};

export default SetAppointment;
