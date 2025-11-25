import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiMail } from "react-icons/fi";

const ProfileCard = ({
  name,
  title,
  handle,
  status = "Online",
  contactText = "Contact Me",
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
}) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7.5, -7.5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7.5, 7.5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (event) => {
    if (!cardRef.current || (!enableTilt && !enableMobileTilt)) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const normalizedX = mouseX / (rect.width / 2);
    const normalizedY = mouseY / (rect.height / 2);
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        enableTilt || enableMobileTilt
          ? {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : {}
      }
      className="relative mx-auto max-w-sm"
    >
      <motion.div
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-4 border-2 border-marvel-blue/30 bg-marvel-blue/5"
        style={{
          clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)",
        }}
      />

      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col overflow-hidden border-2 border-marvel-blue bg-gray-900 shadow-[0_0_30px_rgba(0,120,242,0.2)]"
        style={{
          transformStyle: "preserve-3d",
          clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)",
        }}
      >
        {/* S.H.I.E.L.D. Header */}
        <div className="bg-marvel-blue px-4 py-2 flex justify-between items-center">
          <span className="text-xs font-bold text-white tracking-widest">
            S.H.I.E.L.D. ID
          </span>
          <span className="text-xs font-mono text-white/80">LVL. 7</span>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-marvel-blue">
          {avatarUrl ? (
            <motion.img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-800">
              <span className="text-4xl font-semibold text-white">
                {name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </span>
            </div>
          )}

          {/* Holographic Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-marvel-blue/50 to-transparent opacity-40 pointer-events-none" />

          {/* Scan Line */}
          <motion.div
            className="absolute inset-0 h-1 bg-marvel-blue/50 shadow-[0_0_10px_#0078F2]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {showUserInfo && (
          <div
            className="relative p-6 bg-gray-900"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white font-oswald uppercase tracking-wide">
                {name}
              </h3>
              <p className="mt-1 text-sm text-marvel-blue font-mono uppercase">
                {title}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-400">
                CODENAME: @DHRUV_15_11
              </p>
            </div>

            <div className="mb-4 flex items-center gap-2 border-t border-gray-700 pt-2">
              <motion.span
                className={`h-2 w-2 rounded-full ${
                  status === "Online" ? "bg-green-500" : "bg-red-500"
                } shadow-[0_0_10px_currentColor]`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-xs uppercase tracking-[0.2em] text-gray-300 font-bold">
                STATUS: {status === "Online" ? "ACTIVE" : "OFFLINE"}
              </span>
            </div>

            {onContactClick && (
              <motion.button
                onClick={onContactClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 bg-marvel-blue/20 border border-marvel-blue text-marvel-blue px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-marvel-blue hover:text-white clip-path-slant"
              >
                <FiMail size={14} />
                {contactText}
              </motion.button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
