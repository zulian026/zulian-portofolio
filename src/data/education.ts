export type Education = {
  id: string;

  institution: string;

  degree: string;

  field: string;

  startYear: string;

  endYear: string;

  description?: string;
};

export const education: Education[] = [
  {
    id: "education-01",

    institution: "University Name",

    degree: "Bachelor",

    field: "Informatics Engineering",

    startYear: "2022",

    endYear: "2026",

    description:
      "Focused on software engineering, web development, and computer science.",
  },
];
