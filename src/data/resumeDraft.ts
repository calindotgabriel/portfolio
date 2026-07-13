export interface ResumeDraftExperience {
  company: string;
  location: string;
  role: string;
  period: string;
  start: string;
  end: string;
  highlights: string[];
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
  proofs: ResumeDraftProof[];
  experience: ResumeDraftExperience[];
  skills: ResumeDraftSkillGroup[];
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
  title: "Senior Node.js & TypeScript Engineer",
  location: "Cluj-Napoca, Romania",
  locationDetail: "Cluj-Napoca, Romania · hybrid",
  email: "contact@calingabriel.com",
  phone: "+40 759 407 066",
  website: "https://calingabriel.com",
  websiteDisplay: "calingabriel.com",
  linkedin: "https://www.linkedin.com/in/calingabriel-ts-dev/",
  linkedinDisplay: "linkedin.com/in/calingabriel-ts-dev",
  github: "https://github.com/calindotgabriel",
  githubDisplay: "github.com/calindotgabriel",

  summary:
    "Senior engineer for backend-heavy product systems, based in Cluj-Napoca and open to hybrid permanent or B2B roles. I reduce delivery risk in regulated services, migrations, data-heavy APIs, testing, and performance across fintech, energy, real estate, and publishing.",

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
      highlights: [
        "Built institutional crypto-custody services for banks with Fastify, GraphQL, TypeScript, AWS microservices, and serverless infrastructure.",
        "Owned the crypto address-book backend end to end, including regulated customer-address management and validation.",
        "Strengthened service authentication and introduced backend testing patterns adopted by the team.",
      ],
    },
    {
      company: "ImmoScout24",
      location: "AT",
      role: "Full Stack Developer",
      period: "Aug 2024 — Jun 2025",
      start: "2024-08",
      end: "2025-06",
      highlights: [
        "Shipped search and listing improvements inside a fully tested distributed real-estate platform.",
        "Integrated Iterable marketing automation and delivered SEO-sensitive product changes with platform teams.",
        "Worked across React, Node.js, AWS, and MongoDB while matching mature coverage and review expectations.",
      ],
    },
    {
      company: "RWE",
      location: "DE",
      role: "Full Stack Developer",
      period: "Sep 2022 — Jul 2024",
      start: "2022-09",
      end: "2024-07",
      highlights: [
        "Migrated legacy Java paths toward tested NestJS services for an energy-market data platform.",
        "Optimized MongoDB filtering for 15,000+ daily queries and improved API response times by 65%.",
        "Introduced E2E testing during migration and used Worker Pools to cut exports from 45 to 12 minutes.",
      ],
    },
    {
      company: "Endava",
      location: "RO",
      role: "Full Stack Developer",
      period: "Sep 2019 — Jul 2021",
      start: "2019-09",
      end: "2021-07",
      highlights: [
        "Built a Node.js, AWS S3, and Lambda document pipeline processing 2,000+ scientific papers daily.",
        "Delivered React submission and tracking flows for large document collections and collaborative workflows.",
        "Mentored two junior developers and shipped TypeScript checkout support for Klarna and card payments.",
      ],
    },
    {
      company: "WIP Romania",
      location: "RO",
      role: "Full Stack Developer",
      period: "Jul 2018 — Sep 2019",
      start: "2018-07",
      end: "2019-09",
      highlights: [
        "Built a MeteorJS and React mobile wallet with deposits, withdrawals, balance updates, and transaction history.",
        "Used WebSockets and reliable client state to keep concurrent account activity responsive during peak usage.",
      ],
    },
    {
      company: "DeverSoft",
      location: "RO",
      role: "Web Developer",
      period: "Oct 2013 — Mar 2015",
      start: "2013-10",
      end: "2015-03",
      highlights: [
        "Developed a restaurant-management frontend with JavaScript, Java integration, and real-time WebSocket updates.",
        "Improved everyday order, table, kitchen, and service workflows for restaurant staff.",
      ],
    },
  ],

  skills: [
    {
      category: "Backend",
      items: ["Node.js", "TypeScript", "Fastify", "NestJS", "GraphQL", "REST APIs", "microservices"],
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
      items: ["Node profiling", "Worker Threads", "Worker Pools", "export pipelines", "API latency"],
    },
    {
      category: "Frontend",
      items: ["React", "Redux", "Tailwind", "SEO-sensitive UI delivery"],
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
    "Cluj-Napoca hybrid",
    "Permanent or long-term B2B",
    "Available immediately",
    "EU citizen · Europe/Bucharest",
  ],
};
