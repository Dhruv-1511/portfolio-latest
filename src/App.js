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
import CaptainShieldLoader from "./components/CaptainShieldLoader";
import ParticlesBackground from "./components/ParticlesBackground";
import { useContentfulData } from "./context/ContentfulContext";

const App = () => {
  const { loading: isLoading } = useContentfulData();
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <CaptainShieldLoader
            key="loader"
            isLoading={isLoading}
            onComplete={handleLoaderComplete}
          />
        )}
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
