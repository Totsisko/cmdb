import React from 'react';

const AltarServerSchedule = ({ schedule, onClose }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Not yet checked';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Altar Server Schedule</h2>
        <table className="altar-server-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Role</th>
              <th>Date</th>
              <th>Check In Time</th>
              <th>Check Out Time</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item) => (
              <tr key={item.id}>
                <td>{item.fullName}</td>
                <td>{item.role}</td>
                <td>{formatDate(item.date)}</td>
                <td>{formatDate(item.checkInTime)}</td>
                <td>{formatDate(item.checkOutTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AltarServerSchedule;
