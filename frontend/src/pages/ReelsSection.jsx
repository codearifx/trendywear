import React, { useState, useRef, useEffect } from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import ReactPlayer from 'react-player';

const REELS = [
  {
    id: 1,
    videoUrl: 'https://player.vimeo.com/external/498801736.sd.mp4?s=dabe764ec5b8bc00938f4dcdce4f8f41ddcf22ce&profile_id=165&oauth2_token_id=57447761',
    productName: 'Urban Summer Collection',
  },
  {
    id: 2,
    videoUrl: 'https://player.vimeo.com/external/498801397.sd.mp4?s=d51de5cedf51adfc6ec3f13fefed2fc7cc8fe92c&profile_id=165&oauth2_token_id=57447761',
    productName: 'Premium Denim Jacket',
  },
  {
    id: 3,
    videoUrl: 'https://player.vimeo.com/external/498801646.sd.mp4?s=27da64fd6d15b0de0cd1e481ff230fe4b6c3d191&profile_id=165&oauth2_token_id=57447761',
    productName: 'Casual Activewear',
  }
];

const ReelItem = ({ reel }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] snap-start bg-black flex justify-center items-center overflow-hidden">
      <ReactPlayer
        ref={videoRef}
        url={reel.videoUrl}
        className="react-player"
        width="100%"
        height="100%"
        playing={true}
        loop={true}
        muted={isMuted}
        playsinline={true}
        fallback={<div className="w-full h-full flex justify-center items-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      
      {/* Overlay controls - like instagram */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10">
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="bg-black/20 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
            <Heart size={28} fill={isLiked ? '#ff3f6c' : 'none'} color={isLiked ? '#ff3f6c' : 'white'} />
          </div>
        </button>

        <button 
          onClick={toggleMute}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="bg-black/20 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform text-white">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </div>
        </button>
      </div>

      {/* Video bottom info */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="max-w-lg mx-auto">
          <h2 className="text-white font-bold text-xl mb-2">{reel.productName}</h2>
          <p className="text-gray-200 text-sm opacity-90 line-clamp-2">Experience the perfect blend of style and comfort with our latest collection. Tap heart to add to your liked list.</p>
        </div>
      </div>
    </div>
  );
};

const ReelsSection = () => {
  return (
    <div className="bg-black snap-y snap-mandatory h-[calc(100vh-80px)] overflow-y-scroll hide-scrollbar scroll-smooth">
      {REELS.map(reel => (
         <ReelItem key={reel.id} reel={reel} />
      ))}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ReelsSection;
