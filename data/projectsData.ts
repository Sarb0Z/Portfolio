import type { CoverVariant } from '@/components/Cover'

export interface Project {
  id: string
  title: string
  blurb: string
  description: string
  cover: CoverVariant
  label: string
  href: string
  stack: string[]
  year: string
  kind: 'Work' | 'Open source' | 'Personal' | 'University'
  featured?: boolean
}

const projectsData: Project[] = [
  {
    id: 'gateway',
    title: 'C++ TLS gateway, 200 to 5,000 concurrent clients',
    blurb: 'A zero-trust network gateway scaled 25x without new hardware.',
    description:
      'At Ebryx I took a C++ gateway from 200 to 5,000 concurrent TLS WebSocket clients by replacing blocking polling with non-blocking polling, pooling connections, batching Arena requests, and initializing Arena memory up front. Then I stress-tested it past normal traffic and fixed the failure paths that only showed up there, including a log-rotation race that removed a file between check and read and crashed a worker thread. The same platform got an auto-update migration system for its move to multi-tenancy and a component ported from x86-64 to ARM for on-prem deployment.',
    cover: 'fanout',
    label: '200 to 5,000 clients',
    href: '/experience',
    stack: ['C++', 'TLS', 'WebSocket', 'Linux', 'Python', 'MySQL'],
    year: '2024',
    kind: 'Work',
    featured: true,
  },
  {
    id: 'mailstation',
    title: 'Mailstation, enterprise email infrastructure',
    blurb: 'Built solo. 200K+ emails a day across 1,000+ domains.',
    description:
      'A production email platform built alone in about two months. A multi-channel campaign engine with A/B logic and threaded follow-ups sits on KumoMTA and Amazon SES edge nodes, each running a Python agent daemon. Automated SPF, DKIM, and DMARC lifecycle, Redis-locked graduated warmup, blacklist monitoring, and bi-directional Salesforce sync. It replaced the Salesforce email tool it was measured against and beat it on campaign response rates.',
    cover: 'mesh',
    label: '200K+ / day',
    href: '/blog/silent-integration-failure',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'KumoMTA', 'AWS SES', 'React'],
    year: '2026',
    kind: 'Work',
    featured: true,
  },
  {
    id: 'colloid-swarm',
    title: 'Colloid Swarm',
    blurb: 'A multi-agent engineering harness now used by about 50 engineers.',
    description:
      'A portable multi-agent development scaffold, adopted as the company-wide engineering harness for roughly 50 engineers. Seven delegating personas route work across three cost and capability tiers, planning and architecture stay at the top tier, and hostile review runs as an independent gate rather than the implementer grading its own work. Canonical instructions, skills, hook policies, and the MCP server registry live in one engine-neutral layer with thin adapters for Claude Code, Codex, Kimi, and GitHub Copilot. An exporter transplants the scaffold into a target repository at a pinned commit.',
    cover: 'tiers',
    label: '7 personas, 3 tiers',
    href: 'https://github.com/Sarb0Z/colloid-swarm',
    stack: ['Python', 'Bash', 'Claude Code', 'Codex', 'MCP'],
    year: '2026',
    kind: 'Open source',
    featured: true,
  },
  {
    id: 'npi',
    title: 'NPI Discovery Service',
    blurb: 'Bulk export from a registry that caps every query, without silent truncation.',
    description:
      'Search and bulk-export US healthcare providers from the public NPPES registry. A partition-aware collector splits by provider type and then narrows by postal prefix until each leaf query fits within upstream result limits, and reports incomplete partitions in response metadata rather than silently truncating. Redis-backed caching, a WebSocket gateway streaming bulk-job progress across API instances, correlation-ID middleware for end-to-end tracing, Terraform-provisioned deploys.',
    cover: 'partition',
    label: 'partition-aware',
    href: 'https://github.com/Sarb0Z/npi-discovery-service',
    stack: ['TypeScript', 'NestJS', 'Next.js', 'Redis', 'Terraform'],
    year: '2025',
    kind: 'Personal',
  },
  {
    id: 'warpo',
    title: 'WARPO',
    blurb: 'WhatsApp backup decryption and export for Android and iOS.',
    description:
      'A WhatsApp chat exporter for Android (crypt12, crypt14, crypt15) and iOS backups. Decrypts the database formats, handles key extraction, and writes the conversations out as HTML and JSON. The kind of binary-format work that is hard to fake, which is the point.',
    cover: 'cipher',
    label: 'crypt12 / 14 / 15',
    href: 'https://github.com/Sarb0Z/WARPO',
    stack: ['Python', 'SQLite'],
    year: '2025',
    kind: 'Personal',
  },
  {
    id: 'balloon',
    title: 'Balloon game in 8086 assembly',
    blurb: 'Direct video memory, a hooked hardware timer, no BIOS calls.',
    description:
      'A DOS text-mode animation in 8086 assembly. Writes directly to the CGA video buffer at segment 0xB800 with no BIOS or DOS print calls, hooks the IRQ 0 hardware timer through the interrupt vector table to drive a live tick counter, and implements custom scroll, clear, and draw routines on a stack-based calling convention.',
    cover: 'raster',
    label: '0xB800',
    href: 'https://github.com/Sarb0Z/balloon-game-8086',
    stack: ['8086 assembly', 'DOS'],
    year: '2022',
    kind: 'University',
  },
  {
    id: 'emotion',
    title: 'Real-time facial emotion recognition',
    blurb: 'A CNN trained from scratch on FER2013, running live on camera frames.',
    description:
      'A convolutional neural network trained from scratch on the FER2013 training set (28,709 images across 7 emotion classes) with a real-time inference loop in OpenCV: Haar-cascade face detection, 48x48 grayscale crop, per-frame prediction, and an on-frame label. Exported to ONNX for on-device inference inside a Unity game, the basis of my final-year project on gamified emotional-development intervention.',
    cover: 'faces',
    label: '28,709 images, 7 classes',
    href: 'https://github.com/Sarb0Z/EmotionRecognitionModel',
    stack: ['Python', 'PyTorch', 'OpenCV', 'ONNX', 'Unity'],
    year: '2024',
    kind: 'University',
  },
  {
    id: 'music-tools',
    title: 'Music Tools',
    blurb: 'A Discord bot streaming a GitHub-backed music library with no local storage.',
    description:
      'A Node.js monorepo for a GitHub-backed personal music library: a Discord bot that streams audio on demand from a private repository with no local storage, transcoding to 16-bit PCM at 48 kHz through ffmpeg and preloading the next queued track to avoid dropouts, plus CLI tools for downloading, uploading, and listing tracks.',
    cover: 'wave',
    label: '48 kHz PCM',
    href: 'https://github.com/Sarb0Z/music-tools',
    stack: ['Node.js', 'ffmpeg', 'Discord API'],
    year: '2025',
    kind: 'Personal',
  },
  {
    id: 'candycrush',
    title: 'Candy Crush clone',
    blurb: 'A match-three game from scratch in C++ and SFML.',
    description:
      'A match-three game built from scratch in C++ and SFML. An early deep dive into graphics programming: shaders, sprite rendering, and the difference between dynamic and static linking. Special candy combinations, save and load, and scoring.',
    cover: 'grid',
    label: 'C++ / SFML',
    href: 'https://github.com/Sarb0Z/candycrush',
    stack: ['C++', 'SFML'],
    year: '2021',
    kind: 'University',
  },
]

export default projectsData
