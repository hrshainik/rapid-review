import React, { useState, useEffect, useContext, createContext } from "react";
import "./firebase";
import {
  GithubAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createUser } from "@/lib/db";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
  };
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signin = async (email, password) => {
    try {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(auth, email, password);
      handleUser(res.user);
    } catch (error) {
      // console.log(error);
    }
  };

  const signinWithGithub = async () => {
    const auth = getAuth();
    const githubProvider = new GithubAuthProvider();

    try {
      const res = await signInWithPopup(auth, githubProvider);
      handleUser(res.user);
    } catch (error) {
      // console.log(error);
    }
  };

  const signup = async (email, password) => {
    const auth = getAuth();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      handleUser(res.user);
    } catch (error) {
      // console.log(error);
    }
  };

  const signout = async () => {
    const auth = getAuth();

    try {
      const res = await signOut(auth);
      handleUser(false);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = async () =>
      await onAuthStateChanged(auth, (user) => {
        handleUser(user);
      });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    signinWithGithub,
  };
}
