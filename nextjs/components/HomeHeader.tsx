import React from 'react';
import Link from 'next/link';

const HomeHeader: React.FC = () => {
  return (
    <header className="bg-[var(--background-primary)] bg-opacity-60 backdrop-blur-xl p-5 md:p-7 rounded-xl mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mx-2">
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo / Überschrift */}
        <div className="flex items-center justify-center mb-4 md:mb-0">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] mb-0">
            Swipeer
          </h1>
        </div>
        
        {/* Navigation / Buttons */}
        <div className="flex flex-wrap justify-center md:justify-end gap-3 items-center">
          <Link href="/group/create">
            <button className="btn btn-primary flex items-center gap-2">
              {/* Icon und Text */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Gruppe erstellen
            </button>
          </Link>
          
          <Link href="/survey/create">
            <button className="btn btn-secondary flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              Umfrage erstellen
            </button>
          </Link>
          
          <Link href="/dashboard">
            <button className="btn btn-outline flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Profil
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
