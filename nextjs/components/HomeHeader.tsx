import React from 'react';
import Link from 'next/link';

const HomeHeader: React.FC = () => {
  return (
    <header className="bg-[var(--primary-color)] text-[var(--secondary-color)] p-4 md:p-6 rounded-lg auto-shadow flex flex-col md:flex-row justify-between items-center">
      <div className="bg-[var(--primary-color)] mb-4 md:mb-0">
        <h1 className="bg-[var(--primary-color)] text-[var(--secondary-color)] text-2xl font-bold -200">Swipeer</h1>
      </div>
      <div className="bg-[var(--primary-color)] flex space-x-4">
        <Link href="/group/create" className='rounded-md auto-shadow hover:bg-gray-100 transition'>
          <button className="bg-white text-[var(--primary-color)] px-4 py-2 rounded-md auto-shadow hover:bg-gray-100 transition">
            + Create Group
          </button>
        </Link>
        <Link href="/survey/create" className='rounded-md auto-shadow hover:bg-gray-100 transition'>
          <button className="bg-white text-[var(--primary-color)] px-4 py-2 rounded-md auto-shadow hover:bg-gray-100 transition">
            + Create Survey
          </button>
        </Link>
        <Link href="/dashboard" className='rounded-md auto-shadow hover:bg-gray-100 transition'>
          <button className="bg-white text-[var(--primary-color)] px-4 py-2 rounded-md auto-shadow hover:bg-gray-100 transition">
            View Profile
          </button>
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
