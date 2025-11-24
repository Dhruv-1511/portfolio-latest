import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

import ParticlesBackground from "./components/ParticlesBackground";

const App = () => (
  <div className="relative min-h-screen bg-transparent text-slate-100">
    <ParticlesBackground />
    {/* <div className="pointer-events-none fixed inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent md:block" /> */}
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
);

export default App;
