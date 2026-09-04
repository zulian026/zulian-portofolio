export type SkillItem = {
  name: string;
  context: string;
};

export type SkillGroup = {
  number: string;
  title: string;
  items: SkillItem[];
};

export const skillsData: SkillGroup[] = [
  {
    number: "01",
    title: "DEVELOPMENT",
    items: [
      {
        name: "TypeScript",
        context: "WEB / APPLICATIONS",
      },
      {
        name: "React",
        context: "INTERFACES",
      },
      {
        name: "Next.js",
        context: "FULL-STACK",
      },
      {
        name: "Node.js",
        context: "BACKEND / TOOLING",
      },
    ],
  },
  {
    number: "02",
    title: "SYSTEMS",
    items: [
      {
        name: "C++",
        context: "SYSTEMS / DESKTOP",
      },
      {
        name: "Qt",
        context: "DESKTOP UI",
      },
      {
        name: "Linux",
        context: "SYSTEMS / TOOLING",
      },
    ],
  },
  {
    number: "03",
    title: "TOOLING",
    items: [
      {
        name: "CMake",
        context: "BUILD SYSTEM",
      },
      {
        name: "GSAP",
        context: "MOTION",
      },
      {
        name: "Tailwind CSS",
        context: "UI / STYLING",
      },
      {
        name: "PostgreSQL",
        context: "DATABASE",
      },
    ],
  },
];
