import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { db } from './firebase'; // Import Firestore
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

// Set up the root element for React Modal
Modal.setAppElement('#root');

const ManageEvents = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserRole, setSelectedUserRole] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(null);

  // Fetch events from Firestore
  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'adminevents'));
      const fetchedEvents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events.');
    }
  };

  // Fetch users from Firestore
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const fetchedUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events on component mount
    fetchUsers(); // Fetch users on component mount
  }, []);

  const handleAddEvent = async () => {
    if (!title || !date || !time || !location) {
      toast.error('All fields are required!');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'adminevents'), {
        title,
        date,
        time,
        location,
        status: 'Pending',
        role: selectedUserRole // Add role to event data
      });
      toast.success('Event added successfully!');
      setTitle('');
      setDate('');
      setTime('');
      setLocation('');
      setSelectedUserRole('');
      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmEvent = async () => {
    if (eventToUpdate) {
      try {
        // Confirm the event
        await updateDoc(doc(db, 'adminevents', eventToUpdate.id), { status: 'Confirmed' });

        // Find users with the same role as the event
        const role = eventToUpdate.role;
        const usersToNotify = users.filter(user => user.role === role);

        // Notify users (implement actual notification logic here)
        usersToNotify.forEach(user => {
          console.log(`Notifying ${user.email} about the event ${eventToUpdate.title}`);
          // Replace with actual notification service code
        });

        toast.success('Event confirmed and users notified!');
        fetchEvents();
        setIsConfirmModalOpen(false);
        setEventToUpdate(null);
      } catch (error) {
        console.error('Error confirming event:', error);
        toast.error('Failed to confirm event.');
      }
    }
  };

  const handleCancelEvent = async () => {
    if (eventToUpdate) {
      try {
        await deleteDoc(doc(db, 'adminevents', eventToUpdate.id));
        toast.success('Event cancelled!');
        fetchEvents();
        setIsCancelModalOpen(false);
        setEventToUpdate(null);
      } catch (error) {
        console.error('Error cancelling event:', error);
        toast.error('Failed to cancel event.');
      }
    }
  };

  const handleRoleChange = (event) => {
    setSelectedUserRole(event.target.value);
  };

  return (
    <div>
      <h1>Manage Events</h1>
      <div>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Role:
          <select value={selectedUserRole} onChange={handleRoleChange}>
            <option value="">Select Role</option>
            <option value="Priest">Priest</option>
            <option value="Altar Server">Altar Server</option>
            <option value="Altar Server President">Altar Server President</option>
            <option value="Parishioner">Parishioner</option>
          </select>
        </label>
        <button onClick={handleAddEvent} disabled={loading}>
          {loading ? 'Adding...' : 'Add Event'}
        </button>
      </div>

      <h2>Upcoming Events</h2>
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.id}>
              <strong>{event.title}</strong><br />
              Date: {event.date}<br />
              Time: {event.time}<br />
              Location: {event.location}<br />
              Status: {event.status}<br />
              Role: {event.role}<br />
              {event.status === 'Pending' && (
                <>
                  <button
                    onClick={() => {
                      setEventToUpdate(event);
                      setIsConfirmModalOpen(true);
                    }}
                  >
                    Confirm Event
                  </button>
                  <button
                    onClick={() => {
                      setEventToUpdate(event);
                      setIsCancelModalOpen(true);
                    }}
                  >
                    Cancel Event
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No events available</p>
        )}
      </ul>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        contentLabel="Confirm Event"
      >
        <h2>Confirm Event</h2>
        <p>Do you want to confirm this event?</p>
        <button onClick={handleConfirmEvent}>Yes</button>
        <button onClick={() => setIsConfirmModalOpen(false)}>No</button>
      </Modal>

      {/* Cancellation Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={() => setIsCancelModalOpen(false)}
        contentLabel="Cancel Event"
      >
        <h2>Cancel Event</h2>
        <p>Do you want to cancel this event?</p>
        <button onClick={handleCancelEvent}>Yes</button>
        <button onClick={() => setIsCancelModalOpen(false)}>No</button>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ManageEvents;
