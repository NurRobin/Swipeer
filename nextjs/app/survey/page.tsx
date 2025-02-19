'use client'

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface TinderCardProps {
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}

const TinderCard: React.FC<TinderCardProps> = ({ onSwipeRight, onSwipeLeft }) => {
  const controls = useAnimation();
  const [initialPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (event: MouseEvent | TouchEvent, info: any) => {
    const xOffset = info.offset.x;

    // If drag distance in x exceeds 150, fly the card out of the view
    if (xOffset > 150) {
      controls.start({ x: "100vw", transition: { duration: 0.5 } });
    } else if (xOffset < -150) {
      controls.start({ x: "-100vw", transition: { duration: 0.5 } });
    }
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent, info: any) => {
    const xOffset = info.offset.x;
    const threshold = 150;

    if (xOffset > threshold) {
      controls.start({ x: "100vw", transition: { duration: 0.5 } });
    } else if (xOffset < -threshold) {
      controls.start({ x: "-100vw", transition: { duration: 0.5 } });
    } else {
      // Return card to the center if drag is below the threshold
      await controls.start(initialPosition);
    }
  };

  return (
      <div className="relative w-screen h-screen flex justify-center items-center">
        <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={initialPosition}
            className="w-72 h-96 bg-white rounded-2xl shadow-lg flex justify-center items-center text-2xl font-bold z-50"
        >
          Swipe Me!
        </motion.div>
      </div>
  );
};

export default TinderCard;
