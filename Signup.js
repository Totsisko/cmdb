import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; // Firestore
import { auth, db } from './firebase'; // Import Firebase config
import { ToastContainer, toast } from 'react-toastify'; // Import toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Firebase authentication: create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore: Save user info including personal details
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        middleName,
        lastName,
        email: user.email, // Use the email from authentication
        address,
        role
      });

      // Notify success
      toast.success('User signed up and information added successfully!');
      console.log('User signed up and information added:', user.uid);
    } catch (error) {
      // Notify error
      toast.error('Error signing up: ' + error.message);
      console.error('Error adding document:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="Priest">Priest</option>
          <option value="Altar server">Altar server</option>
          <option value="Altar server president">Altar server president</option>
          <option value="Admin">Admin</option>
          <option value="Parishioner">Parishioner</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      <ToastContainer /> {/* Include ToastContainer */}
    </div>
  );
};

export default Signup;
