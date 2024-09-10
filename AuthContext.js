// src/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [role, setUserRole] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const tokenResult = await user.getIdTokenResult();
          console.log('Token Claims:', tokenResult.claims); // Log claims for debugging
          setUserRole(tokenResult.claims.role || ''); // Ensure role is a string
        } catch (error) {
          console.error('Error getting token result:', error);
          setUserRole(''); // Set to empty string if there's an error
        }
      } else {
        setUser(null);
        setUserRole('');
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, loading, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
