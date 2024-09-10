import React, { useState, useEffect } from 'react';
import MenuButton from './MenuButton';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import AltarServerSchedule from './AltarServerSchedule'; // Updated import

const AltarServerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const db = getFirestore();

  // Fetch schedule data from Firestore
  useEffect(() => {
    const fetchSchedule = async () => {
      const scheduleCollection = collection(db, 'schedules'); // Adjust the path to your Firestore collection
      const scheduleSnapshot = await getDocs(scheduleCollection);
      const scheduleList = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedule(scheduleList);
    };

    if (isModalOpen) {
      fetchSchedule();
    }
  }, [isModalOpen, db]);

  const handleViewSchedule = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <MenuButton />
      <h1>Altar Server Dashboard</h1>
      <button onClick={handleViewSchedule}>View Schedule</button>
      {isModalOpen && (
        <AltarServerSchedule schedule={schedule} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AltarServerDashboard;
