export interface ResumeDraftExperience {
  company: string;
  location: string;
  role: string;
  period: string;
  start: string;
  end: string;
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
  title: "Senior Backend Engineer · Node.js / TypeScript",
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
    "Backend engineer with more than 10 years in software, mostly working with Node.js and TypeScript. My recent work includes digital-asset custody, high-volume energy data, real-estate search, and payment flows. I enjoy joining established teams, understanding how their systems really behave, and improving them without disrupting delivery.",
  onePageSummary:
    "Backend engineer with more than 10 years in software, mostly with Node.js and TypeScript. I have worked on digital-asset custody, energy data, real-estate search, and payments. I am at my best when I can understand an existing system, improve the difficult parts, and leave the code easier to work with.",

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
        "Worked on backend services for an institutional digital-asset custody platform used by banks. The stack included Fastify, GraphQL, TypeScript, and AWS serverless services.",
        "Took ownership of the crypto address-book backend, from customer-address management to validation and production delivery.",
        "Improved service authentication and introduced a practical backend testing approach that the team continued to use.",
      ],
      onePageHighlights: [
        "Worked on backend services for a digital-asset custody platform used by banks, using Fastify, GraphQL, TypeScript, and AWS.",
        "Owned the crypto address-book backend, including customer-address validation, service authentication, testing, and production delivery.",
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
        "Worked in the search and listing area of a large real-estate platform, shipping changes across React and Node.js.",
        "Integrated Iterable and delivered product changes where SEO and release quality both mattered.",
        "Contributed inside a mature AWS and MongoDB environment with strong testing and review practices.",
      ],
      onePageHighlights: [
        "Shipped search, listing, and SEO-related improvements across React and Node.js in a large real-estate platform.",
        "Integrated Iterable and worked in an AWS and MongoDB environment with strong testing and review practices.",
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
        "Helped move parts of an energy-market data platform from Java to tested NestJS services.",
        "Profiled MongoDB queries used more than 15,000 times a day and reduced API response times by 65%.",
        "Added E2E coverage and moved CPU-heavy exports into Node.js worker pools. Export time dropped from 45 to 12 minutes without blocking regular API work.",
      ],
      onePageHighlights: [
        "Helped move Java services to NestJS and added E2E coverage for an energy-market data platform.",
        "After profiling the data flow, improved API response times by 65% and cut exports from 45 to 12 minutes using worker pools.",
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
      compactSummary:
        "Built a Node.js, S3, and Lambda pipeline handling 2,000+ scientific papers a day, then worked on React and TypeScript payment flows.",
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
      items: ["Node.js", "TypeScript", "Fastify", "NestJS", "GraphQL", "REST APIs", "distributed systems"],
    },
    {
      category: "Frontend",
      items: ["React", "Redux", "Tailwind", "SEO-sensitive UI delivery"],
    },
    {
      category: "Cloud & data",
      items: ["AWS", "Lambda", "serverless", "MongoDB", "PostgreSQL", "Redis", "Docker"],
    },
    {
      category: "Quality & performance",
      items: ["Integration testing", "E2E testing", "TDD", "API profiling", "Worker Pools", "CI/CD"],
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
    "Long-term B2B contract · Remote from Romania · EU citizen · Available immediately",
  ],
};
