'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionContext from "./data/sessions/SessionContext";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, setSession] = useState({ user: null });

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionContext.Provider value={{ session, setSession }}>
          {children}
        </SessionContext.Provider>
      </body>
    </html>
  );
}
