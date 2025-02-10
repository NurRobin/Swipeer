// src/app/dashboard/page.tsx
"use client";
import React, {useState} from "react";
import SwipeableCard from "@/components/SwiperCard";
import TinderCard from "react-tinder-card";

const Survey: React.FC = () => {
  const [cards, setCards] = useState([
    "Karte 1",
    "Karte 2",
    "Karte 3",
    "Karte 4",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0); // Zeigt den Index der aktuellen Karte an

  const handleLike = (content: string) => {
    console.log(`Liked: ${content}`);
    moveToNextCard(); // Nach dem "Like" zur nächsten Karte wechseln
  };

  const handleDislike = (content: string) => {
    console.log(`Disliked: ${content}`);
    moveToNextCard(); // Nach dem "Dislike" zur nächsten Karte wechseln
  };

  const moveToNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1); // Wechsle zur nächsten Karte
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <TinderCard
        className="absolute w-72 h-96 bg-white text-black rounded-2xl shadow-lg flex justify-center items-center text-2xl cursor-pointer select-none"
        onSwipe={handleLike}
        onCardLeftScreen={() => handleDislike("fooBar")}
        preventSwipe={["right", "left"]}
      >
        <p>{cards[currentIndex]}</p>
      </TinderCard>
    </div>
  );

  return (
    <div className="card-container">
      {cards[currentIndex] && (
        <SwipeableCard
          content={cards[currentIndex]}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      )}
    </div>
  );
};

export default Survey;
