// src/app/dashboard/page.tsx
"use client";
import React, {useState} from "react";
import SwipeableCard from "@/components/SwiperCard";
import TinderCard from "react-tinder-card";
import logo from "@/assets/logo.png";
import check from "@/assets/check.svg";
import cross from "@/assets/cross.svg";
import Image from "next/image";

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
    <div className="flex flex-col items-center px-8 py-8 h-screen">
      <div className="flex justify-between items-top inline-flex mb-4 w-full">
        <span className="text-2xl font-bold">Titel der Survey</span>
        <Image src={logo} className="w-32" alt=""></Image>
        {/* später die Anzahl der Spieler anzeigen lassen */}
        <div>
          <p>Player</p>
          <div className="flex justify-between gap-1">
            <div className="bg-red-500 rounded-full border-2 border-white w-8 h-8 flex justify-center items-center">
              KH
            </div>
            <div className="bg-blue-500 border-2 border-white rounded-full w-8 h-8 flex justify-center items-center">
              RG
            </div>
          </div>
        </div>
      </div>

      <div className="font-bold">1 of 4</div>
      <div className="flex items-center gap-16">
        <div className="bg-red-500 rounded-full w-20 h-20 flex border-4 border-white justify-center items-center transform transition-transform duration-300 hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="43"
            viewBox="0 0 42 43"
            fill="none"
          >
            <path
              d="M3 3.34131L39 39.3413"
              stroke="white"
              stroke-width="7.74194"
            />
            <path
              d="M3 39.3413L39 3.34131"
              stroke="white"
              stroke-width="7.74194"
            />
          </svg>
        </div>
        <div className="bg-green-500 rounded-full w-20 h-20 flex border-4 border-white justify-center items-center transform transition-transform duration-300 hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="43"
            viewBox="0 0 46 43"
            fill="none"
          >
            <path
              d="M4 22.3448L15.122 36L42 3"
              stroke="white"
              stroke-width="8"
            />
          </svg>
        </div>
      </div>
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
