import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Calendar from 'react-calendar'; // Install this library
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import { db } from './firebase'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions

const ParishionerDashboard = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSetAppointment = async () => {
    try {
      const appointmentsCollection = collection(db, 'appointments');
      await addDoc(appointmentsCollection, {
        date: date.toDateString(), // Save the date as a string or format it as needed
        time: 'TBD', // You might want to add a time field if applicable
        status: 'Pending', // Default status
        userId: 'USER_ID' // You should replace 'USER_ID' with the actual user ID or data from auth
      });
      toast.success('Appointment set successfully!');
      // Optionally redirect or reset the form
      setDate(new Date()); // Reset the calendar date
    } catch (error) {
      console.error('Error setting appointment:', error);
      toast.error('Failed to set appointment.');
    }
  };

  return (
    <div>
      <h1>Parishioner Dashboard</h1>
      <button onClick={() => navigate('/')}>Back to Home</button>
      <div>
        <h2>Set Appointment</h2>
        <Calendar
          onChange={setDate}
          value={date}
        />
        <button onClick={handleSetAppointment}>Confirm Appointment</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ParishionerDashboard;
