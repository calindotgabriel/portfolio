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
  title: "Full Stack Web Developer",
  email: "contact@calingabriel.com",
  website: "https://calingabriel.com",
  phone: "+40 759 407 066",
  linkedin: "https://www.linkedin.com/in/calingabriel-ts-dev/",
  github: "https://github.com/calindotgabriel",

  summary: [
    "Proven track record of 40%+ cost reductions and 99.5% uptime in mission-critical systems serving 15K+ daily users.",
    "9+ years delivering scalable web applications for Fortune 500 companies across Real Estate & Energy sectors.",
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
        "Built property search engine with geolocation filtering for Austria's leading real estate platform, handling 5,000+ daily searches with improved response times",
        "Developed multi-tenant authentication system supporting different user roles (agents, buyers, landlords) with secure access controls",
        "Optimized AWS microservices architecture and database queries, significantly reducing search response times and improving user experience",
        "Contributed to platform stability during peak traffic periods, maintaining 99.5% uptime for critical search functionality",
      ],
    },
    {
      company: "RWE",
      location: "DE",
      role: "Full Stack Developer",
      period: "Sep 2022 - Jul 2024",
      highlights: [
        "Led architectural decisions for energy trading platform, proposing and implementing NestJS framework adoption to replace legacy Java components. The dependency injection patterns and modular architecture improved code maintainability and reduced integration complexity across the microservices ecosystem.",
        "Built high-performance data filtering system using MongoDB and NestJS, processing 15,000+ daily energy market queries with optimized response times",
        "Pioneered comprehensive testing strategy from ground zero, establishing e2e testing protocols that achieved strong code coverage and reduced production incidents.",
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
