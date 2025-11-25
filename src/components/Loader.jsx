import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING JARVIS");
  const fullText = "ASSEMBLING PORTFOLIO";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const target = isLoading ? 90 : 100;
        if (prev >= target) {
          if (target === 100) {
            clearInterval(timer);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800);
            return 100;
          }
          return prev;
        }
        const increment = isLoading ? 0.5 : 5;
        return Math.min(prev + Math.random() * increment, target);
      });
    }, 50);
    return () => clearInterval(timer);
  }, [isLoading, onComplete]);

  // Text glitch effect
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText((prev) =>
        fullText
          .split("")
          .map((letter, index) => {
            if (index < iteration) return fullText[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );
      if (iteration >= fullText.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-marvel-black overflow-hidden"
    >
      {/* Comic Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-comic-pattern bg-[length:20px_20px]" />

      {/* Arc Reactor Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12">
        <div className="relative h-64 w-64">
          {/* Outer Glow Ring - Pulsing */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 60px rgba(0, 120, 242, 0.4), 0 0 100px rgba(0, 120, 242, 0.2), inset 0 0 60px rgba(0, 120, 242, 0.1)",
                "0 0 80px rgba(0, 120, 242, 0.6), 0 0 120px rgba(0, 120, 242, 0.3), inset 0 0 80px rgba(0, 120, 242, 0.15)",
                "0 0 60px rgba(0, 120, 242, 0.4), 0 0 100px rgba(0, 120, 242, 0.2), inset 0 0 60px rgba(0, 120, 242, 0.1)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Outer Ring - Rotating */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-marvel-blue/30 bg-gray-900/50 backdrop-blur-sm"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              boxShadow:
                "0 0 40px rgba(0, 120, 242, 0.5), inset 0 0 40px rgba(0, 120, 242, 0.1)",
            }}
          />

          {/* Middle Ring - Counter Rotating */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-cyan-400/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
            }}
          >
            {/* Energy Nodes on Middle Ring */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => (
              <motion.div
                key={deg}
                className="absolute top-0 left-1/2 h-2 w-2 rounded-full bg-cyan-300"
                style={{
                  transform: `translateX(-50%)`,
                  transformOrigin: "50% 128px",
                }}
                animate={{
                  rotate: deg,
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: idx * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Inner Reactor Core Container */}
          <div className="absolute inset-12 rounded-full border-4 border-gray-800/50 bg-gray-900/80 flex items-center justify-center overflow-hidden backdrop-blur-sm">
            {/* Pulsing Background Glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Rotating Energy Coils */}
            {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((deg, idx) => (
              <motion.div
                key={deg}
                className="absolute h-1/2 w-10"
                style={{
                  transform: `rotate(${deg}deg)`,
                  transformOrigin: "bottom center",
                  top: "0",
                  clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0% 100%)",
                }}
                animate={{
                  rotate: [deg, deg + 360],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0,
                  },
                  opacity: {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="h-full w-full bg-gradient-to-b from-cyan-300 via-blue-400 to-transparent" />
              </motion.div>
            ))}

            {/* Center Core - Main Glow */}
            <motion.div
              className="absolute h-16 w-16 rounded-full bg-white"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
                boxShadow: [
                  "0 0 40px rgba(0, 120, 242, 0.8), 0 0 80px rgba(34, 211, 238, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.5)",
                  "0 0 60px rgba(0, 120, 242, 1), 0 0 100px rgba(34, 211, 238, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.7)",
                  "0 0 40px rgba(0, 120, 242, 0.8), 0 0 80px rgba(34, 211, 238, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.5)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Inner Core Light */}
              <motion.div
                className="absolute inset-2 rounded-full bg-cyan-300"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  boxShadow:
                    "0 0 20px rgba(34, 211, 238, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.5)",
                }}
              />
            </motion.div>

            {/* Energy Wave Rings */}
            {[0, 1, 2].map((idx) => (
              <motion.div
                key={idx}
                className="absolute rounded-full border-2 border-cyan-400/30"
                initial={{ width: "100%", height: "100%", opacity: 0.6 }}
                animate={{
                  width: "100%",
                  height: "100%",
                  opacity: [0.6, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.7,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Floating Particles */}
          {[...Array(12)].map((_, idx) => (
            <motion.div
              key={idx}
              className="absolute h-1 w-1 rounded-full bg-cyan-300"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [
                  0,
                  Math.cos((idx * 30 * Math.PI) / 180) * 80,
                  Math.cos((idx * 30 * Math.PI) / 180) * 80,
                ],
                y: [
                  0,
                  Math.sin((idx * 30 * Math.PI) / 180) * 80,
                  Math.sin((idx * 30 * Math.PI) / 180) * 80,
                ],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Text Area */}
        <div className="flex flex-col items-center gap-4">
          <motion.h2
            className="font-marvel text-3xl tracking-widest text-white drop-shadow-[0_0_10px_rgba(236,29,36,0.8)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {text}
          </motion.h2>

          {/* Marvel Style Progress Bar */}
          <div className="relative h-2 w-64 bg-gray-800 skew-x-[-20deg] border border-gray-700">
            <motion.div
              className="absolute inset-0 bg-marvel-red shadow-[0_0_15px_#EC1D24]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="flex justify-between w-64 text-xs font-mono text-marvel-silver">
            <span>SYS.SECURE</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Custom Styles for Gradient */}
      <style jsx>{`
        @keyframes arcPulse {
          0%,
          100% {
            box-shadow: 0 0 60px rgba(0, 120, 242, 0.4),
              0 0 100px rgba(0, 120, 242, 0.2);
          }
          50% {
            box-shadow: 0 0 80px rgba(0, 120, 242, 0.6),
              0 0 120px rgba(0, 120, 242, 0.3);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Loader;
