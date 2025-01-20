// src/components/SwiperCard.tsx
import React, { useState, useEffect } from 'react';

interface SwiperCardProps {
  data: {
    id: string;
    title: string;
    description: string;
    spotifyTrackId?: string;
  };
  onSwipe: (direction: string, cardId: string) => void;
}

const SwiperCard: React.FC<SwiperCardProps> = ({ data, onSwipe }) => {
  const [trackData, setTrackData] = useState<any>(null);

  useEffect(() => {
    if (data.spotifyTrackId) {
      fetch(`/api/spotify?trackId=${data.spotifyTrackId}`)
        .then((res) => res.json())
        .then((data) => setTrackData(data))
        .catch((error) => console.error(error));
    }
  }, [data.spotifyTrackId]);

  return (
    <div className="card">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      {trackData && (
        <div>
          <img src={trackData.album.images[0].url} alt={trackData.name} />
          <audio controls src={trackData.preview_url}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      <div>
        <button onClick={() => onSwipe('left', data.id)}>No</button>
        <button onClick={() => onSwipe('right', data.id)}>Yes</button>
      </div>
    </div>
  );
};

export default SwiperCard;
