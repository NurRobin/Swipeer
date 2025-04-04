// src/app/dashboard/page.tsx

/*
"use client";
import SwipeableCard from "@/components/SwiperCard";
import logo from "@/assets/logo.png";
import check from "@/assets/check.svg";
import cross from "@/assets/cross.svg";
import Image from "next/image";

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface TinderCardProps {
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}

const TinderCard: React.FC<TinderCardProps> = ({ onSwipeRight, onSwipeLeft }) => {
  const controls = useAnimation();
  const [initialPosition] = useState({ x: 0, y: 0 });

  const handleDrag = async (event: MouseEvent | TouchEvent, info: any) => {
    const xOffset = info.offset.x;

    // If drag distance in x exceeds 150, fly the card out of the view
    if (xOffset > 150) {
      await controls.start({x: "100vw", transition: {duration: 0.5}});
    } else if (xOffset < -150) {
      await controls.start({x: "-100vw", transition: {duration: 0.5}});
    }
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent, info: any) => {
    const xOffset = info.offset.x;
    const threshold = 150;

    if (xOffset > threshold) {
      // Right Swipe
      await controls.start({x: "100vw", transition: {duration: 0.5}});
      controls.set(initialPosition);
    } else if (xOffset < -threshold) {
      // Left Swipe
      await controls.start({x: "-100vw", transition: {duration: 0.5}});
      controls.set(initialPosition);
    }else{
      await controls.start(initialPosition);
    }
  };

  return (
    <div className="flex flex-col items-center px-8 py-8 h-screen overflow-hidden">
      <div className="flex justify-between items-top inline-flex mb-4 w-full">
        <span className="text-2xl font-bold">Titel der Survey</span>
        <Image src={logo} className="w-32" alt=""></Image>
        
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
      <div className="relative w-screen h-screen flex justify-center items-center">
        <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={initialPosition}
            className="w-72 h-96 bg-white rounded-2xl text-black shadow-lg flex justify-center items-center text-2xl font-bold z-50"
        >
          Swipe Me!
        </motion.div>
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
              strokeWidth="7.74194"
            />
            <path
              d="M3 39.3413L39 3.34131"
              stroke="white"
              strokeWidth="7.74194"
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
              strokeWidth="8"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TinderCard;


 */