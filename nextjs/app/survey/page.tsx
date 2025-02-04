// src/app/dashboard/page.tsx
'use client';
import React, {useState} from 'react';
import "../../styles/surveyScreen.css"
import "../../styles/swiperCard.css"
import SwipeableCard from "@/components/SwiperCard";

const Survey: React.FC = () => {
    const [cards,] = useState(["Karte 1", "Karte 2", "Karte 3", "Karte 4"]);
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
