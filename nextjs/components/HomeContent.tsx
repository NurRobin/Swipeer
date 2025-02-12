import React from 'react';
import HomeHeader from './HomeHeader';
import SurveyFeed from './SurveyFeed';
import GroupSidebar from './GroupSidebar';

const HomeContent: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <HomeHeader />
      <div className="mt-4 flex">
        <div className="w-1/4 sticky top-0">
          <GroupSidebar />
        </div>
        <div className="w-3/4 mx-auto overflow-y-auto h-screen">
          <SurveyFeed />
        </div>
      </div>
    </div>
  );
};

export default HomeContent;