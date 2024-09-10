import React, { useState, useEffect } from 'react';
import MenuButton from './MenuButton';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'; // Import setDoc here
import AltarServerSchedule from './AltarServerSchedule'; // Updated import
import { getAuth } from 'firebase/auth';

const AltarServerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [user, setUser] = useState(null);
  const [attendanceData, setAttendanceData] = useState({
    date: '',
    checkInTime: '',
    checkOutTime: ''
  });
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.log('No such user!');
        }
      }
    };

    fetchUserData();
  }, [currentUser, db]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitAttendance = async () => {
    if (!attendanceData.date || !attendanceData.checkInTime || !attendanceData.checkOutTime || !user) {
      console.log('Please fill in all fields');
      return;
    }

    try {
      const docRef = doc(collection(db, 'attendance'));
      await setDoc(docRef, {
        ...attendanceData,
        userId: currentUser.uid,
        fullName: `${user.firstName} ${user.middleName || ''} ${user.lastName}`,
        createdAt: new Date()
      });
      console.log('Attendance submitted successfully');
      setAttendanceData({
        date: '',
        checkInTime: '',
        checkOutTime: ''
      });
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  return (
    <div>
      <MenuButton />
      <h1>Altar Server Dashboard</h1>
      <button onClick={handleViewSchedule}>View Schedule</button>
      {isModalOpen && (
        <AltarServerSchedule schedule={schedule} onClose={handleCloseModal} />
      )}
      <div>
        <h2>Submit Attendance</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmitAttendance();
        }}>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={attendanceData.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Check In Time:
            <input
              type="time"
              name="checkInTime"
              value={attendanceData.checkInTime}
              onChange={handleChange}
            />
          </label>
          <label>
            Check Out Time:
            <input
              type="time"
              name="checkOutTime"
              value={attendanceData.checkOutTime}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit Attendance</button>
        </form>
      </div>
    </div>
  );
};

export default AltarServerDashboard;
