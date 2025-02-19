import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

// Definieren der Props-Klasse (Interface)
interface SwipeableCardProps {
    content: string; // Der Inhalt der Karte
    onLike: (content: string) => void; // Funktion, die aufgerufen wird, wenn die Karte nach rechts geswiped wird
    onDislike: (content: string) => void; // Funktion, die aufgerufen wird, wenn die Karte nach links geswiped wird
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ content, onLike, onDislike }) => {
    const [gone, setGone] = useState(false); // Überprüft, ob die Karte bereits geswiped wurde
    const [{ x, y, rotation, opacity }, set] = useSpring(() => ({
        x: 0, // Startwert für die X-Position
        y: 0, // Startwert für die Y-Position
        rotation: 0, // Startwert für die Rotation
        opacity: 1, // Startwert für die Opazität
    }));

    const dragThreshold = 350; // Der Schwellenwert, ab dem die Karte als geswiped gilt (nach links oder rechts)

    const bind = useDrag(
        (state) => {


            const { offset: [xOffset, yOffset], movement: [mx], direction: [dir] } = state;

            // Berechnung der Rotation und Position der Karte
            set({
                x: xOffset, // Horizontalbewegung
                y: xOffset < 0 ? xOffset * 0.7 : xOffset * -0.7, // Vertikale Verschiebung (Abwärtsbewegung)
                rotation: mx / 10, // Drehung basierend auf der horizontalen Bewegung (anpassen der Intensität)
                opacity: 1 - clamp((Math.abs(xOffset) - (dragThreshold - 100)) / 100, 0, 1), // Die Karte wird transparenter, je weiter sie geswiped wird
            });

            // Wenn der Swipe weit genug ist, führe eine Funktion aus
            if (Math.abs(xOffset) > dragThreshold) {
                if (dir > 0) {
                    onLike(content); // Wenn nach rechts geswiped, "like"
                } else {
                    onDislike(content); // Wenn nach links geswiped, "dislike"
                }
                setGone(true); // Karte wird als geswiped markiert
            }

        },
        { axis: "x" } // Der Swipe erfolgt nur auf der X-Achse
    );



    return (
        <animated.div
            {...bind()}
            style={{
                x,
                y, // Abwärtsbewegung
                rotate: rotation, // Drehung
                opacity,
                touchAction: "none", // Verhindert ungewollte Scrollbewegungen auf Touch-Geräten
            }}
            className="card"
        >
            <div className="absolute w-72 h-96 bg-red-500 text-black rounded-2xl shadow-lg flex justify-center items-center text-2xl cursor-pointer select-none">{content}</div>
        </animated.div>
    );
};

export default SwipeableCard;


function clamp(value: number, min: number, max: number) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}