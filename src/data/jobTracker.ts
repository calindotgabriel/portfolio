export type JobStatus =
  | "Lead"
  | "Researching"
  | "Sent"
  | "Cold Sent"
  | "Interviewing"
  | "Offer"
  | "Rejected"
  | "Stack Mismatch"
  | "Office Only"
  | "Closed";

export type OutreachStatus = "" | "Drafted" | "Sent";
export type EngagementType = "" | "B2B" | "Permanent" | "Other";

export interface JobLead {
  id: string;
  company: string;
  domain: string;
  funding: string;
  applyUrl: string;
  stackFit: string;
  contactApproach: string;
  contact: string;
  status: JobStatus;
  notes: string;
  updatedAt: string;
  outreach: OutreachStatus;
  outreachDate: string;
  ask: string;
  engagement: EngagementType;
  source?: string;
  fitScore?: number;
  replyStatus?: "" | "No reply" | "Replied" | "Interview booked" | "Rejected";
  rejectionReason?: "" | "Stack mismatch" | "Location" | "Rate" | "Seniority" | "Timing" | "Unclear";
  nextAction?: string;
}

export const jobStatuses: Array<{ name: JobStatus; color: string }> = [
  { name: "Lead", color: "#64748b" },
  { name: "Researching", color: "#0ea5e9" },
  { name: "Sent", color: "#6366f1" },
  { name: "Cold Sent", color: "#2563eb" },
  { name: "Interviewing", color: "#f59e0b" },
  { name: "Offer", color: "#16a34a" },
  { name: "Rejected", color: "#dc2626" },
  { name: "Stack Mismatch", color: "#9333ea" },
  { name: "Office Only", color: "#b45309" },
  { name: "Closed", color: "#475569" },
];

export const seedJobLeads: JobLead[] = [
  {
    id: "1komma5",
    company: "1KOMMA5°",
    domain: "Energy",
    funding: "EUR150M pre-IPO",
    applyUrl: "jobs.1komma5.com/en",
    stackFit: "High - 85% overlap: TypeScript, Node.js/NestJS, energy-market backend, data pipelines",
    contactApproach: "Apply + DM eng manager; reference RWE case study",
    contact: "",
    status: "Sent",
    notes:
      "Live role: Senior Backend Engineer TypeScript. Confirm Romania/EU-remote eligibility - scope reads Germany-leaning.",
    updatedAt: "",
    outreach: "Sent",
    outreachDate: "2026-05-20",
    ask: "EUR95k",
    engagement: "Permanent",
    source: "Direct company board",
    fitScore: 85,
    replyStatus: "No reply",
    nextAction: "Find engineering manager contact and follow up within 24h of application",
  },
  {
    id: "n8n",
    company: "n8n",
    domain: "Domain-agnostic",
    funding: "Growth stage",
    applyUrl: "n8n.io/careers",
    stackFit: "Very high - 90% overlap: Node.js/TypeScript core, workflow automation, developer tooling",
    contactApproach: "Apply via careers page",
    contact: "",
    status: "Cold Sent",
    notes:
      "Remote across Europe/UK. Eng comp up to ~$200-250k. Community board: community.n8n.io/c/jobs/13",
    updatedAt: "",
    outreach: "Sent",
    outreachDate: "2026-05-20",
    ask: "",
    engagement: "",
    source: "Company board + direct outreach",
    fitScore: 90,
    replyStatus: "No reply",
    nextAction: "Watch for backend/product engineering openings and keep VP Engineering note warm",
  },
  {
    id: "finom",
    company: "Finom",
    domain: "Fintech",
    funding: "EUR115M Series C",
    applyUrl: "jobs.eu.lever.co/pnlfin/10646541-be27-4002-be84-9b1e383db6fb",
    stackFit: "Mismatch - requires deep .NET/C#",
    contactApproach: "Skip this role; revisit only for TypeScript/full-stack openings",
    contact: "",
    status: "Stack Mismatch",
    notes:
      "Disqualified for this role: posting requires deep .NET/C# backend expertise. Finom remains worth revisiting for TypeScript/full-stack roles.",
    updatedAt: "2026-05-20",
    outreach: "",
    outreachDate: "",
    ask: "",
    engagement: "",
    source: "Company board",
    fitScore: 25,
    rejectionReason: "Stack mismatch",
    nextAction: "Revisit only for TypeScript/full-stack roles",
  },
  {
    id: "upvest",
    company: "Upvest",
    domain: "Fintech",
    funding: "EUR108M (Mar 2026)",
    applyUrl: "careers.upvest.co/jobs",
    stackFit: "Medium - 55% overlap: fintech/API domain, but Go/Kubernetes-heavy",
    contactApproach: "Target Node/TypeScript or platform roles only",
    contact: "",
    status: "Sent",
    notes: "Ashby board ~27 roles. Securities/investment API infra.",
    updatedAt: "",
    outreach: "Sent",
    outreachDate: "2026-05-20",
    ask: "",
    engagement: "",
    source: "Company board",
    fitScore: 55,
    replyStatus: "No reply",
    nextAction: "Do not spend more time unless a Node/TypeScript role opens",
  },
  {
    id: "payrails",
    company: "Payrails",
    domain: "Payments",
    funding: "$40M Series B",
    applyUrl: "payrails.com/careers",
    stackFit: "Mismatch - Golang-heavy architect profile",
    contactApproach: "Reject this role; hybrid Cairo is not remote-compatible",
    contact: "",
    status: "Stack Mismatch",
    notes:
      "Rejected for this role: hybrid office in Cairo, plus vast production systems experience ideally using Golang and architecture-heavy requirements.",
    updatedAt: "2026-05-20",
    outreach: "",
    outreachDate: "",
    ask: "",
    engagement: "",
    source: "Company board",
    fitScore: 20,
    rejectionReason: "Location",
    nextAction: "Reject current role; remote EU and TypeScript fit are both weak",
  },
  {
    id: "solaris",
    company: "Solaris",
    domain: "Fintech",
    funding: "EUR140M Series G",
    applyUrl: "solarisgroup.com",
    stackFit: "Medium - 60% overlap: fintech/platform domain, stack not confirmed",
    contactApproach: "Apply via careers page",
    contact: "",
    status: "Lead",
    notes: "Banking-as-a-service. Larger / more established.",
    updatedAt: "",
    outreach: "",
    outreachDate: "",
    ask: "",
    engagement: "",
    source: "Research list",
    fitScore: 60,
    nextAction: "Qualify stack and remote/B2B eligibility before outreach",
  },
  {
    id: "finst",
    company: "Finst",
    domain: "Fintech",
    funding: "EUR8M Series A",
    applyUrl: "finst.com",
    stackFit: "Medium - 60% overlap: fintech/data product domain, stack not confirmed",
    contactApproach: "Direct outreach - small team",
    contact: "",
    status: "Lead",
    notes: "Regulated crypto platform expanding across Europe.",
    updatedAt: "",
    outreach: "",
    outreachDate: "",
    ask: "",
    engagement: "",
    source: "Research list",
    fitScore: 60,
    nextAction: "Find CTO/engineering contact and verify TypeScript backend fit",
  },
  {
    id: "arbio",
    company: "Arbio",
    domain: "Proptech",
    funding: "EUR31M Series A",
    applyUrl: "arbio.com",
    stackFit: "Mismatch - Berlin onsite only",
    contactApproach: "Reject for now; revisit only if remote EU roles open",
    contact: "",
    status: "Office Only",
    notes:
      "Rejected for now: current engineering roles are Office HQ - Berlin, Germany - onsite.",
    updatedAt: "2026-05-20",
    outreach: "",
    outreachDate: "",
    ask: "",
    engagement: "",
    source: "Company board",
    fitScore: 35,
    rejectionReason: "Location",
    nextAction: "Reject current role; revisit only if remote EU opens",
  },
  {
    id: "buena",
    company: "Buena",
    domain: "Proptech",
    funding: "EUR49M",
    applyUrl: "buena.com",
    stackFit: "Mismatch - office-only roles",
    contactApproach: "Reject for now; revisit only if remote EU roles open",
    contact: "",
    status: "Office Only",
    notes:
      "Rejected for now: current roles are office-only / not compatible with remote EU work.",
    updatedAt: "2026-05-20",
    outreach: "",
    outreachDate: "",
    ask: "",
    engagement: "",
    source: "Company board",
    fitScore: 35,
    rejectionReason: "Location",
    nextAction: "Reject current role; revisit only if remote EU opens",
  },
  {
    id: "aedifion",
    company: "aedifion",
    domain: "Proptech/Energy",
    funding: "Funded",
    applyUrl: "aedifion.com",
    stackFit: "High - 75% overlap: smart-building energy SaaS, backend/data, RWE + ImmoScout24 proof",
    contactApproach: "Apply; reference RWE + ImmoScout24",
    contact: "",
    status: "Lead",
    notes: "Smart-building / building-energy SaaS - bridges both case studies.",
    updatedAt: "",
    outreach: "",
    outreachDate: "",
    ask: "",
    engagement: "",
    source: "Research list",
    fitScore: 75,
    nextAction: "Qualify remote/B2B eligibility, then send RWE + ImmoScout24 direct note",
  },
  {
    id: "aira",
    company: "Aira",
    domain: "Energy",
    funding: "~$400M",
    applyUrl: "airahome.com",
    stackFit: "Medium - 65% overlap: energy/home automation domain, stack not confirmed",
    contactApproach: "Apply via careers page",
    contact: "",
    status: "Lead",
    notes: "Home-heating electrification + smart controls. Nordics.",
    updatedAt: "",
    outreach: "",
    outreachDate: "",
    ask: "",
    engagement: "",
    source: "Research list",
    fitScore: 65,
    nextAction: "Qualify TypeScript backend fit before applying",
  },
  {
    id: "checkly",
    company: "Checkly",
    domain: "Domain-agnostic",
    funding: "Remote-first",
    applyUrl: "checklyhq.com/careers",
    stackFit: "High - 80% overlap: Node.js, testing/observability, remote-first product",
    contactApproach: "Apply via careers page",
    contact: "",
    status: "Cold Sent",
    notes: "Testing/observability. Remote-first culture.",
    updatedAt: "",
    outreach: "Sent",
    outreachDate: "2026-05-20",
    ask: "",
    engagement: "",
    source: "Direct outreach",
    fitScore: 80,
    replyStatus: "No reply",
    nextAction: "Keep in warm pipeline; apply immediately if backend role opens",
  },
];
