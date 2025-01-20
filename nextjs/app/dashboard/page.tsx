// src/app/dashboard/page.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    // If user is not authenticated, redirect to home page
    router.push('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name || user.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
