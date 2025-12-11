import React, { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,createUserWithEmailAndPassword,
  getAuth, onAuthStateChanged,
  signInWithEmailAndPassword,signInWithPopup,signOut,
  updateEmail,updateProfile} from 'firebase/auth'
import { app } from '../Firebase/firebase.init';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

 const ThemeContext = createContext();
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
     localStorage.removeItem('token');
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = async () => {
    setLoading(true)
    setUser(null)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }
  const updateUser = async ({ name, photo, email }) => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("No user is currently signed in.");

  // 1. Update name and photo
  if (name || photo) {
    await updateProfile(currentUser, {
      displayName: name || currentUser.displayName,
      photoURL: photo || currentUser.photoURL,
    });
  }

  // 2. Update email (if changed)
  if (email && email !== currentUser.email) {
    await updateEmail(currentUser, email);
  }

  // Refresh context state
  setUser({ ...auth.currentUser });

  return 'User updated successfully';
};

  const saveUser = async (email, name, photo) => {
  const userInfo = {
    email,
    name,
    photo,
    
    // console.log('JWT saved from saveUser');
  }
  const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/jwt`, userInfo);
   const token = data?.token;
   if (token) {
    localStorage.setItem('token', token);
    return data;
  };
};
  // onAuthStateChange
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      setUser(currentUser);

      // For existing users, just get JWT with email
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: currentUser.email }
      );

      const token = data?.token;
      if (token) {
        localStorage.setItem('token', token);
      }

    } else {
      setUser(null);
      localStorage.removeItem('token');
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);
    const authInfo = {
    user,
    saveUser, 
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    updateUser,
    
  }
  
  
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export {ThemeContext};
export default AuthProvider;