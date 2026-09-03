import { TechStack } from '@/components/techStack'

// Experience type determines UI styling (badge color, card accent, icon)
// Professional types
export type ProfessionalType = 'full-time' | 'part-time' | 'internship' | 'contract' | 'remote'
// Non-professional types
export type NonProfessionalType = 'personal-project' | 'open-source' | 'volunteer' | 'education'
// Combined type
export type ExperienceType = ProfessionalType | NonProfessionalType

export interface ExperienceData {
  id: string // Unique identifier
  title: string // Job title or project name
  company: string // Company name or project/org name
  location: string // City, Country or "Remote" or "Online"
  href?: string // Company/project link
  startDate: string // e.g., "April 2025"
  endDate?: string // e.g., "Present" or "December 2024"
  type: ExperienceType // Drives UI styling
  achievements: string[] // Bullet points (with optional [link] syntax)
  techStack: TechStack[] // Technologies used
}

// Type-to-style mapping for UI components
export const experienceTypeConfig: Record<
  ExperienceType,
  {
    label: string
    badgeColor: string // Tailwind bg class
    badgeGradient: string // Gradient class for the badge
    accentColor: string // Tailwind border/glow class
    textColor: string // Tailwind text class
    icon?: string // Optional icon identifier
  }
> = {
  // === Professional Types ===
  'full-time': {
    label: 'Full-time',
    badgeColor: 'bg-emerald-500/20',
    badgeGradient: 'bg-gradient-to-r from-emerald-500 to-emerald-300',
    accentColor: 'border-emerald-500/50',
    textColor: 'text-emerald-400',
  },
  'part-time': {
    label: 'Part-time',
    badgeColor: 'bg-amber-500/20',
    badgeGradient: 'bg-gradient-to-r from-amber-500 to-amber-300',
    accentColor: 'border-amber-500/50',
    textColor: 'text-amber-400',
  },
  internship: {
    label: 'Internship',
    badgeColor: 'bg-violet-500/20',
    badgeGradient: 'bg-gradient-to-r from-violet-500 to-violet-300',
    accentColor: 'border-violet-500/50',
    textColor: 'text-violet-400',
  },
  contract: {
    label: 'Contract',
    badgeColor: 'bg-cyan-500/20',
    badgeGradient: 'bg-gradient-to-r from-cyan-500 to-cyan-300',
    accentColor: 'border-cyan-500/50',
    textColor: 'text-cyan-400',
  },
  remote: {
    label: 'Remote',
    badgeColor: 'bg-sky-500/20',
    badgeGradient: 'bg-gradient-to-r from-sky-500 to-sky-300',
    accentColor: 'border-sky-500/50',
    textColor: 'text-sky-400',
    icon: 'globe', // Shows globe icon overlay
  },
  // === Non-Professional Types ===
  'personal-project': {
    label: 'Personal Project',
    badgeColor: 'bg-pink-500/20',
    badgeGradient: 'bg-gradient-to-r from-pink-500 to-pink-300',
    accentColor: 'border-pink-500/50',
    textColor: 'text-pink-400',
    icon: 'rocket',
  },
  'open-source': {
    label: 'Open Source',
    badgeColor: 'bg-orange-500/20',
    badgeGradient: 'bg-gradient-to-r from-orange-500 to-orange-300',
    accentColor: 'border-orange-500/50',
    textColor: 'text-orange-400',
    icon: 'github',
  },
  volunteer: {
    label: 'Volunteer',
    badgeColor: 'bg-rose-500/20',
    badgeGradient: 'bg-gradient-to-r from-rose-500 to-rose-300',
    accentColor: 'border-rose-500/50',
    textColor: 'text-rose-400',
    icon: 'heart',
  },
  education: {
    label: 'Education',
    badgeColor: 'bg-indigo-500/20',
    badgeGradient: 'bg-gradient-to-r from-indigo-500 to-indigo-300',
    accentColor: 'border-indigo-500/50',
    textColor: 'text-indigo-400',
    icon: 'graduation-cap',
  },
}

const experienceData: ExperienceData[] = [
  {
    id: 'colloid-swarm',
    title: 'Author and maintainer',
    company: 'Colloid Swarm',
    location: 'Open source',
    href: 'https://github.com/Sarb0Z/colloid-swarm',
    startDate: 'July 2026',
    endDate: 'Present',
    type: 'open-source',
    achievements: [
      'Portable multi-agent development scaffold, adopted as the company-wide engineering harness for roughly 50 engineers',
      'Seven delegating personas (explorer, implementer, reviewer, QA verifier, researcher, mechanic, learning reporter) route work across three cost and capability tiers, holding planning and architecture at the top tier',
      'Hostile review runs as an independent gate rather than self-assessment by the implementer',
      'Canonical instructions, skills, hook policies, and the MCP server registry live in one engine-neutral layer with thin adapters for Claude Code, Codex, Kimi, and GitHub Copilot, so a change lands once instead of once per host',
      'An exporter transplants the scaffold into a target repository at a pinned commit [https://github.com/Sarb0Z/colloid-swarm]',
    ],
    techStack: ['Python', 'Bash', 'Claude Code', 'Codex', 'MCP'],
  },
  {
    id: 'softaims',
    title: 'Software Engineer',
    company: 'Softaims',
    location: 'Lahore',
    startDate: 'May 2025',
    endDate: 'Present',
    type: 'full-time',
    achievements: [
      'Architected and delivered an enterprise email infrastructure platform, solo, that scaled to 200K+ emails/day across 1,000+ domains: a multi-channel campaign engine orchestrating KumoMTA and Amazon SES edge nodes with A/B testing, threaded follow-ups, and real-time delivery state tracking',
      'Automated the DNS lifecycle (SPF/DMARC/DKIM), deployed edge agent daemons across multi-region VPS nodes, and built deliverability automation: graduated warmup scheduling with Redis-locked cycles, MXToolbox blacklist monitoring, and bi-directional Salesforce sync',
      'Built the voice onboarding module of Meridian, a service-business profitability platform: an ElevenLabs Conversational AI agent runs a spoken discovery interview while the backend keeps conversation state in a slot-walk, so the whole interview script replays offline without a live call',
      "Secured the agent tool calls with scoped tokens, signed webhooks, and per-session throttling; guaranteed exactly-once writes with a compound idempotency key (session, tool-call ID, body hash) recorded inside the caller's transaction; serialized concurrent tool calls with a Postgres advisory-lock namespace and bounded retries",
      'Revamped a food delivery and restaurant management platform: institutional co-payment and network discount workflows, pseudo-escrow payment distribution across vendors with milestone-based pricing, recurring and one-time billing across license tiers, real-time delivery tracking, and GenAI-powered allergen/dietary tagging [https://app.bitely.com.au/]',
      'Built Playwright scraping infrastructure collecting college information from 50+ sources, processing over 10,000 records daily, feeding a NextJS recommendation system on RAG and OpenAI embeddings that matches student profiles to scholarships and colleges [https://instudi.com/]',
      'Architected an extensible deep research agent framework on LangChain with plug-and-play agentic workflows for internal domain-specific research tools',
      'Engineered an LLM-powered essay feedback system with tool-based writing coach agents and a prompt management system that updates at runtime from teacher guidance, rubrics, and sample references [https://engagemo.ai/]',
      'Engineered an ETL pipeline with NumPy and Pandas in a FastAPI backend for data transformation and validation across database migrations',
      'Interviewed and onboarded new hires, then led their ramp-up on new project work and technical delivery',
    ],
    techStack: [
      'Python',
      'FastAPI',
      'TypeScript',
      'NextJS',
      'PostgreSQL',
      'Redis',
      'Celery',
      'KumoMTA',
      'AWS',
      'Salesforce',
      'ElevenLabs',
      'LangChain',
      'OpenAI',
      'Playwright',
      'Pandas',
      'NumPy',
    ],
  },
  {
    id: 'ebryx',
    title: 'Associate Software Engineer',
    company: 'Ebryx Pvt Ltd',
    location: 'Lahore',
    href: 'https://www.invisily.com/',
    startDate: 'June 2024',
    endDate: 'April 2025',
    type: 'full-time',
    achievements: [
      'Scaled a C++ gateway from 200 to 5,000 concurrent TLS WebSocket clients by replacing blocking polling with non-blocking polling, pooling connections, batching Arena requests, and initializing Arena memory up front',
      'Stress-tested the gateway under extreme load and fixed the failure paths normal traffic never exposed, including a log-rotation race that removed a file between check and read and crashed a worker thread',
      'Engineered an auto-update migration system for the gateway that carried it across significantly different software versions during the move to a multi-tenancy architecture',
      'Ported a ZTNA gateway component from x86-64 Ubuntu Server to ARM (Raspberry Pi), enabling a self-contained on-premises deployment for a client',
      'Packaged the device profiling component as a standalone application for Ubuntu Server, removing runtime dependencies with Cython static compilation',
      "Rewrote MySQL connection pooling with RAII patterns using Python's ContextManager, ending pool exhaustion from unclosed connections in complex and exception-handling flows",
      'Re-architected policy evaluation from a cron job to an event-driven model across the web portal, controller, and MySQL database, cutting redundant computation and database load 29% on cProfile benchmarks',
      'Implemented a Kafka data pipeline that dynamically assesses risk scores for network agents, feeding ML models that analyze access patterns for both training and live inference',
      'Translated the core Python policy engine, the central decision-maker of the microservices architecture, from a functional to an object-oriented paradigm, interacting across Web, Desktop, Mobile, MFA, DB, and IoT components',
      'Refactored the codebase on SonarQube feedback, removing over 2,000 LoC and reducing code smells by 37%',
    ],
    techStack: ['C++', 'Python', 'MySQL', 'Kafka', 'Cython', 'Linux', 'Docker'],
  },
  {
    id: 'active-takeoff',
    title: 'Software Engineer',
    company: 'Active Takeoff',
    location: 'Remote',
    startDate: 'November 2023',
    endDate: 'April 2024',
    type: 'part-time',
    achievements: [
      'Wrote custom optical character recognition software to parse tabular image data across hundreds of documents and loaded it into MySQL for enriched modeling',
      'Indexed customer data in Elasticsearch for sub-millisecond search, optimized the data representation for retrieval with image querying, and integrated a dynamic search function into the existing frontend',
    ],
    techStack: ['Python', 'MySQL', 'ElasticSearch'],
  },
  {
    id: 'systems-limited',
    title: 'App Development Intern',
    company: 'Systems Limited',
    location: 'Lahore',
    startDate: 'July 2023',
    endDate: 'September 2023',
    type: 'internship',
    achievements: [
      'Designed and developed API functionality between a PostgreSQL database and an e-commerce platform, with secure user authentication through Azure AD',
      'Containerized and orchestrated the platform to cloud environments with Docker and Kubernetes IaC as part of the Azure DevOps pipeline',
    ],
    techStack: ['PostgreSQL', 'Docker', 'Azure'],
  },
  {
    id: 'pitb',
    title: 'Software Intern',
    company: 'Punjab Information Technology Board',
    location: 'Lahore',
    startDate: 'July 2022',
    endDate: 'August 2022',
    type: 'internship',
    achievements: [
      'Collaborated on the .NET backend for a government portal, with Bcrypt encryption, JWT authentication, and automated API tests in Postman',
      "Researched and optimized an architecture to streamline the GitHub Actions CI/CD pipeline to the client's in-house data center",
    ],
    techStack: ['PostgreSQL', 'Postman'],
  },
]

export default experienceData
