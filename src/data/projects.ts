export type Project = {
  id: string;

  year: string;

  title: string;

  description: string;

  category: string;

  role: string;

  technologies: string[];

  image: string;

  href?: string;

  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "zero-clicker",

    year: "2026",

    title: "ZeroClicker",

    description:
      "A modern native auto clicker for Linux, designed around performance, simplicity, and a clean desktop experience.",

    category: "DESKTOP",

    role: "PRODUCT / ENGINEERING",

    technologies: ["C++", "Qt", "Linux"],

    image: "/projects/zero-clicker.webp",

    href: "#",

    featured: true,
  },

  {
    id: "voltify",

    year: "2026",

    title: "Voltify",

    description:
      "A modern digital product focused on delivering a clean and thoughtful user experience.",

    category: "WEB",

    role: "FRONTEND",

    technologies: ["Next.js", "TypeScript", "Tailwind"],

    image: "/projects/voltify.webp",

    href: "#",

    featured: true,
  },

  {
    id: "web-analyser",

    year: "2026",

    title: "Web Analyser",

    description:
      "A web analysis tool for inspecting websites and presenting useful technical information in a focused interface.",

    category: "WEB",

    role: "FULL STACK",

    technologies: ["Next.js", "TypeScript", "Node.js"],

    image: "/projects/web-analyser.webp",

    href: "#",

    featured: true,
  },

  {
    id: "portfolio",

    year: "2026",

    title: "Personal Portfolio",

    description:
      "A minimal personal portfolio exploring typography, motion, interaction, and modern web technologies.",

    category: "WEB",

    role: "DESIGN / ENGINEERING",

    technologies: ["Next.js", "TypeScript", "GSAP", "Lenis"],

    image: "/projects/portfolio.webp",

    href: "#",

    featured: true,
  },
];
