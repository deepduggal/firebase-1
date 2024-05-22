'use client';

import React, { useEffect } from 'react';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/init.js";
import { useContext } from 'react';
import SessionContext from '@/app/data/sessions/SessionContext.js';


export default function GoogleLogin() {
  const {session, setSession} = useContext(SessionContext);

  /**
   * Displays a Google sign-in popup and, if successful, returns the user's information
   * @returns A promise that resolves with the user's information
   */
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setSession({ user: null });
    } catch (err) {
      console.error('An error occurred during logout: ', err);
    }
  };

  const onClick = async (e: React.SyntheticEvent) => {
    try {
      const user = await googleLogin();

      // Update session and store user object
      if (user !== null) {
        setSession({ user });
      } else {
        setSession({ user: null });
      }
    } catch (error) {
      console.log('Google Login failed: ', error);
    }
  };

  return (
    <>
      {session.user === null && (
        <button className="p-2 rounded-lg bg-white text-black" onClick={onClick}>
          Sign In With Google
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.1 21.7c5.9 0 10.7-4.9 10.7-10.9S17 0 11.1 0 0.4 4.9 0.4 10.9s4.8 10.8 10.7 10.8z" fill="#4285F4"/>
            <path d="M16.6 10.9c0-0.6-0.1-1.2-0.2-1.8H11v3.4h3.2c-0.1 0.9-0.4 1.7-1.1 2.4v2h1.8c1.1-1 1.7-2.5 1.7-4.1z" fill="#34A853"/>
            <path d="M11.1 21.7c2.9 0 5.3-1 7.1-2.6l-3.3-2.6c-1 0.7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.7H1.4v2.9c2.1 3.9 6.5 6.5 11.4 6.5z" fill="#FBBC05"/>
            <path d="M4.8 13.6c-0.2-0.6-0.3-1.3-0.3-2s0.1-1.4 0.3-2V6.6H1.4A10.6 10.6 0 0 0 1 10.9c0 1.8 0.4 3.5 1.1 5l3.7-2.9z" fill="#EA4335"/>
            <path d="M11.1 4.3c1.6 0 3 0.6 4.1 1.7l3.1-3.1C16.6 1.6 14.1 0.6 11.1 0.6 6.2 0.6 2.2 4.7 2.2 9.6c0 1.6 0.4 3.1 1.1 4.4l3.5-2.7c-0.5-1.7 0.1-3.6 1.8-4.7-0.1 0-0.2 0-0.3 0z" fill="#4285F4"/>
          </svg>
        </button>
      )}
    </>
  )
}
