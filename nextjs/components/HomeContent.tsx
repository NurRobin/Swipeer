import React from 'react';
import HomeHeader from './HomeHeader';
import SurveyFeed from './SurveyFeed';
import GroupSidebar from './GroupSidebar';

const HomeContent: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <HomeHeader />
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <div className="md:w-3/4">
          <SurveyFeed />
        </div>
        <div className="md:w-1/4">
          <GroupSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomeContent;