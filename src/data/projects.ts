export interface Project {
  id: string;
  title: string;
  homeTitle: string;
  shortDescription: string;
  caseStudySummary: string;
  tech: string[];
  status: "LIVE" | "ENTERPRISE" | "AGENCY";
  github?: string;
  githubLabel?: string;
  results: string[];
}

export const projects: Project[] = [
  {
    id: "immobile-search",
    title: "ImmoScout24 Austria",
    homeTitle: "ImmoScout24 Austria",
    shortDescription:
      "Search and listing work inside a tested distributed real-estate platform.",
    caseStudySummary:
      "Shipped search/listing, SEO, and Iterable integration work inside a fully tested distributed platform where release quality and production safety mattered.",
    tech: ["React", "Node.js", "AWS", "MongoDB"],
    status: "LIVE",
    github: "https://github.com/calindotgabriel/immobile-search",
    githubLabel: "Demo repo",
    results: [
      "Contributed to improved SEO performance",
      "Supported engagement gains in listing flows",
      "Iterable integration shipped",
    ],
  },
  {
    id: "rwe-energy",
    title: "RWE Energy Platform",
    homeTitle: "RWE Energy Platform",
    shortDescription:
      "Migration work from a Java monolith toward NestJS services for energy-market data.",
    caseStudySummary:
      "Reduced delivery risk in a Java-to-NestJS migration, profiled MongoDB-heavy data flows, and moved export processing into worker pools.",
    tech: ["NestJS", "MongoDB", "Docker", "TypeScript"],
    status: "ENTERPRISE",
    github: "https://github.com/calindotgabriel/energy-reporter",
    githubLabel: "Demo repo",
    results: [
      "65% faster APIs",
      "Exports: 45min to 12min",
      "TDD introduced early",
    ],
  },
  {
    id: "endava",
    title: "Endava Enterprise Clients",
    homeTitle: "Endava - Deutsche Telekom, NETS, eLife Sciences",
    shortDescription:
      "Full-stack JavaScript delivery across telecom, payments, and academic publishing.",
    caseStudySummary:
      "Rotated across enterprise domains, shipping React and Node.js systems for payments, telecom, and publishing clients with fast ramp-up and clear delivery habits.",
    tech: ["React", "AWS", "TypeScript"],
    status: "AGENCY",
    results: [
      "2K+ papers processed daily",
      "Payments checkout work",
      "2 junior developers mentored",
    ],
  },
];
