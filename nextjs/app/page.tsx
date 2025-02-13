// src/app/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbase';
import LoginRegister from '@/components/LoginRegister';
import HomeContent from '@/components/HomeContent';

const HomePage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    pb.collection('users')
      .authRefresh()
      .then(() => setIsAuthenticated(pb.authStore.isValid))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoaded(true));

    const unsubscribe = pb.authStore.onChange(() => setIsAuthenticated(pb.authStore.isValid));
    return () => unsubscribe();
  }, []);

  if (!loaded) {
    return (
      <div>
        <div className="spinner"></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spinner {
            margin: 20px auto;
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            animation: spin 1s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated ? <HomeContent /> : <LoginRegister />}
    </div>
  );
};

export default HomePage;