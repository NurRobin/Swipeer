import React from 'react';
import Link from 'next/link';

const HomeHeader: React.FC = () => {
  return (
    <header className="bg-primary-color text-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-sm">Stay updated with the latest surveys and manage your groups.</p>
      </div>
      <div className="flex space-x-4">
        <Link href="/group/create">
          <button className="bg-white text-primary-color px-4 py-2 rounded-md shadow hover:bg-gray-100 transition">+ Create Group</button>
        </Link>
        <Link href="/survey/create">
          <button className="bg-white text-primary-color px-4 py-2 rounded-md shadow hover:bg-gray-100 transition">+ Create Survey</button>
        </Link>
        <Link href="/dashboard">
          <button className="bg-white text-primary-color px-4 py-2 rounded-md shadow hover:bg-gray-100 transition">View Profile</button>
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;