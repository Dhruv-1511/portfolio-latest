import { useState, useRef, useEffect } from "react";
import { FaMusic, FaPause, FaPlay } from "react-icons/fa";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio and attempt autoplay
  useEffect(() => {
    if (audioRef.current) {
      // Set volume to 30%
      audioRef.current.volume = 0.3;

      // Try to play immediately (may be blocked by browser)
      const attemptAutoplay = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // Autoplay was prevented - will try on user interaction
          console.log("Autoplay prevented, waiting for user interaction");
        }
      };

      // Try autoplay when audio is loaded
      audioRef.current.addEventListener("loadeddata", attemptAutoplay);
      attemptAutoplay();

      // Also try on first user interaction (most reliable)
      const handleFirstInteraction = async () => {
        if (audioRef.current) {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (error) {
            console.error("Error playing audio:", error);
          }
        }
      };

      // Listen for first user interaction
      document.addEventListener("click", handleFirstInteraction, {
        once: true,
      });
      document.addEventListener("keydown", handleFirstInteraction, {
        once: true,
      });
      document.addEventListener("touchstart", handleFirstInteraction, {
        once: true,
      });

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("loadeddata", attemptAutoplay);
        }
        document.removeEventListener("click", handleFirstInteraction);
        document.removeEventListener("keydown", handleFirstInteraction);
        document.removeEventListener("touchstart", handleFirstInteraction);
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        loop
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/bg-music.mp3" type="audio/mpeg" />
        <source src="/bg-music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={togglePlay}
        className="bg-red-900/80 hover:bg-red-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
      </button>

      <button
        onClick={toggleMute}
        className="bg-red-900/80 hover:bg-red-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        <FaMusic size={16} className={isMuted ? "opacity-50" : ""} />
      </button>
    </div>
  );
};

export default BackgroundMusic;
