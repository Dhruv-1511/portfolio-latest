import { motion } from "framer-motion";
import { FaFigma, FaGithub, FaReact } from "react-icons/fa";
import { SiFramer, SiJavascript, SiTailwindcss } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import PrimaryButton from "../components/PrimaryButton";
import ParallaxShapes from "../components/ParallaxShapes";
import ProfileCard from "../components/ProfileCard";
import ScrambledText from "../components/ScrambledText";
import { heroCtas, personal } from "../data/content";

const floatingIcons = [
  { icon: <FaReact />, color: "text-cyan-400", delay: 0 },
  { icon: <RiNextjsFill />, color: "text-white", delay: 0.1 },
  { icon: <SiTailwindcss />, color: "text-yellow", delay: 0.3 },
  { icon: <SiFramer />, color: "text-purple-300", delay: 0.5 },
  { icon: <SiJavascript />, color: "text-yellow-400", delay: 0.7 },
  { icon: <FaGithub />, color: "text-slate-100", delay: 0.9 },
];

const Hero = () => {
  const greeting = `Hi, I'm ${personal.name}`;

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <ParallaxShapes />

      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[length:48px_48px] opacity-10" />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1.1fr,0.9fr] md:py-32">
        <div className="relative flex flex-col gap-10">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-brand-300"
          >
            Frontend Developer
          </motion.span>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              <ScrambledText
                text={greeting}
                duration={2000}
                className="whitespace-pre-wrap"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="max-w-xl text-base text-slate-300 sm:text-lg"
            >
              {personal.summary}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="text-lg font-medium text-brand-200 md:text-xl"
            >
              {personal.role}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="flex flex-wrap items-center gap-4"
          >
            {heroCtas.map((cta) => (
              <PrimaryButton key={cta.label} {...cta} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="flex flex-wrap gap-6"
          >
            {personal.highlights.map((highlight) => (
              <motion.div
                key={highlight.label}
                className="glass-card rounded-2xl px-6 py-5 shadow-lg shadow-indigo-900/20"
                whileHover={{ y: -6 }}
              >
                <p className="text-sm uppercase tracking-[0.45em] text-slate-400">
                  {highlight.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {highlight.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <ProfileCard
            name={personal.name}
            title={personal.role}
            handle="DhruvSheladiya"
            status="Online"
            contactText="Contact Me"
            avatarUrl={personal.photo}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={handleContactClick}
          />

          <div className="pointer-events-none absolute inset-0">
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                className={`absolute flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-2xl ${item.color}`}
                style={{
                  top: `${1 + index * 15}%`,
                  right: index % 2 === 0 ? "-12%" : "auto",
                  left: index % 2 !== 0 ? "-12%" : "auto",
                }}
                initial={{ y: 0 }}
                animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
                transition={{
                  delay: item.delay,
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
