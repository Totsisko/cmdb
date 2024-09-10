// src/AdminUpdates.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Import your Firebase config
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'; // Firestore functions

const AdminUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState('');
  const [editUpdateId, setEditUpdateId] = useState(null);
  const [editUpdateText, setEditUpdateText] = useState('');

  useEffect(() => {
    const fetchUpdates = async () => {
      const querySnapshot = await getDocs(collection(db, 'updates'));
      setUpdates(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchUpdates();
  }, []);

  const handleAddUpdate = async () => {
    if (newUpdate.trim()) {
      await addDoc(collection(db, 'updates'), { message: newUpdate });
      setNewUpdate('');
      // Refresh updates list
      const querySnapshot = await getDocs(collection(db, 'updates'));
      setUpdates(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  const handleEditUpdate = async () => {
    if (editUpdateText.trim() && editUpdateId) {
      await updateDoc(doc(db, 'updates', editUpdateId), { message: editUpdateText });
      setEditUpdateId(null);
      setEditUpdateText('');
      // Refresh updates list
      const querySnapshot = await getDocs(collection(db, 'updates'));
      setUpdates(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  const handleDeleteUpdate = async (id) => {
    await deleteDoc(doc(db, 'updates', id));
    // Refresh updates list
    const querySnapshot = await getDocs(collection(db, 'updates'));
    setUpdates(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div>
      <h1>Admin Updates</h1>
      <input
        type="text"
        value={newUpdate}
        onChange={(e) => setNewUpdate(e.target.value)}
        placeholder="Add new update"
      />
      <button onClick={handleAddUpdate}>Add Update</button>

      {editUpdateId && (
        <div>
          <input
            type="text"
            value={editUpdateText}
            onChange={(e) => setEditUpdateText(e.target.value)}
            placeholder="Edit update"
          />
          <button onClick={handleEditUpdate}>Save Changes</button>
        </div>
      )}

      <ul>
        {updates.map(update => (
          <li key={update.id}>
            {update.message}
            <button onClick={() => {
              setEditUpdateId(update.id);
              setEditUpdateText(update.message);
            }}>Edit</button>
            <button onClick={() => handleDeleteUpdate(update.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUpdates;
