import { useEffect, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const logoControls = useAnimation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [0, 24]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setActive(id);
    setMenuOpen(false);
  };

  const navVariants = useMemo(
    () => ({
      hidden: { y: -60, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 120, damping: 20 },
      },
    }),
    []
  );

  return (
    <>
      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 z-50 w-full"
        style={{
          backgroundColor: scrolled ? "rgba(21, 21, 21, 0.95)" : "transparent",
          backdropFilter: scrolled ? `blur(${headerBlur}px)` : "none",
          borderBottom: scrolled ? "1px solid #EC1D24" : "none",
        }}
      >
        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 origin-left z-50"
          style={{
            scaleX,
            background: "#EC1D24",
            boxShadow: "0 0 10px #EC1D24",
          }}
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.a
            href=""
            className="group relative flex items-center gap-4 text-lg font-semibold tracking-tight text-white"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLinkClick("home")}
            onHoverStart={() => {
              logoControls.start({
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              });
            }}
          >
            {/* Marvel Style Logo */}
            <motion.div className="relative" animate={logoControls}>
              {/* Outer Glow */}
              <motion.div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-brand-500 via-indigo-500 to-sky-400 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-40" />

              {/* Logo Container */}
              <motion.span
                className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:border-brand-500/50 group-hover:bg-gradient-to-br group-hover:from-brand-500/20 group-hover:via-indigo-500/15 group-hover:to-sky-400/20"
                style={{
                  boxShadow:
                    "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Animated Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "linear",
                  }}
                />

                {/* Inner Glow on Hover */}
                <motion.div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/40 via-indigo-500/30 to-sky-400/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Logo Image */}
                <img
                  src="/logo192.png"
                  alt="Logo"
                  className="relative z-10 h-9 w-9 object-contain drop-shadow-lg"
                />
              </motion.span>
            </motion.div>

            {/* Text Content */}
            <div className="flex flex-col leading-none">
              <motion.span className="text-xs font-bold uppercase tracking-[0.2em] text-marvel-red">
                Portfolio
              </motion.span>
              <motion.span className="text-xl font-oswald font-bold text-white uppercase tracking-wide">
                Dhruv Sheladiya
              </motion.span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, index) => {
              const isActive = active === link.id;
              return (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className="group relative px-4 py-2 text-sm font-bold uppercase tracking-widest font-oswald text-slate-300 hover:text-white transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.label}

                  {/* Active/Hover Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-marvel-red transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="relative flex items-center justify-center p-2 text-white md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <HiX size={28} className="text-marvel-red" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <HiOutlineMenu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-marvel-black border-t-2 border-marvel-red md:hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link, index) => {
                  const isActive = active === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      type="button"
                      className={`text-left text-lg font-bold uppercase tracking-widest font-oswald ${
                        isActive ? "text-marvel-red" : "text-white"
                      }`}
                      onClick={() => handleLinkClick(link.id)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
