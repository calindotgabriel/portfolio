import { resumeDraft } from "./resumeDraft";

export const runtimeDossierTitle =
  "Senior Backend Engineer · Node.js / TypeScript | Calin Gabriel";

export const runtimeDossierDescription =
  "Calin Gabriel is a senior backend engineer based in Romania, with more than 10 years in software and recent experience in digital-asset custody, energy data, real-estate search, and payments.";

export const runtimeDossierPersonJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resumeDraft.name,
  url: resumeDraft.website,
  email: `mailto:${resumeDraft.email}`,
  telephone: resumeDraft.phone,
  jobTitle: resumeDraft.title,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cluj-Napoca",
    addressCountry: "RO",
  },
  sameAs: [resumeDraft.linkedin, resumeDraft.github],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Babeș-Bolyai University",
  },
  knowsAbout: [
    "Node.js",
    "TypeScript",
    "Fastify",
    "NestJS",
    "GraphQL",
    "REST APIs",
    "Microservices",
    "AWS serverless",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Integration testing",
    "E2E testing",
    "Performance profiling",
    "Worker Pools",
    "React",
  ],
};
