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
    id: 'softaims',
    title: 'Software Engineer',
    company: 'Softaims',
    location: 'Lahore',
    startDate: 'April 2025',
    endDate: 'Present',
    type: 'full-time',
    achievements: [
      'Revamped food delivery and restaurant management platform, implementing institutional co-payment and network discount workflows, pseudo-escrow payment distribution across vendors with milestone-based pricing, payment infrastructure for recurring and one-time billing across multiple license tiers, real-time delivery tracking with location triangulation, and GenAI-powered allergen/dietary tagging with recipe decomposition modules [https://app.bitely.com.au/]',
      'Built scalable web scraping infrastructure using Playwright to automatically collect college information from 50+ sources, processing over 10,000 records daily',
      'Designed and developed sophisticated recommendation system in NextJS leveraging RAG architecture and OpenAI embeddings to analyze user profiles and match them with optimal scholarships and colleges [https://instudi.com/]',
      'Architected extensible deep research agent framework using LangChain with plug-and-play agentic workflows, enabling rapid development of domain-specific research tools for internal company use',
      'Engineered robust ETL pipeline with NumPy and Pandas in FastAPI backend for data transformation and validation, ensuring data quality and consistency across database migrations',
      'Engineered robust LLM-powered essay writing feedback system with multiple tool-based writing coach agents, implementing dynamic prompt management system that updates at runtime based on teacher guidance, grading rubrics, and sample references [https://engagemo.ai/]',
    ],
    techStack: [
      'NextJS',
      'TypeScript',
      'Python',
      'FastAPI',
      'Playwright',
      'LangChain',
      'OpenAI',
      'Pandas',
      'NumPy',
      'PostgreSQL',
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
      "Scaled C++ Gateway networking component's ability to handle TLS WebSocket connections, increasing capacity from 200 to 5000 concurrent clients through efficient connection-pooling, optimized network I/O, memory management, threading models and bulk processing",
      'Engineered a robust auto-update migration system for gateway that facilitated smooth transitions between significantly different software versions due to moving to a multi-tenancy architecture',
      "Rewrote MySQL connection pooling logic by implementing RAII patterns using Python's ContextManager module, ensuring automatic connection closure, preventing pool exhaustion caused by unclosed connections in complex flows or exception handling scenarios",
      'Packaged device profiling component as a standalone application for Ubuntu Server eliminating runtime dependency requirements using Cython for static compilation',
      'Translated core Python-based policy engine that serves as the central decision-maker of the microservices architecture from a functional to object-oriented paradigm; engineering it to interact seamlessly between Web, Desktop, Mobile, MFA, DB and IoT components',
      'Refactored codebase to reduce code duplication based on Sonarqube feedback, removing over 2000 LoC, reducing code smells by 37%',
      'Implemented data pipeline for dynamically assessing risk scores for network agents, integrating ML models to analyze access patterns using Kafka streams',
      'Re-architected policy evaluation from a routine cron job to an event-driven model, optimizing algorithms across the web portal, controller, and MySQL database to enable real-time decision-making, reducing database load by 29%',
    ],
    techStack: ['C++', 'Python', 'MySQL', 'Kafka', 'Cython', 'Docker'],
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
      'Wrote custom object character recognition software to parse image tabular data across hundreds of documents and deployed the script to load it to MySQL database for enriched modeling',
      'Indexed customer data in ElasticSearch instance to enable sub-millisecond search, optimized data representation for retrieval with image querying and integrated dynamic search function into their existing frontend application',
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
      'Designed and developed API functionalities for seamless interaction between PostgreSQL database and e-commerce platform, ensuring secure user authentication using Azure AD',
      'Containerized and deployed our platform to cloud environments, utilizing Docker as part of our Azure DevOps pipeline in a reliable, and cost-effective manner',
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
      'Collaborated with a team to develop the .NET backend for a government portal using Angular, incorporating encryption with Bcrypt, authentication with JWT, and automating API tests using Postman',
      "Researched and optimized an architecture solution to streamline the CI/CD pipeline to the client's inhouse data center infrastructure",
    ],
    techStack: ['PostgreSQL', 'Postman'],
  },
]

export default experienceData
