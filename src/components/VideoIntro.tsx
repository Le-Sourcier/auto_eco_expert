import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useScrollTo } from "../hooks/useScrollTo";
import { t } from "i18next";

const VideoIntro = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTo = useScrollTo();

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

  const handleLearnMore = () => {
    scrollTo("comment-ca-marche");
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
        {t("intro.BROWSER_NO_VIDEO_SUPPORT")}
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 z-10">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
          {t("intro.SAVE_UP_TO_40_PERCENT")}
        </h3>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl animate-fade-in-delay">
          {t("intro.AI_ANALYSIS_TEXT")}
        </p>
        <button
          onClick={handleLearnMore}
          className="bg-[var(--secondary-500)] text-[var(--primary-800)] px-8 py-3 rounded-full font-medium hover:bg-[var(--secondary-600)] transition-all transform hover:scale-105 animate-fade-in-delay-2 group"
        >
          {t("intro.LEARN_HOW_IT_WORKS")}
          <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">
            →
          </span>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between z-20">
        <button
          onClick={togglePlay}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all transform hover:scale-105"
          aria-label={isPlaying ? "Pause" : "Lecture"}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={toggleMute}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all transform hover:scale-105"
          aria-label={isMuted ? "Activer le son" : "Couper le son"}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
    </div>
  );
};

export default VideoIntro;
