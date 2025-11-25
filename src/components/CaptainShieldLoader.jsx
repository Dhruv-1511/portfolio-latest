import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CaptainShieldLoader = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING");
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

  // Calculate star points for a proper 5-pointed star
  const getStarPoints = (centerX, centerY, outerRadius, innerRadius) => {
    const points = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
    }
    return points.join(" ");
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-marvel-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-marvel-black to-gray-900" />

      {/* Comic Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-5 bg-comic-pattern bg-[length:20px_20px]" />

      {/* Shield Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12">
        <div className="relative h-80 w-80">
          {/* Outer Glow - Pulsing */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 40px rgba(236, 29, 36, 0.3), 0 0 80px rgba(236, 29, 36, 0.2), inset 0 0 40px rgba(236, 29, 36, 0.1)",
                "0 0 60px rgba(236, 29, 36, 0.5), 0 0 120px rgba(236, 29, 36, 0.3), inset 0 0 60px rgba(236, 29, 36, 0.15)",
                "0 0 40px rgba(236, 29, 36, 0.3), 0 0 80px rgba(236, 29, 36, 0.2), inset 0 0 40px rgba(236, 29, 36, 0.1)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Progress Ring - Outer */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx="50%"
              cy="50%"
              r="49%"
              fill="none"
              stroke="rgba(32, 75, 155, 0.3)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="49%"
              fill="none"
              stroke="#204B9B"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 160}`}
              initial={{ strokeDashoffset: `${2 * Math.PI * 160}` }}
              animate={{
                strokeDashoffset: `${2 * Math.PI * 160 * (1 - progress / 100)}`,
              }}
              transition={{ ease: "linear" }}
              style={{
                filter: "drop-shadow(0 0 8px rgba(32, 75, 155, 0.8))",
              }}
            />
          </motion.svg>

          {/* Shield SVG - Realistic Design */}
          <motion.div
            className="relative w-full h-full"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))" }}
            >
              <defs>
                {/* Gradients for realistic depth */}
                <radialGradient id="redOuterGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#FF4444" stopOpacity="1" />
                  <stop offset="70%" stopColor="#EC1D24" stopOpacity="1" />
                  <stop offset="100%" stopColor="#B71C1C" stopOpacity="1" />
                </radialGradient>

                <radialGradient id="whiteRingGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#E0E0E0" stopOpacity="1" />
                </radialGradient>

                <radialGradient id="redCenterGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#FF4444" stopOpacity="1" />
                  <stop offset="100%" stopColor="#EC1D24" stopOpacity="1" />
                </radialGradient>

                <radialGradient id="blueStarGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#3B6BC4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#204B9B" stopOpacity="1" />
                </radialGradient>

                {/* Shadow filter */}
                <filter id="shadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="2" dy="2" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Highlight shine */}
                <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>
              </defs>

              {/* Outer Red Ring with depth */}
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="url(#redOuterGradient)"
                stroke="#8B0000"
                strokeWidth="1.5"
                filter="url(#shadow)"
              />

              {/* Inner shadow for depth */}
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="rgba(0, 0, 0, 0.3)"
                strokeWidth="2"
                strokeDasharray="5, 5"
                opacity="0.3"
              />

              {/* White Ring with proper proportions */}
              <circle
                cx="100"
                cy="100"
                r="76"
                fill="url(#whiteRingGradient)"
                stroke="#C0C0C0"
                strokeWidth="1"
              />

              {/* White ring highlight */}
              <ellipse
                cx="100"
                cy="85"
                rx="76"
                ry="15"
                fill="url(#shine)"
                opacity="0.6"
              />

              {/* Red Center Circle */}
              <circle
                cx="100"
                cy="100"
                r="56"
                fill="url(#redCenterGradient)"
                stroke="#8B0000"
                strokeWidth="1"
              />

              {/* Blue Star Background Circle */}
              <circle cx="100" cy="100" r="40" fill="url(#blueStarGradient)" />

              {/* Proper 5-pointed Star */}
              <motion.path
                d={getStarPoints(100, 100, 35, 14)}
                fill="#FFFFFF"
                stroke="#E0E0E0"
                strokeWidth="0.5"
                animate={{
                  opacity: [1, 0.95, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Star highlight */}
              <ellipse
                cx="100"
                cy="90"
                rx="20"
                ry="8"
                fill="rgba(255, 255, 255, 0.3)"
                opacity="0.8"
              />

              {/* Metallic rim highlight */}
              <motion.ellipse
                cx="100"
                cy="60"
                rx="95"
                ry="25"
                fill="rgba(255, 255, 255, 0.15)"
                animate={{
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Additional depth shadows */}
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="rgba(0, 0, 0, 0.2)"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>

            {/* Rotating shine effect */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.15) 20%, transparent 40%, transparent 100%)",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Energy particles */}
          {[...Array(12)].map((_, idx) => (
            <motion.div
              key={idx}
              className="absolute h-1.5 w-1.5 rounded-full bg-blue-400"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                x: [
                  0,
                  Math.cos((idx * 30 * Math.PI) / 180) * 140,
                  Math.cos((idx * 30 * Math.PI) / 180) * 140,
                ],
                y: [
                  0,
                  Math.sin((idx * 30 * Math.PI) / 180) * 140,
                  Math.sin((idx * 30 * Math.PI) / 180) * 140,
                ],
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: idx * 0.15,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Ripple effects */}
          {/* {[1, 2, 3].map((idx) => (
            <motion.div
              key={idx}
              className="absolute inset-0 rounded-full border-2 border-blue-400 pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{
                scale: [1, 1.3 + idx * 0.2, 1.5 + idx * 0.3],
                opacity: [0.4, 0.2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.4,
                ease: "easeOut",
              }}
            />
          ))} */}
        </div>

        {/* Text Area */}
        <div className="flex flex-col items-center gap-6">
          <motion.h2
            className="font-marvel text-4xl tracking-widest text-white drop-shadow-[0_0_15px_rgba(236,29,36,0.8)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {text}
          </motion.h2>

          {/* Marvel Style Progress Bar */}
          <div className="relative h-3 w-80 bg-gray-900 skew-x-[-20deg] border-2 border-gray-700 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-marvel-red via-red-600 to-marvel-red shadow-[0_0_20px_#EC1D24]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>

          <div className="flex justify-between w-80 text-sm font-mono text-marvel-silver">
            <span className="tracking-wider">SYS.SECURE</span>
            <span className="font-bold text-white">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaptainShieldLoader;
