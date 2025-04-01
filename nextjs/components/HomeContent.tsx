import React from 'react';
import HomeHeader from './HomeHeader';
import SurveyFeed from './SurveyFeed';
import GroupSidebar from './GroupSidebar';

const HomeContent: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <HomeHeader />
      
      <div className="mt-8 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Aktuelle Umfragen</h2>
          <div className="bg-[var(--background-primary)] bg-opacity-70 backdrop-blur-lg rounded-lg overflow-hidden">
            <SurveyFeed />
          </div>
        </div>
        
        <div className="lg:w-1/4 mt-6 lg:mt-0">
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Deine Gruppen</h2>
          <div className="bg-[var(--background-primary)] bg-opacity-70 backdrop-blur-lg rounded-lg overflow-hidden">
            <GroupSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;