'use client';
import React, { useContext, useEffect } from 'react'
import SessionContext from '@/app/data/sessions/SessionContext';
import { useRouter } from 'next/navigation';

export default function Page() {
  const {session, setSession} = useContext(SessionContext);
  const router = useRouter();

  useEffect(() => {
    if (!session!.user) {
      router.push('/');
    }
  }, [router, session.user]);

  return (
    <div className="text-5xl">{!session.user? 'LEAVE NOW, UNAUTHORIZED!!!': 'You are AUTHORIZED to view this tpo'}</div>
    
  )
}
