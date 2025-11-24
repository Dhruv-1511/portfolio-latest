import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Loader from "./components/Loader";
import ParticlesBackground from "./components/ParticlesBackground";
import { useContentfulData } from "./context/ContentfulContext";

const App = () => {
  const { loading: isLoading } = useContentfulData();
  const [showLoader, setShowLoader] = useState(true);
  const [minLoadTimeElapsed, setMinLoadTimeElapsed] = useState(false);

  // Track minimum loading time (3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadTimeElapsed(true);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only hide loader when both conditions are met:
    // 1. Data is loaded (!isLoading)
    // 2. Minimum 3 seconds have passed
    if (!isLoading && minLoadTimeElapsed) {
      // Add a small delay for smooth transition
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, minLoadTimeElapsed]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && <Loader key="loader" />}
      </AnimatePresence>

      {!showLoader && (
        <div className="relative min-h-screen bg-transparent text-slate-100">
          <ParticlesBackground />
          <Navbar />
          <main className="flex flex-col gap-24 pt-24">
            <Hero />
            <About />
            <Education />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
