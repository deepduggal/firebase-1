'use client';
import GoogleLogin from  "@/app/components/GoogleLogin";
import SessionContext from "@/app/data/sessions/SessionContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/init.js";
import { useContext } from "react";
import EmailLogin from "./components/EmailLogin";
import Link from "next/link";



export default function Home() {

  const {session, setSession} = useContext(SessionContext);

  const logout = async () => {
    try {
      await signOut(auth);
      setSession({ user: null });
    } catch (err) {
      console.error('An error occurred during logout: ', err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* Not Authorized */}
      {!session.user && (<>
        <EmailLogin setSession={setSession}/>
        <GoogleLogin />
      </>)}

      {/* Authorized */}
      {session.user && <button onClick={logout}>Logout {session.user.displayName}</button>}
      <Link href="/auth-only">Link to auth-only page</Link>
    </main>
  );
}
