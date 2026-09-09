export interface ResumeDraftExperience {
  company: string;
  location: string;
  role: string;
  period: string;
  start: string;
  end: string;
  countsTowardProfessionalExperience: boolean;
  highlights: string[];
  onePageHighlights?: string[];
  compactSummary?: string;
}

export interface ResumeDraftProof {
  value: string;
  label: string;
}

export interface ResumeDraftSkillGroup {
  category: string;
  items: string[];
}

export interface ResumeDraftData {
  name: string;
  title: string;
  location: string;
  locationDetail: string;
  email: string;
  phone: string;
  website: string;
  websiteDisplay: string;
  linkedin: string;
  linkedinDisplay: string;
  github: string;
  githubDisplay: string;
  summary: string;
  onePageSummary: string;
  proofs: ResumeDraftProof[];
  experience: ResumeDraftExperience[];
  skills: ResumeDraftSkillGroup[];
  onePageSkills: ResumeDraftSkillGroup[];
  education: {
    degree: string;
    institution: string;
    period: string;
    location: string;
  }[];
  languages: { language: string; level: string }[];
  availability: string[];
}

export const resumeDraft: ResumeDraftData = {
  name: "Calin Gabriel",
  title: "Senior Backend Developer · Node.js / TypeScript",
  location: "Cluj-Napoca, Romania",
  locationDetail: "Romania · Remote EU",
  email: "contact@calingabriel.com",
  phone: "+40 759 407 066",
  website: "https://calingabriel.com",
  websiteDisplay: "calingabriel.com",
  linkedin: "https://www.linkedin.com/in/calingabriel-ts-dev/",
  linkedinDisplay: "linkedin.com/in/calingabriel-ts-dev",
  github: "https://github.com/calindotgabriel",
  githubDisplay: "github.com/calindotgabriel",

  summary:
    "Backend developer with around 7 years of commercial Node.js and over 5 years of TypeScript, mostly on regulated or data-heavy products. Most recently at Bitpanda, on the digital-asset custody platform built for banks, where I owned the crypto address book, built and expanded service authentication, designed APIs, and added test coverage. Earlier work covers React and Node.js product delivery at ImmoScout24 and Endava, third-party integrations including Iterable and payments, a Java-to-NestJS migration at RWE, and performance work on high-volume services.",
  onePageSummary:
    "Backend developer with around 7 years of Node.js and over 5 years of TypeScript, mostly on regulated or data-heavy products. At Bitpanda I owned the crypto address book on a bank-facing custody platform, built and expanded service authentication, designed APIs, and added test coverage. Earlier: React and Node product delivery, Iterable and payments integrations, a Java-to-NestJS migration, and performance work on high-volume services.",

  proofs: [
    { value: "65%", label: "API response improvement" },
    { value: "45→12m", label: "RWE export pipeline" },
  ],

  experience: [
    {
      company: "Bitpanda",
      location: "AT",
      role: "Senior Backend Developer",
      period: "Sep 2025 - Jun 2026",
      start: "2025-09",
      end: "2026-06",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Built backend services for a digital-asset custody platform used by banks, with Fastify, GraphQL, TypeScript, and AWS serverless.",
        "Owned the crypto address book from API and data-model design through validation, tests, and production delivery.",
        "Built and expanded service-to-service authentication across the platform.",
        "Designed APIs and added backend test coverage for the services I worked on.",
      ],
      onePageHighlights: [
        "Owned the crypto address book for a bank-facing digital-asset custody platform: API and data-model design, validation, integrations, tests, and AWS production delivery.",
        "Built and expanded service-to-service authentication and added backend test coverage, using Fastify, GraphQL, TypeScript, and AWS serverless.",
      ],
    },
    {
      company: "ImmoScout24",
      location: "AT",
      role: "Full Stack Developer",
      period: "Aug 2024 - Jun 2025",
      start: "2024-08",
      end: "2025-06",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Integrated the Iterable marketing-automation platform into React, Node.js, and TypeScript product flows, mapping platform data onto Iterable's event model to power targeted lifecycle-messaging campaigns, within SEO, test-coverage, and release constraints.",
        "Shipped search, listing, and SEO improvements across React and Node.js in a mature AWS and MongoDB real-estate platform.",
        "Matched the platform's review and production-safety standards while contributing inside an established distributed system.",
      ],
      onePageHighlights: [
        "Integrated Iterable marketing automation with Node.js for lifecycle messaging, within release and production-safety constraints.",
        "Shipped search, listing, and SEO improvements across a mature AWS and MongoDB platform with unit, integration, and E2E coverage.",
      ],
    },
    {
      company: "RWE",
      location: "DE",
      role: "Full Stack Developer",
      period: "Sep 2022 - Jul 2024",
      start: "2022-09",
      end: "2024-07",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Migrated legacy Java components incrementally to tested NestJS microservices for an energy-market data platform.",
        "Added integration and E2E coverage to protect behavior and reduce regression risk while replacing legacy paths.",
        "Profiled MongoDB aggregations handling 15,000+ daily queries and reduced API response times by 65%.",
        "Moved CPU-heavy exports into Node.js Worker Pools, cutting runtime from 45 to 12 minutes while keeping normal API work responsive.",
      ],
      onePageHighlights: [
        "Migrated legacy Java components incrementally to NestJS microservices, adding integration and E2E coverage to reduce regression risk.",
        "Profiled MongoDB flows serving 15,000+ daily queries, improved API responses by 65%, and cut exports from 45 to 12 minutes with Worker Pools.",
      ],
    },
    {
      company: "Freelance",
      location: "RO",
      role: "Contract projects",
      period: "Aug 2021 - Aug 2022",
      start: "2021-08",
      end: "2022-08",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Short freelance client projects, typically two to five months each, between long-term roles.",
      ],
      compactSummary:
        "Short freelance client projects, typically two to five months each, between long-term roles.",
    },
    {
      company: "Endava",
      location: "RO",
      role: "Full Stack Developer",
      period: "Sep 2019 - Jul 2021",
      start: "2019-09",
      end: "2021-07",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Built a Node.js, AWS S3, and Lambda document pipeline processing 2,000+ scientific papers daily.",
        "Delivered React submission and tracking flows for large document collections and collaborative workflows.",
        "Mentored two junior developers and shipped TypeScript checkout support for Klarna and card payments.",
      ],
      compactSummary:
        "Shipped TypeScript checkout support for Klarna and card payments; built a Node.js, S3, and Lambda pipeline processing 2,000+ documents daily.",
    },
    {
      company: "WIP Romania",
      location: "RO",
      role: "Full Stack Developer",
      period: "Jul 2018 - Sep 2019",
      start: "2018-07",
      end: "2019-09",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Built a MeteorJS and React mobile wallet with deposits, withdrawals, balance updates, and transaction history.",
        "Used WebSockets and reliable client state to keep concurrent account activity responsive during peak usage.",
      ],
      compactSummary:
        "Built a MeteorJS and React wallet covering deposits, withdrawals, balances, and reliable real-time transaction updates over WebSockets.",
    },
    {
      company: "DeverSoft",
      location: "RO",
      role: "Web Developer",
      period: "Oct 2013 - Mar 2015",
      start: "2013-10",
      end: "2015-03",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Developed a restaurant-management frontend with JavaScript, Java integration, and real-time WebSocket updates.",
        "Improved everyday order, table, kitchen, and service workflows for restaurant staff.",
      ],
      compactSummary:
        "Developed JavaScript and Java features for restaurant staff, with WebSocket updates for orders, tables, and kitchen workflows.",
    },
  ],

  skills: [
    {
      category: "Backend",
      items: [
        "Node.js",
        "TypeScript",
        "Fastify",
        "NestJS",
        "GraphQL",
        "REST APIs",
        "microservices",
        "distributed systems",
        "event-driven systems",
        "async workflows",
      ],
    },
    {
      category: "Frontend",
      items: ["React", "Redux", "TypeScript UI", "SEO-sensitive delivery"],
    },
    {
      category: "Data",
      items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "query profiling"],
    },
    {
      category: "Cloud",
      items: ["AWS", "Lambda", "serverless", "Azure", "Docker", "CI/CD", "GitHub Actions"],
    },
    {
      category: "Quality",
      items: [
        "Integration testing",
        "E2E testing",
        "TDD",
        "code review",
        "production safety",
        "migration regression safety",
      ],
    },
    {
      category: "Performance",
      items: ["Node profiling", "API profiling", "Worker Threads", "Worker Pools", "export pipelines", "API latency"],
    },
    {
      category: "Product integrations",
      items: [
        "Iterable",
        "marketing automation",
        "third-party integrations",
        "payment and checkout flows",
      ],
    },
    {
      category: "Domain",
      items: ["Digital-asset custody", "Crypto-address management", "Crypto-address validation"],
    },
  ],

  onePageSkills: [
    {
      category: "Backend",
      items: [
        "Node.js",
        "TypeScript",
        "Fastify",
        "NestJS",
        "GraphQL",
        "REST APIs",
        "microservices",
        "event-driven systems",
      ],
    },
    {
      category: "Frontend",
      items: ["React", "Redux", "TypeScript UI", "SEO-sensitive delivery"],
    },
    {
      category: "Data & cloud",
      items: [
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "query profiling",
        "Worker Pools",
        "AWS",
        "Lambda",
        "Docker",
        "CI/CD",
      ],
    },
    {
      category: "Quality & domain",
      items: [
        "integration testing",
        "E2E testing",
        "service authentication",
        "third-party integrations",
        "payments",
        "digital-asset custody",
      ],
    },
  ],

  education: [
    {
      degree: "BS in Computer Science",
      institution: "Babeș-Bolyai University",
      period: "2014 - 2018",
      location: "Cluj-Napoca, Romania",
    },
  ],

  languages: [
    { language: "Romanian", level: "Native" },
    { language: "English", level: "C1 fluent" },
  ],

  availability: [
    "Permanent / long-term B2B · Remote EU / Cluj hybrid · EU citizen · Available immediately",
  ],
};
