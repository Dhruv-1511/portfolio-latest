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
        animate={{ rotate: [0, 4, -3, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-6 rounded-[2.5rem] border border-brand-500/20 bg-white/[0.04] backdrop-blur-xl"
      />

      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950/92 via-slate-900/60 to-slate-900/40 shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {avatarUrl ? (
            <motion.img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
              <span className="text-4xl font-semibold text-white">
                {name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </span>
            </div>
          )}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-indigo-500/25 via-transparent to-sky-400/25"
            animate={{ opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {showUserInfo && (
          <div
            className="relative p-4"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-white">{name}</h3>
              <p className="mt-1 text-sm text-slate-300">{title}</p>
              {handle && (
                <p className="mt-1 text-xs uppercase tracking-[0.4em] text-slate-400">
                  @{handle}
                </p>
              )}
            </div>

            <div className="mb-3 flex items-center gap-2">
              <motion.span
                className={`h-2 w-2 rounded-full ${
                  status === "Online"
                    ? "bg-gradient-to-r from-emerald-400 to-teal-400"
                    : "bg-slate-500"
                } shadow-glow-md`}
                animate={
                  status === "Online"
                    ? { opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                {status}
              </span>
            </div>

            {onContactClick && (
              <motion.button
                onClick={onContactClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-brand-500/20 via-indigo-500/20 to-sky-400/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white transition-all hover:border-brand-500/40 hover:bg-gradient-to-r hover:from-brand-500/25 hover:via-indigo-500/25 hover:to-sky-400/25"
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
