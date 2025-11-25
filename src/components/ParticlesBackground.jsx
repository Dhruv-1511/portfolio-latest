import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: "bubble",
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          bubble: {
            distance: 200,
            size: 6,
            duration: 2,
            opacity: 0.8,
            color: "#FFD700", // Gold on hover
          },
        },
      },
      particles: {
        color: {
          value: ["#EC1D24", "#FFD700", "#ffffff"], // Red, Gold, White
        },
        links: {
          color: "#FFD700",
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        move: {
          direction: "top", // Embers rising
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0 -z-20 h-full w-full"
      />
    );
  }

  return <></>;
};

export default ParticlesBackground;
