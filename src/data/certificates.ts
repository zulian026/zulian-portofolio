export type Certificate = {
  id: string;

  title: string;

  issuer: string;

  year: string;

  image: string;

  credentialUrl?: string;
};

export const certificates: Certificate[] = [
  {
    id: "certificate-01",

    title: "Certificate Name",

    issuer: "Organization",

    year: "2026",

    image: "/certificates/certificate-01.webp",

    credentialUrl: "#",
  },

  {
    id: "certificate-02",

    title: "Certificate Name",

    issuer: "Organization",

    year: "2025",

    image: "/certificates/certificate-02.webp",

    credentialUrl: "#",
  },

  {
    id: "certificate-03",

    title: "Certificate Name",

    issuer: "Organization",

    year: "2025",

    image: "/certificates/certificate-03.webp",

    credentialUrl: "#",
  },
];
