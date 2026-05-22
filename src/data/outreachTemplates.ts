export interface OutreachTemplate {
  id: string;
  companyId: string;
  label: string;
  to: string;
  subject: string;
  note: string;
  linkedinNote: string;
  body: string;
}

export const outreachTemplates: OutreachTemplate[] = [
  {
    id: "n8n-cold-backend",
    companyId: "n8n",
    label: "n8n - cold note to VP Engineering",
    to: "cornelius@n8n.io",
    subject: "Senior Node.js/TypeScript contractor - backend/product systems at n8n",
    note:
      "cornelius@n8n.io is a best-guess address - n8n's most common pattern is first@n8n.io (~71%). Verify it, or message Cornelius Suermann (VP Engineering) on LinkedIn instead.",
    linkedinNote:
      "Hi Cornelius - senior Node.js/TypeScript engineer, backend-heavy (NestJS, ex-RWE & ImmoScout24), available for remote EU B2B. No backend role open now, but I reduce risk in migrations, APIs, integrations, and tested product systems. Worth being on your radar?",
    body:
      "Hi Cornelius,\n\n" +
      "I'll keep this short. I don't see a backend or full-stack role on n8n's board right now, but I wanted to put myself on your radar for when one opens - n8n's core stack, Node.js and TypeScript, is exactly where I do my strongest work.\n\n" +
      "I'm a senior Node.js/TypeScript engineer, backend-heavy. Recent work: I helped migrate a Java energy-market platform to NestJS services at RWE, cut a large dataset export from 45 to 12 minutes with worker-pool parallel processing, and shipped search/listing work at ImmoScout24 inside a fully tested distributed system. The risk I reduce is senior delivery risk in existing production systems: migrations, APIs, integrations, testing, and performance.\n\n" +
      "I'm EU-based (Romania), available immediately, and prefer long-term remote B2B contracts. Portfolio: calingabriel.com\n\n" +
      "If you're adding backend capacity in the coming months, I'd value a short call. Either way - thanks for building n8n.\n\n" +
      "Calin",
  },
  {
    id: "checkly-cold-backend",
    companyId: "checkly",
    label: "Checkly - cold note to founder Tim Nolet",
    to: "tim@checklyhq.com",
    subject: "Senior Node.js/TypeScript contractor - testing-minded backend delivery",
    note:
      "tim@checklyhq.com is a strong best-guess - Checkly's pattern is first@checklyhq.com and RocketReach lists Tim's address as t***@checklyhq.com. Tim is now Chief Evangelist (co-founder), so he may forward it to eng hiring. LinkedIn message is an equally good route. Talent Community pool: jobs.ashbyhq.com/checkly",
    linkedinNote:
      "Hi Tim - senior Node.js/TypeScript engineer, testing-minded and backend-heavy. I brought e2e thinking into a NestJS migration at RWE and worked inside tested distributed systems at ImmoScout24. No eng role open now, but Checkly is a rare stack + mindset match.",
    body:
      "Hi Tim,\n\n" +
      "I don't see an engineering role on Checkly's board right now, but I wanted to reach out anyway - Checkly is one of the few products where my stack and my instincts line up exactly.\n\n" +
      "I'm a senior Node.js/TypeScript engineer, backend-heavy. I've consistently been the person who brings testing in early: at RWE I introduced e2e thinking so a legacy-to-NestJS migration could ship with confidence, and at ImmoScout24 I worked inside a fully tested distributed system on search and listing flows. Monitoring-as-code is a natural extension of how I already think.\n\n" +
      "I'm EU-based (Romania), available immediately, and prefer long-term remote B2B contracts. Portfolio: calingabriel.com\n\n" +
      "If you're adding backend capacity in the coming months, I'd value a short call. Either way - Checkly is a great product.\n\n" +
      "Calin",
  },
  {
    id: "1komma5-direct-note",
    companyId: "1komma5",
    label: "1KOMMA5° - direct note sent alongside application",
    to: "",
    subject: "Senior Software Engineer, Energy Markets - applied, plus a direct note",
    note:
      "No contact confirmed yet - fill in the hiring manager / engineering lead, and replace {{NAME}} in the body before sending.",
    linkedinNote:
      "Hi {{NAME}} - I just applied for the Senior Software Engineer, Energy Markets role. My RWE work was exactly this: migrating a Java energy-market platform to NestJS/TypeScript, backend + data pipelines. Would value a short chat. Portfolio: calingabriel.com",
    body:
      "Hi {{NAME}},\n\n" +
      "I just applied for the Senior Software Engineer - Energy Markets role and wanted to send a direct note - the fit is unusually close, so it felt worth more than a form submission.\n\n" +
      "At RWE I worked exactly at the intersection your posting describes. I migrated Java components to NestJS/TypeScript services for an energy-market data platform, built MongoDB-backed filtering serving 15,000+ daily energy-market queries, and cut a large dataset export from 45 to 12 minutes with worker-pool parallel processing - backend services meeting data-processing pipelines, which is the core of this role.\n\n" +
      "I also introduced e2e testing early in that migration so replacement work shipped with confidence - matching the maintainable, documented, testable code the role calls for.\n\n" +
      "I'm EU-based (Romania), available immediately, and prefer long-term remote B2B contracts, with permanent also possible for the right team. Short write-up of the RWE work: calingabriel.com/projects/rwe-energy\n\n" +
      "Worth a 20-minute call?\n\n" +
      "Calin",
  },
];
