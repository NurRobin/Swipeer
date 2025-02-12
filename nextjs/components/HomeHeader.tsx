import React from 'react';

const HomeHeader: React.FC = () => {
  return (
    <header className="bg-primary-color text-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
      <p className="text-sm">Stay updated with the latest surveys and manage your groups.</p>
    </header>
  );
};

export default HomeHeader;