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
  title: "Senior Backend Engineer · Node.js / TypeScript · Regulated Fintech",
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
    "Senior backend engineer focused on Node.js and TypeScript systems for regulated fintech and data-heavy products. Most recently, I owned the crypto address-book backend for Bitpanda's bank-facing digital-asset custody platform, from API and data-model design through validation, testing, and production delivery. I work best in established systems where careful migration, profiling, and test coverage make difficult changes safer to ship.",
  onePageSummary:
    "Senior backend engineer focused on Node.js and TypeScript for regulated fintech and data-heavy products. Most recently owned Bitpanda's bank-facing crypto address-book backend from API and data-model design through validation, tests, and production delivery. Strongest general proof: tested migrations and measured performance work in established systems.",

  proofs: [
    { value: "45→12m", label: "RWE export pipeline" },
    { value: "65%", label: "API response improvement" },
    { value: "15k+", label: "Daily energy queries" },
  ],

  experience: [
    {
      company: "Bitpanda",
      location: "AT",
      role: "Senior Backend Developer",
      period: "Sep 2025 — Jun 2026",
      start: "2025-09",
      end: "2026-06",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Built backend services for an institutional digital-asset custody platform used by banks with Fastify, GraphQL, TypeScript, and AWS serverless.",
        "Owned the crypto address-book backend from API and data-model design through validation, tests, and production delivery.",
        "Strengthened service authentication and introduced backend testing patterns adopted by the team.",
      ],
      onePageHighlights: [
        "Owned the crypto address-book backend for a bank-facing digital-asset custody platform, from API and data-model design through validation, tests, and production.",
        "Strengthened service authentication and introduced backend testing patterns adopted by the team, using Fastify, GraphQL, TypeScript, and AWS.",
      ],
    },
    {
      company: "ImmoScout24",
      location: "AT",
      role: "Full Stack Developer",
      period: "Aug 2024 — Jun 2025",
      start: "2024-08",
      end: "2025-06",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Shipped search, listing, and SEO improvements across React and Node.js in a mature real-estate platform.",
        "Integrated Iterable and delivered changes inside an AWS and MongoDB environment with unit, integration, and E2E coverage.",
        "Matched the platform's review and production-safety standards while contributing inside an established distributed system.",
      ],
      onePageHighlights: [
        "Shipped search, listing, and SEO improvements across React and Node.js in a mature AWS and MongoDB real-estate platform.",
        "Integrated Iterable while matching the platform's unit, integration, E2E testing, and review standards.",
      ],
    },
    {
      company: "RWE",
      location: "DE",
      role: "Full Stack Developer",
      period: "Sep 2022 — Jul 2024",
      start: "2022-09",
      end: "2024-07",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Migrated parts of an energy-market data platform from Java to NestJS, adding E2E coverage to reduce replacement risk.",
        "Profiled MongoDB aggregations handling 15,000+ daily queries and reduced API response times by 65%.",
        "Moved CPU-heavy exports into Node.js Worker Pools, cutting runtime from 45 to 12 minutes while keeping normal API work responsive.",
      ],
      onePageHighlights: [
        "Migrated Java services to NestJS and added E2E coverage for an energy-market data platform.",
        "Profiled MongoDB flows serving 15,000+ daily queries, improved API response times by 65%, and cut exports from 45 to 12 minutes with Worker Pools.",
      ],
    },
    {
      company: "Independent",
      location: "RO",
      role: "Projects & Professional Development",
      period: "Aug 2021 — Aug 2022",
      start: "2021-08",
      end: "2022-08",
      countsTowardProfessionalExperience: false,
      highlights: [
        "Worked on independent software projects and professional development before returning to long-term product work at RWE.",
      ],
      compactSummary:
        "Worked on independent software projects and professional development before returning to long-term product work at RWE.",
    },
    {
      company: "Endava",
      location: "RO",
      role: "Full Stack Developer",
      period: "Sep 2019 — Jul 2021",
      start: "2019-09",
      end: "2021-07",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Built a Node.js, AWS S3, and Lambda document pipeline processing 2,000+ scientific papers daily.",
        "Delivered React submission and tracking flows for large document collections and collaborative workflows.",
        "Mentored two junior developers and shipped TypeScript checkout support for Klarna and card payments.",
      ],
      compactSummary:
        "Built a Node.js, S3, and Lambda pipeline processing 2,000+ scientific papers daily; later shipped TypeScript payment flows and mentored two junior developers.",
    },
    {
      company: "WIP Romania",
      location: "RO",
      role: "Full Stack Developer",
      period: "Jul 2018 — Sep 2019",
      start: "2018-07",
      end: "2019-09",
      countsTowardProfessionalExperience: true,
      highlights: [
        "Built a MeteorJS and React mobile wallet with deposits, withdrawals, balance updates, and transaction history.",
        "Used WebSockets and reliable client state to keep concurrent account activity responsive during peak usage.",
      ],
      compactSummary:
        "Built a MeteorJS and React wallet covering deposits, withdrawals, balances, and real-time transaction updates.",
    },
    {
      company: "DeverSoft",
      location: "RO",
      role: "Web Developer",
      period: "Oct 2013 — Mar 2015",
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
      items: ["Node.js", "TypeScript", "Fastify", "NestJS", "GraphQL", "REST APIs", "microservices", "distributed systems"],
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
      items: ["Integration testing", "E2E testing", "TDD", "code review", "production safety"],
    },
    {
      category: "Performance",
      items: ["Node profiling", "API profiling", "Worker Threads", "Worker Pools", "export pipelines", "API latency"],
    },
    {
      category: "Frontend",
      items: ["React", "Redux", "Tailwind", "SEO-sensitive UI delivery"],
    },
    {
      category: "Domain",
      items: ["Digital-asset custody", "Crypto-address management", "Crypto-address validation"],
    },
  ],

  onePageSkills: [
    {
      category: "Backend",
      items: ["Node.js", "TypeScript", "Fastify", "NestJS", "REST APIs", "GraphQL", "microservices", "distributed systems"],
    },
    {
      category: "Data & performance",
      items: ["MongoDB", "PostgreSQL", "Redis", "query profiling", "Worker Threads", "Worker Pools"],
    },
    {
      category: "Cloud & delivery",
      items: ["AWS", "Lambda", "serverless", "Docker", "CI/CD"],
    },
    {
      category: "Quality & domain",
      items: ["Integration testing", "E2E testing", "TDD", "service authentication", "validation", "regulated digital-asset custody", "payments"],
    },
  ],

  education: [
    {
      degree: "BS in Computer Science",
      institution: "Babeș-Bolyai University",
      period: "2017",
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
