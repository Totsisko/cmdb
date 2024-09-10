import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toast notifications

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, 'users', user.uid); // Fetch user document from Firestore
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role || '';

        console.log('User Role:', role); // Debugging statement

        // Redirect to the appropriate dashboard based on user role
        switch (role) {
          case 'Admin':
            navigate('/admin-dashboard');
            break;
          case 'Priest':
            navigate('/priest-dashboard');
            break;
          case 'Parishioner':
            navigate('/parishioner-dashboard');
            break;
          case 'Altar server':
            navigate('/altar-server-dashboard');
            break;
          case 'Altar server president':
            navigate('/altar-server-president-dashboard');
            break;
          default:
            navigate('/login');
        }
      } else {
        console.error('No such user document!');
        toast.error('Failed to log in. User role not found.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
