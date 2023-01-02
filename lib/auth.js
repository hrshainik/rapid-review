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
import { async } from "@firebase/util";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = async (email, password) => {
    // return firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((response) => {
    //     setUser(response.user);
    //     return response.user;
    //   });
    try {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch (error) {
      console.log(error);
    }
  };

  const signinWithGithub = async () => {
    const auth = getAuth();
    const githubProvider = new GithubAuthProvider();
    // return firebase
    //   .auth()
    //   .signInWithPopup(githubProvider)
    //   .then((response) => {
    //     setUser(response.user);
    //     return response.user;
    //   });
    try {
      const res = await signInWithPopup(auth, githubProvider);
      setUser(res.user);
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (email, password) => {
    const auth = getAuth();
    // return firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((response) => {
    //     setUser(response.user);
    //     return response.user;
    //   });
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    // return firebase
    //   .auth()
    //   .signOut()
    //   .then(() => {
    //     setUser(false);
    //   });
    const auth = getAuth();
    try {
      const res = await signOut(auth);
      setUser(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = async () =>
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(false);
        }
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
