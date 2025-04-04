"use client";
import logo from "@/assets/logo.png";
import Image from "next/image";

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useGetSurvey } from "@/app/survey/[survey_id]/hooks/useGetSurvey";
import { usePostVote } from "@/app/survey/[survey_id]/hooks/usePostVote";

interface TinderCardProps {
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}

const TinderCard: React.FC<TinderCardProps> = ( ) => {
  const controls = useAnimation();
  const [initialPosition] = useState({ x: 0, y: 0 });
  const { data } = useGetSurvey();

  // Neuer state für den aktuellen Index und das Popup
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Objekt in Array konvertieren
  const optionsArray = data?.options ? Object.values(data.options) : [];

  const postVote = usePostVote();

  const vote = (swipeRight: boolean) => {
    const keys = Object.keys(data?.options ?? {});

    console.log(data?.options);
    console.log(optionsArray);
    if (!data) return;
    if (optionsArray.length === 0) return;
    const optionKey = keys[currentIndex]
    postVote.mutate({
      options_id: optionKey,           // Options-ID des aktuellen Options-Objekts
      pro: swipeRight,                        // pro wird anhand der Swipe-Richtung übergeben
    });
  };

  // Hilfsfunktion, die nach jedem Swipe aufgerufen wird
  const handleSwipeComplete = () => {
    setCurrentIndex((prev) => {
      if (prev === optionsArray.length - 1) {
        // Letzte Karte: Popup anzeigen und Weiterleitung initiieren
        setShowPopup(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        return prev + 1;
      } else {
        return prev + 1;
      }
    });
  };

  const handleDrag = async (event: MouseEvent | TouchEvent, info: any) => {
    const xOffset = info.offset.x;
    if (xOffset > 150) {
      await controls.start({ x: "100vw", transition: { duration: 0.5 } });
    } else if (xOffset < -150) {
      await controls.start({ x: "-100vw", transition: { duration: 0.5 } });
    }
  };

  const moveCard = async (swipeRight: boolean) => {
    vote(swipeRight); // Vote auslösen
    if (swipeRight) {
      await controls.start({ x: "100vw", transition: { duration: 0.5 } });
    } else {
      await controls.start({ x: "-100vw", transition: { duration: 0.5 } });
    }
    controls.set(initialPosition);
    if (optionsArray.length > 0) {
      handleSwipeComplete();
    }
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent, info: any) => {
    const xOffset = info.offset.x;
    const threshold = 150;

    if (xOffset > threshold) {
      await controls.start({ x: "100vw", transition: { duration: 0.5 } });
      controls.set(initialPosition);
      handleSwipeComplete();
      vote(true);
    } else if (xOffset < -threshold) {
      await controls.start({ x: "-100vw", transition: { duration: 0.5 } });
      controls.set(initialPosition);
      handleSwipeComplete();
      vote(false);
    } else {
      await controls.start(initialPosition);
    }
  };

  return (
      <div className="flex flex-col items-center px-8 py-8 h-screen overflow-hidden">
        <div className="flex justify-between items-top inline-flex mb-4 w-full">
          <span className="text-2xl font-bold">{data?.title ?? "Lädt"}</span>
          <Image src={logo} className="w-32" alt="Logo" />
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

        {currentIndex < optionsArray.length && (
            <div className="relative w-screen h-screen flex justify-center items-center">
              <motion.div
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                  animate={controls}
                  initial={initialPosition}
                  className="w-72 h-96 bg-white rounded-2xl text-black shadow-lg flex justify-center items-center text-2xl font-bold z-50 p-4 text-center"
              >
                {optionsArray.length > 0
                    ? optionsArray[currentIndex].question
                    : "Lädt..."}
              </motion.div>
            </div>
        )}

        <div className="font-bold">
          {currentIndex + 1} of {optionsArray.length}
        </div>
        <div className="flex items-center gap-16">
          <div
              onClick={() => moveCard(false)}
              className="bg-red-500 rounded-full w-20 h-20 flex border-4 border-white justify-center items-center transform transition-transform duration-300 hover:scale-110"
          >
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
          <div
              onClick={() => moveCard(true)}
              className="bg-green-500 rounded-full w-20 h-20 flex border-4 border-white justify-center items-center transform transition-transform duration-300 hover:scale-110"
          >
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

        {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[var(--background-primary)] p-6 rounded-lg text-center">
                <p className="mb-4">Du hast über alles abgestimmt!</p>
                <p>Du wirst in Kürze zum Homescreen weitergeleitet.</p>
              </div>
            </div>
        )}
      </div>
  );
};

export default TinderCard;
