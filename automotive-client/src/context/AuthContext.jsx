
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../services/firebase.config";

export const context = createContext(null);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();


const AuthContext = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const createUserWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    }
  }, [])

  const signIn = ( email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  const authInfo = {
    user,
    createUser,
    createUserWithGoogle,
    signIn,
    logOut,
    loading,
  }

  return (
    <context.Provider value={authInfo}>
      {children}
    </context.Provider>
  )
}

export default AuthContext