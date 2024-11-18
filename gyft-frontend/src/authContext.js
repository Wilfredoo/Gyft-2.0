import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Create the AuthContext
export const AuthContext = createContext(null);

// Hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Loading stops when auth state is determined
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser, // The currently logged-in user
    isAuthenticated: !!currentUser, // Boolean indicating if the user is logged in
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
