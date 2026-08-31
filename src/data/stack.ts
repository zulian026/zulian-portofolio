export type StackItem = {
  name: string;
  category: string;
  level?: string;
};

export const stack: StackItem[] = [
  {
    name: "TypeScript",
    category: "LANGUAGE",
    level: "PRIMARY",
  },
  {
    name: "React",
    category: "FRONTEND",
    level: "PRIMARY",
  },
  {
    name: "Next.js",
    category: "FRAMEWORK",
    level: "PRIMARY",
  },
  {
    name: "C++",
    category: "LANGUAGE",
    level: "NATIVE",
  },
  {
    name: "Qt",
    category: "DESKTOP",
    level: "NATIVE",
  },
  {
    name: "Node.js",
    category: "BACKEND",
    level: "RUNTIME",
  },
  {
    name: "GSAP",
    category: "MOTION",
    level: "TOOLS",
  },
  {
    name: "Lenis",
    category: "MOTION",
    level: "TOOLS",
  },
];
