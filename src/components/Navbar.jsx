import { useEffect, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
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
          backgroundColor: scrolled ? "rgba(2, 6, 23, 0.85)" : "transparent",
          backdropFilter: scrolled ? `blur(${headerBlur}px)` : "none",
        }}
      >
        {/* Animated Background Gradient */}
        {scrolled && (
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background:
                "linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 0.7) 100%)",
            }}
          />
        )}

        {/* Border with gradient */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: scrolled
              ? "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)"
              : "transparent",
          }}
        />

        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
          style={{
            scaleX,
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #38bdf8)",
            boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)",
          }}
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.a
            href="#home"
            className="group relative flex items-center gap-4 text-lg font-semibold tracking-tight text-white"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLinkClick("home")}
          >
            {/* Logo Container with Enhanced Styling */}
            <motion.div
              className="relative"
              whileHover={{ rotate: [0, -8, 8, -8, 0] }}
              transition={{ duration: 0.6 }}
            >
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
            <div className="flex flex-col leading-tight">
              <motion.span
                className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400 transition-colors group-hover:text-brand-300"
                whileHover={{ x: 2 }}
              >
                Portfolio
              </motion.span>
              <motion.span
                className="text-base font-bold text-white transition-colors group-hover:bg-gradient-to-r group-hover:from-brand-300 group-hover:via-indigo-300 group-hover:to-sky-300 group-hover:bg-clip-text group-hover:text-transparent"
                whileHover={{ x: 2 }}
              >
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
                  className="group relative px-4 py-2.5 text-sm font-medium uppercase tracking-[0.25em]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {/* Active Indicator with glow */}
                  {isActive && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-xl border border-brand-500/40 bg-brand-500/10 backdrop-blur-sm"
                        layoutId="activeNav"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500/20 via-indigo-500/20 to-sky-400/20 blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </>
                  )}

                  {/* Hover Background */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-white/5 opacity-0 transition-opacity"
                    whileHover={{ opacity: 1 }}
                  />

                  {/* Text with gradient on active */}
                  <span
                    className={`relative z-10 block transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-brand-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent"
                        : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>

                  {/* Bottom accent line on hover */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center bg-gradient-to-r from-brand-500 to-sky-400"
                    whileHover={{ width: "60%", x: "-50%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="relative flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition-all hover:border-brand-500/40 hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-brand-500/20"
              animate={menuOpen ? { scale: 1.5, opacity: 0 } : {}}
              transition={{ duration: 0.6 }}
            />

            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2, type: "spring" }}
                >
                  <HiX size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2, type: "spring" }}
                >
                  <HiOutlineMenu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mx-6 mb-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-2xl shadow-2xl md:hidden"
            >
              {/* Menu header gradient */}
              <div className="h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-sky-400" />

              <div className="flex flex-col divide-y divide-white/5">
                {navLinks.map((link, index) => {
                  const isActive = active === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      type="button"
                      className={`relative px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.3em] transition-all ${
                        isActive
                          ? "text-brand-300"
                          : "text-slate-200 hover:text-white"
                      }`}
                      onClick={() => handleLinkClick(link.id)}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, type: "spring" }}
                      whileHover={{
                        x: 6,
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-500 to-sky-400"
                          layoutId="activeMobileNav"
                          initial={false}
                        />
                      )}

                      {/* Number indicator */}
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-500/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="relative z-10 ml-8 block">
                        {link.label}
                      </span>

                      {/* Hover arrow */}
                      <motion.span
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-400 opacity-0 transition-opacity"
                        whileHover={{ opacity: 1, x: -4 }}
                      >
                        →
                      </motion.span>
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
