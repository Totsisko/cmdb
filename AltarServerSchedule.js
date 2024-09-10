import React from 'react';

const AltarServerSchedule = ({ schedule, onClose }) => {
  const handleTimeIn = async (scheduleId) => {
    // Implement time in functionality here
    console.log(`Time in for schedule ${scheduleId}`);
    // Example: Update Firestore with time in
    // const scheduleRef = doc(db, 'schedules', scheduleId);
    // await updateDoc(scheduleRef, { timeIn: serverTimestamp() });
  };

  const handleTimeOut = async (scheduleId) => {
    // Implement time out functionality here
    console.log(`Time out for schedule ${scheduleId}`);
    // Example: Update Firestore with time out
    // const scheduleRef = doc(db, 'schedules', scheduleId);
    // await updateDoc(scheduleRef, { timeOut: serverTimestamp() });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Altar Server Schedule</h2>
        <ul>
          {schedule.map((item) => (
            <li key={item.id}>
              <span>{item.date} - {item.time}</span>
              <button onClick={() => handleTimeIn(item.id)}>Time In</button>
              <button onClick={() => handleTimeOut(item.id)}>Time Out</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AltarServerSchedule;
