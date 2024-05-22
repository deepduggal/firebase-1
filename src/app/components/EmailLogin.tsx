'use client';

import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/init';

export default function EmailLogin({setSession}) {
  const [email, setEmail] = useState('testtest@example.com');
  const [password, setPassword] = useState('testtest');


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // const user = await createUserWithEmailAndPassword(auth, email, password);
      const user = await signInWithEmailAndPassword(auth, email, password);
      setSession({ user });
      // Login successful, do something
    } catch (error) {
      alert('An error occurred during login');
      console.error('An error occurred during login: ', error);
    }
  };

  return (
    <div>
      <h1>Email Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
