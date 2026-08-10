import { resumeDraft } from "./resumeDraft";

export const runtimeDossierTitle =
  `${resumeDraft.title} | ${resumeDraft.name}`;

export const runtimeDossierDescription =
  "Calin Gabriel is a Romania-based senior backend engineer focused on Node.js and TypeScript for regulated fintech, Iterable integrations, marketing automation, legacy-to-microservices migrations, and performance-sensitive APIs. Open to permanent roles or long-term B2B contracts across the EU or hybrid in Cluj-Napoca.";

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
    "Legacy modernization",
    "Java-to-NestJS migration",
    "Third-party integrations",
    "Iterable",
    "Marketing automation",
    "Lifecycle messaging",
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
