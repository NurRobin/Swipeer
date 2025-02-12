// src/app/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbase';
import LoginRegister from '@/components/LoginRegister';
import HomeContent from '@/components/HomeContent';

const HomePage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => setIsAuthenticated(pb.authStore.isValid));
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {isAuthenticated ? <HomeContent /> : <LoginRegister />}
    </div>
  );
};

export default HomePage;