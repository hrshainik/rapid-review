import React, { useState, useEffect, useContext, createContext } from "react";
import "./firebase";
import {
  GithubAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onIdTokenChanged,
} from "firebase/auth";
import { createUser } from "@/lib/db";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const formatUser = async (user) => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
    token,
  };
};

function useAuthProvider() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);
      createUser(user);
      setUser(user);
      Cookies.set("RapidReviewAuth", true, { expires: 365 });
      return user;
    } else {
      setUser(false);
      Cookies.remove("RapidReviewAuth");
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

  const signinWithGoogle = async () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(auth, googleProvider);
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
      router.push("/");
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onIdTokenChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    signinWithGithub,
    signinWithGoogle,
  };
}
