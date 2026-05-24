export interface ApplicationSource {
  id: "justjoinit" | "contract-recruiters" | "malt";
  name: string;
  role: string;
  url: string;
  cadence: string;
  weeklyLeadTarget: number;
  weeklyApplyTarget: number;
  fitRule: string;
  searchQuery: string;
  proofAngle: string;
  nextAction: string;
  copyPacket: string[];
}

export const applicationSources: ApplicationSource[] = [
  {
    id: "justjoinit",
    name: "Just Join IT",
    role: "Daily board for remote EU B2B roles with visible stack and rate signals.",
    url: "https://justjoin.it/job-offers/remote/javascript",
    cadence: "Scan every weekday morning; save only 70%+ Node.js/TypeScript B2B matches.",
    weeklyLeadTarget: 12,
    weeklyApplyTarget: 8,
    fitRule:
      "Remote, Senior, B2B/contract, Node.js or TypeScript in the core stack, backend/product/platform scope, no office-only constraint.",
    searchQuery: "Remote JavaScript/TypeScript, Node.js, Senior, B2B",
    proofAngle:
      "Lead with RWE performance/migration proof when the role mentions backend, data, APIs, or NestJS.",
    nextAction:
      "Open filtered board, shortlist 3 roles, add each with fit score, then copy a tailored draft before applying.",
    copyPacket: [
      "Senior Node.js/TypeScript contractor, remote EU, available immediately.",
      "Best fit: backend-heavy product systems, migrations, APIs, testing, integrations, and performance.",
      "Proof: RWE exports 45min -> 12min, 65% faster APIs, ImmoScout24 tested distributed platform.",
      "Engagement: long-term B2B preferred.",
    ],
  },
  {
    id: "contract-recruiters",
    name: "Specialist contract recruiters",
    role: "Warm distribution channel for roles that may not stay public long.",
    url: "https://www.signifytechnology.com/jobs/",
    cadence: "Message 5 recruiter contacts per week and follow up every 5 business days.",
    weeklyLeadTarget: 10,
    weeklyApplyTarget: 7,
    fitRule:
      "Recruiter must place EU/UK remote contract roles in Node.js, TypeScript, NestJS, platform, fintech, energy, proptech, or developer tools.",
    searchQuery:
      "Signify, Optiveum, emagine, Hays, SThree, DCV, B2Bnetwork: Node.js TypeScript remote Europe contract",
    proofAngle:
      "Lead with availability, contract terms, exact stack, and one measurable production result.",
    nextAction:
      "Copy recruiter packet, send to one recruiter, then add their active role or contact as a tracked lead.",
    copyPacket: [
      "Hi, I am a senior Node.js/TypeScript engineer based in Romania, available immediately for remote EU B2B contracts.",
      "Strongest fit: backend-heavy product/platform work, NestJS migrations, API/data performance, integrations, testing.",
      "Recent proof: RWE energy platform migration, exports cut 45min -> 12min, 65% faster APIs; ImmoScout24 tested distributed platform.",
      "Please keep me in mind for senior Node.js/TypeScript contract roles, ideally long-term and remote EU-compatible.",
    ],
  },
  {
    id: "malt",
    name: "Malt",
    role: "EU freelance marketplace profile for inbound and direct project matching.",
    url: "https://www.malt.com/a/freelance/tech/backend-developer/nodejs-developer",
    cadence: "Refresh profile weekly; send 5 targeted project/company messages per week when available.",
    weeklyLeadTarget: 8,
    weeklyApplyTarget: 5,
    fitRule:
      "Project should value senior delivery over cheapest build: production backend, migration, integration, API performance, testing, or long-term team extension.",
    searchQuery:
      "Node.js developer, TypeScript, NestJS, backend developer, React Node, API performance, migration",
    proofAngle:
      "Package the profile around one service: backend-heavy Node.js/TypeScript contractor for existing production systems.",
    nextAction:
      "Open Malt, refresh availability/proof, then add any direct project inquiry as a tracked B2B lead.",
    copyPacket: [
      "Profile headline: Senior Node.js/TypeScript contractor for backend-heavy product systems.",
      "Service offer: migrations, APIs, integrations, testing, and performance in existing production systems.",
      "Proof: RWE 45min -> 12min exports, 65% faster APIs; ImmoScout24 search/listing/Iterable in tested distributed platform.",
      "Availability: immediate, remote EU, long-term B2B preferred.",
    ],
  },
];
