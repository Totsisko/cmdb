import React, { useState, useEffect } from 'react';
import MenuButton from './MenuButton'; // Import the MenuButton component
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import Firestore methods
import './AltarServerPresidentDashboard.css'; // Custom CSS for styling

const AltarServerPresidentDashboard = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const db = getFirestore();

  // Fetch attendance records from Firestore
  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        console.log("Fetching attendance records...");
        const attendanceSnapshot = await getDocs(collection(db, 'attendance'));
        const attendance = attendanceSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Fetched attendance records:", attendance);
        setAttendanceRecords(attendance);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    fetchAttendanceRecords();
  }, [db]);

  return (
    <div className="dashboard-container">
      <MenuButton /> {/* Add MenuButton here */}
      <h1>Altar Server President Dashboard</h1>
      <div className="table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Date</th>
              <th>Check In Time</th>
              <th>Check Out Time</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map(record => (
              <tr key={record.id}>
                <td>{record.fullName}</td>
                <td>{record.date}</td>
                <td>{record.checkInTime}</td>
                <td>{record.checkOutTime}</td>
                <td>{record.createdAt?.toDate().toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AltarServerPresidentDashboard;
