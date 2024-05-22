'use client';
import GoogleLogin from  "@/app/components/GoogleLogin";
import SessionContext from "@/app/data/sessions/SessionContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/init.js";
import { useEffect, useState } from "react";



export default function Home() {

  const [session, setSession] = useState({ user: null });

  const logout = async () => {
    try {
      await signOut(auth);
      setSession({ user: null });
    } catch (err) {
      console.error('An error occurred during logout: ', err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SessionContext.Provider value={{ session, setSession}}>
        {/* Not Authorized */}
        {!session.user && <GoogleLogin />}

        {/* Authorized */}
        {session.user && <button onClick={logout}>Logout {session.user.displayName}</button>}
      </SessionContext.Provider>
    </main>
  );
}
