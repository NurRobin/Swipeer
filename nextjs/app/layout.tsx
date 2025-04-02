// src/app/layout.tsx
import type { Metadata } from "next";
import React, { PropsWithChildren } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';
import QueryProvider from "@/contexts/QueryContext";

export const metadata: Metadata = {
  title: "Swipeer",
  description: "The next-gen decision-making app",
};


const RootLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <head>
      <title>Swipeer</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
        rel="stylesheet"
      />
    </head>
    <body className="bg-gradient-to-br from-[#f4f7fd] to-[#e7eeff] dark:from-[#101c35] dark:to-[#0a1022]">
      <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] opacity-10 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-[40vh] bg-gradient-to-l from-[var(--accent-color-2)] to-[var(--primary-color)] opacity-10 blur-3xl -z-10"></div>
      <QueryProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryProvider>
    </body>
  </html>
);

export default RootLayout;
