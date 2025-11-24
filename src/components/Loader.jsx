import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated Logo/Icon */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          {/* Outer Glow Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-indigo-500/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Middle Ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-cyan-500/40"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner Spinning Circle */}
          <motion.div
            className="relative h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-1"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="h-full w-full rounded-full bg-slate-950" />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/50 to-transparent"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Center Dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="h-3 w-3 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-400 shadow-lg shadow-cyan-500/50" />
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-3">
          <motion.h2
            className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Loading Portfolio
          </motion.h2>

          {/* Animated Dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-64 overflow-hidden rounded-full bg-slate-800/50 p-1">
            <motion.div
              className="h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </motion.div>
  );
};

export default Loader;
