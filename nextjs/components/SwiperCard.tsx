import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/web';
import '../styles/swiperCard.css';

interface SwiperCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  metadata?: {
    type?: 'activity' | 'music' | 'misc';
    address?: string;
    distance?: number;
    spotifyUrl?: string;
    spotifyPreviewUrl?: string;
    endTime?: string;
  };
  onSwipe: (direction: 'left' | 'right') => void;
}

const SwiperCard: React.FC<SwiperCardProps> = ({
  title,
  description,
  imageUrl,
  metadata,
  onSwipe,
}) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [{ x, y, rotateZ, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateZ: 0,
    scale: 1,
    config: { tension: 300, friction: 30 },
  }));

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = metadata?.spotifyPreviewUrl
      ? new Audio(metadata.spotifyPreviewUrl)
      : null;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [metadata?.spotifyPreviewUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error('Error playing audio:', err));
    }
    
    setIsPlaying(!isPlaying);
  };

  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      const trigger = vx > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      
      if (!down && trigger) {
        const direction = dir === 1 ? 'right' : 'left';
        setSwipeDirection(direction);
        
        api.start({
          x: dir * 500,
          rotateZ: dir * 50,
          config: { tension: 200, friction: 30 },
          onRest: () => {
            onSwipe(direction);
          },
        });
      } else {
        // Apply rotation and movement when dragging
        const rotation = mx / 100;
        const scale = down ? 1.05 : 1;
        
        api.start({ 
          x: down ? mx : 0, 
          rotateZ: down ? rotation : 0,
          scale,
          config: { tension: 300, friction: 30 } 
        });
        
        // Visualize swipe direction
        if (down && Math.abs(mx) > 50) {
          setSwipeDirection(mx > 0 ? 'right' : 'left');
        } else if (!down) {
          setSwipeDirection(null);
        }
      }
    },
    { from: () => [x.get(), 0] }
  );

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    const dir = direction === 'right' ? 1 : -1;
    
    api.start({
      x: dir * 500,
      rotateZ: dir * 50,
      config: { tension: 200, friction: 30 },
      onRest: () => {
        onSwipe(direction);
      },
    });
  };

  const openMap = () => {
    if (metadata?.address) {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(metadata.address)}`;
      window.open(mapUrl, '_blank');
    }
  };

  const openSpotify = () => {
    if (metadata?.spotifyUrl) {
      window.open(metadata.spotifyUrl, '_blank');
    }
  };
  
  const getTypeIcon = () => {
    if (!metadata?.type) return null;
    
    switch (metadata.type) {
      case 'activity':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        );
      case 'music':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
        );
    }
  };

  return (
    <div className="swipe-container">
      <animated.div
        ref={cardRef}
        className="swipe-card"
        {...bind()}
        style={{ x, y, rotateZ, scale, touchAction: 'none' }}
      >
        <div className={`swipe-indicator swipe-like ${swipeDirection === 'right' ? 'opacity-100' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>

        <div className={`swipe-indicator swipe-nope ${swipeDirection === 'left' ? 'opacity-100' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="card-content">
          <div className="card-header">
            <h2 className="text-xl font-bold flex items-center">
              {getTypeIcon()}
              <span className="ml-2">{title}</span>
            </h2>
            {metadata?.endTime && (
              <div className="text-sm text-[var(--text-secondary)]">
                Endet am {new Date(metadata.endTime).toLocaleDateString()}
              </div>
            )}
          </div>

          {imageUrl && (
            <div className="card-image-container">
              <img src={imageUrl} alt={title} className="card-image" />
            </div>
          )}

          <div className="card-body">
            {description && <p className="card-description">{description}</p>}

            {metadata?.type === 'activity' && metadata.address && (
              <div className="mt-4 p-4 bg-[var(--background-secondary)] rounded-lg">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 text-[var(--primary-color)]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-2">
                    <p className="text-sm text-[var(--text-secondary)]">Adresse</p>
                    <p className="text-[var(--text-primary)]">{metadata.address}</p>
                  </div>
                </div>
                
                {metadata.distance !== undefined && (
                  <div className="mt-2 text-[var(--text-secondary)] text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                    </svg>
                    {metadata.distance} km entfernt
                  </div>
                )}
                
                <button 
                  onClick={openMap} 
                  className="mt-3 w-full py-2 px-3 bg-[var(--primary-color)] text-white text-sm rounded-lg hover:bg-[var(--accent-color-2)] transition flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                  </svg>
                  In Google Maps öffnen
                </button>
              </div>
            )}

            {metadata?.type === 'music' && metadata.spotifyUrl && (
              <div className="mt-4 p-4 bg-[var(--background-secondary)] rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1DB954]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-[var(--text-primary)]">Spotify Track</span>
                  </div>
                  
                  {metadata.spotifyPreviewUrl && (
                    <button 
                      onClick={togglePlay} 
                      className="btn btn-icon bg-[#1DB954] hover:bg-[#1ed760] text-white shadow-lg"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                
                <button 
                  onClick={openSpotify} 
                  className="mt-3 w-full py-2 px-3 bg-[#1DB954] text-white text-sm rounded-lg hover:bg-[#1ed760] transition flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  In Spotify öffnen
                </button>
              </div>
            )}
          </div>
          
        </div>
      </animated.div>

      <div className="swipe-buttons-container">
        <button 
          className="swipe-button swipe-button-no"
          onClick={() => handleButtonSwipe('left')}
          aria-label="Decline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <button 
          className="swipe-button swipe-button-yes"
          onClick={() => handleButtonSwipe('right')}
          aria-label="Accept"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SwiperCard;