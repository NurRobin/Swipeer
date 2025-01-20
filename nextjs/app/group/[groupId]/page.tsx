// src/app/group/[groupId]/page.tsx
import React from 'react';
import SwiperCard from '../../../components/SwiperCard';

const GroupPage: React.FC = () => {
  // Replace with actual data fetching logic
  const cardsData = [
    { id: '1', title: 'Option 1', description: 'Description 1' },
    { id: '2', title: 'Option 2', description: 'Description 2' },
  ];

  const handleSwipe = async (direction: string, cardId: string) => {
    // Replace 'groupId' with actual group ID
    await fetch('/api/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupId: 'groupId', cardId, vote: direction }),
    });
  };

  return (
    <div>
      {cardsData.map((card) => (
        <SwiperCard key={card.id} data={card} onSwipe={handleSwipe} />
      ))}
    </div>
  );
};

export default GroupPage;
