import { resumeDraft } from "./resumeDraft";

export const runtimeDossierTitle =
  "Senior Node.js & TypeScript Engineer in Cluj-Napoca | Calin Gabriel";

export const runtimeDossierDescription =
  "Calin Gabriel is a Senior Node.js and TypeScript engineer in Cluj-Napoca, specializing in backend systems, Fastify, NestJS, GraphQL, AWS, testing, migrations, and performance.";

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
