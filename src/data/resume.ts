export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Language {
  language: string;
  level: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  website: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string[];
  availability: string[];
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  languages: Language[];
}

export const resume: ResumeData = {
  name: "Calin Gabriel",
  title: "Senior Full Stack Developer",
  email: "contact@calingabriel.com",
  website: "https://calingabriel.com",
  phone: "+40 759 407 066",
  linkedin: "https://www.linkedin.com/in/calingabriel-ts-dev/",
  github: "https://github.com/calindotgabriel",

  summary: [
    "Senior full-stack developer with 15 years in software and 9+ years of professional delivery across payments, real estate, energy, and publishing systems.",
    "Backend-heavy React and Node.js experience, with measured work on API performance, exports, testing discipline, integrations, and production stability.",
  ],

  availability: [
    "Senior Full Stack Developer",
    "Remote EU",
    "Available: Immediate",
    "EU Citizen",
    "Fluent English (C1)",
  ],

  experience: [
    {
      company: "ImmoScout24",
      location: "AT",
      role: "Full Stack Developer",
      period: "Aug 2024 - Jun 2025",
      highlights: [
        "Contributed to search and listing flows for one of Austria's leading real-estate platforms, working inside a fully tested distributed system",
        "Integrated Iterable marketing automation and supported SEO-focused changes in collaboration with product and platform teams",
        "Worked across React, Node.js, AWS, and MongoDB services while matching Scout24's test coverage and review expectations",
        "Contributed to platform stability and user-facing improvements during active product delivery",
      ],
    },
    {
      company: "RWE",
      location: "DE",
      role: "Full Stack Developer",
      period: "Sep 2022 - Jul 2024",
      highlights: [
        "Helped migrate legacy Java components toward NestJS services for an energy-market data platform, improving maintainability for a small delivery team",
        "Built and optimized MongoDB-backed data filtering for 15,000+ daily energy market queries",
        "Introduced e2e testing practices early in the migration so replacement work could be shipped with confidence",
        "Implemented parallel processing with Worker Pools for large dataset operations, reducing data export time from 45 minutes to 12 minutes",
        "Improved API response times by 65% through microservices architecture, enabling faster energy trading operations and better user experience",
        "Collaborated with 4-person development team and provided technical guidance on Node.js architecture decisions",
      ],
    },
    {
      company: "Endava",
      location: "RO",
      role: "Full Stack Developer",
      period: "Sep 2019 - Jul 2021",
      highlights: [
        "Built document conversion system using Node.js, AWS S3, and Lambda, processing 2,000+ scientific papers daily for academic research platform",
        "Developed React frontend for paper submission and tracking, with optimized rendering to handle large document collections and collaborative workflows",
        "Mentored 2 junior developers in React best practices and Node.js architecture, helping them integrate successfully into the development team",
        "Created e-commerce checkout system using React and TypeScript, supporting multiple payment methods including Klarna and traditional cards",
      ],
    },
    {
      company: "WIP Romania",
      location: "RO",
      role: "Full Stack Developer",
      period: "Jul 2018 - Sep 2019",
      highlights: [
        "Developed mobile wallet application for e-commerce platform using MeteorJS and React, enabling customers to manage account funds and make payments",
        "Built real-time balance updates and transaction history using WebSocket connections, providing instant feedback on account activity",
        "Created deposit and withdrawal interfaces with custom React components, streamlining the fund management process for users",
        "Implemented efficient state management for concurrent transactions, maintaining system stability during peak usage periods",
      ],
    },
    {
      company: "DeverSoft",
      location: "RO",
      role: "Web Developer",
      period: "Oct 2013 - Mar 2015",
      highlights: [
        "Developed restaurant management frontend using JavaScript and Java backend integration, supporting order tracking and table management",
        "Created user-friendly interface that reduced staff onboarding time and improved daily restaurant operations",
        "Implemented WebSocket connections for real-time updates between kitchen and service staff, improving communication workflow",
      ],
    },
  ],

  education: [
    {
      institution: "Babes Bolyai University",
      degree: "BS in Computer Science",
      period: "2017",
      location: "Cluj-Napoca, Romania",
    },
  ],

  skills: [
    {
      category: "Frontend",
      items: ["React", "Redux", "Tailwind"],
    },
    {
      category: "Backend",
      items: ["Node.js", "NestJS", "Hapi.js"],
    },
    {
      category: "Databases",
      items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
    },
    {
      category: "Cloud & DevOps",
      items: ["Azure", "AWS", "CI/CD"],
    },
  ],

  languages: [
    { language: "Romanian", level: "Native" },
    { language: "English", level: "C1 — Fluent" },
  ],
};
