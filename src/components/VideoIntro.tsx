import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoIntro = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl bg-[var(--primary-900)]">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
        muted={isMuted}
        loop
        playsInline
      >
        <source
          src="https://player.vimeo.com/progressive_redirect/playback/824804236/rendition/1080p/file.mp4?loc=external&signature=7bdb89b1b7a8e2e96f52c9e2b2918c2d9f3e6a2e6f4e2b7c8d9f2e6a2e6f4e2b"
          type="video/mp4"
        />
        Votre navigateur ne prend pas en charge la lecture vidéo.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 z-10">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Trouvez la voiture de vos rêves au meilleur prix
        </h3>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Notre intelligence artificielle analyse en temps réel des milliers d'offres pour vous faire économiser jusqu'à 40% sur votre prochain véhicule
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between z-20">
        <button
          onClick={togglePlay}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all transform hover:scale-105"
          aria-label={isPlaying ? 'Pause' : 'Lecture'}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={toggleMute}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all transform hover:scale-105"
          aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
    </div>
  );
};

export default VideoIntro;