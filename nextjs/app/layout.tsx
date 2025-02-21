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
    <body>
      <QueryProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryProvider>
    </body>
  </html>
);

export default RootLayout;
