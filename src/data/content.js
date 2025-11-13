import myImg from "../assets/myImg.jpg";
import coinCapImage from "../assets/coin-cap.svg";
import coinCapLogo from "../assets/coin-cap-logo.png";
import porterImage from "../assets/porter.svg";
import porterLogo from "../assets/porter-logo.svg";
import skillzapImage from "../assets/skillzap.svg";
import skillzapLogo from "../assets/skillzap-logo.png";
import slashstarLogo from "../assets/slashstar.png";
import madviseLogo from "../assets/madvise.png";

export const personal = {
  name: "Dhruv Sheladiya",
  role: "Frontend Developer — React.js Specialist",
  photo: myImg,
  summary:
    "I am a passionate frontend developer specializing in React.js, crafting snappy interfaces, immersive user journeys, and animation-rich experiences with modern tooling.",
  highlights: [
    { label: "Age", value: "21" },
    { label: "Country", value: "India" },
    { label: "Experience", value: "1.5+ Years" },
  ],
  contact: {
    email: "dhruvsheladiya07@gmail.com",
    phone: "+91 95103 34996",
    location: "Remote & On-site",
  },
};

export const heroCtas = [
  {
    label: "Download CV",
    href: "#",
    variant: "primary",
  },
  {
    label: "Contact Me",
    href: "#contact",
    variant: "secondary",
  },
];

export const education = [
  {
    degree: "BCA",
    institution: "SDJ Interrnational College",
    duration: "2022 – 2025",
    icon: "FaGraduationCap",
    accent: "#6366f1",
    description:
      "Focused on human-centered interface design, performance optimization, and collaborative product delivery.",
  },
  {
    degree: "12th — Commerce",
    institution: "Shree Vashisth Vidyalaya",
    duration: "2021-2022",
    icon: "FaUniversity",
    accent: "#38bdf8",
    description:
      "Graduated with honors in mathematics and computer science with a keen interest in creative coding.",
  },
];

export const skills = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 92 },
  { name: "JavaScript", level: 90 },
  { name: "React js", level: 94 },
  { name: "Next js", level: 94 },
  { name: "Redux", level: 85 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Git", level: 90 },
];

export const experiences = [
  {
    company: "Slashstar",
    role: "Frontend Developer",
    duration: "Feb 2025 – Present",
    logoImage: slashstarLogo,
    accent: "#818cf8",
    location: "Surat, India",
    workMode: "On-site",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React js",
      "Next js",
      "Redux",
      "Tailwind CSS",
      "Git",
    ],
    achievements: [
      "Built immersive marketing sites with Framer Motion and headless CMS stacks.",
      "Lead design-to-code workflow, improving delivery speed by 25%.",
    ],
  },
  {
    company: "Madvise Infotech",
    role: "Frontend Developer",
    duration: "Jan 2024 – Jan 2024",
    logoImage: madviseLogo,
    accent: "#06b6d4",
    location: "Surat, India",
    workMode: "On-site",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React js",
      "Git",
    ],
    achievements: [
      "Developed a responsive and user-friendly website for Madvise Infotech.",
    ],
  },
];

export const projects = [
  {
    title: "Coin Cap",
    description:
      "Real-time crypto asset tracker featuring interactive charts, curated watchlists, and responsive dashboards.",
    stack: ["React", "Tailwind", "Framer Motion"],
    github: "#",
    demo: "#",
    image: coinCapImage,
    logo: coinCapLogo,
  },
  {
    title: "Porter",
    description:
      "Logistics and delivery platform with intelligent routing, driver insights, and sleek mobile-first interfaces.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    github: "#",
    demo: "#",
    image: porterImage,
    logo: porterLogo,
  },
  {
    title: "Skillzap",
    description:
      "Learning management hub enabling adaptive lessons, team leaderboards, and gamified certifications.",
    stack: ["Next.js", "Framer Motion", "GSAP"],
    github: "#",
    demo: "#",
    image: skillzapImage,
    logo: skillzapLogo,
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/", handle: "@johndoe" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhruv-sheladiya-a350582a6", handle: "@john-doe" },
  { label: "Twitter", href: "https://twitter.com/", handle: "@john_doe" },
  { label: "Dribbble", href: "https://dribbble.com/", handle: "@john-doe" },
];
