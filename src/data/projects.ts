export type Project = {
  id: string;
  slug: string;

  title: string;
  category: string;
  year: string;

  role: string;

  description: string;

  image: string;

  technologies: string[];

  href?: string;

  overview?: string;

  challenge?: string;

  approach?: string;

  result?: string;

  gallery?: string[];
};

export const projects: Project[] = [
  {
    id: "project-01",

    slug: "zeroclicker",

    title: "ZeroClicker",

    category: "DESKTOP / LINUX",

    year: "2026",

    role: "DESIGN & DEVELOPMENT",

    description:
      "A modern auto clicker application designed specifically for Linux.",

    image:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop",

    technologies: ["C++", "Qt", "Wayland", "CMake"],

    href: "#",

    overview:
      "ZeroClicker is a native Linux automation tool focused on providing a simple and modern experience for repetitive mouse actions.",

    challenge:
      "The goal was to create an auto clicker that feels native to the Linux desktop while avoiding unnecessary dependencies and keeping the interface simple.",

    approach:
      "The application was designed around a lightweight native architecture with a modern Qt interface and careful attention to interaction, responsiveness, and usability.",

    result:
      "The result is a focused desktop utility with a clean interface and a workflow designed to get users from launch to action quickly.",

    gallery: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    id: "project-02",

    slug: "voltify",

    title: "Voltify",

    category: "WEB APPLICATION",

    year: "2026",

    role: "DEVELOPMENT",

    description:
      "A modern web application focused on delivering a clean digital experience.",

    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",

    technologies: ["Next.js", "React", "TypeScript"],

    href: "#",

    overview:
      "Voltify is a web project focused on creating a modern and responsive digital experience.",

    challenge:
      "The project required a clean interface that could scale across different screen sizes while maintaining a consistent visual language.",

    approach:
      "The interface was built using reusable components and a structured frontend architecture.",

    result:
      "The final product provides a responsive interface with a clear information hierarchy and reusable design system.",

    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];
