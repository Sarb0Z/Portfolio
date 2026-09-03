import { TechStack } from '@/components/techStack'
interface ProjectDataProps {
  title: string
  description: string
  imgSrc?: string
  href: string
  techStack: TechStack[]
}

// Cover images for repo-backed projects are GitHub's own social previews, so
// they track the repo's current description and language mix without a
// screenshot to maintain.
const og = (repo: string) => `https://opengraph.githubassets.com/1/Sarb0Z/${repo}`

const projectsData: ProjectDataProps[] = [
  {
    title: 'Colloid Swarm',
    description:
      'Portable multi-agent development scaffold, adopted as the company-wide engineering harness for roughly 50 engineers. Seven delegating personas route work across three cost and capability tiers, planning and architecture stay at the top tier, and hostile review runs as an independent gate instead of the implementer grading its own work. Canonical instructions, skills, hook policies, and the MCP server registry live in one engine-neutral layer with thin adapters for Claude Code, Codex, Kimi, and GitHub Copilot; an exporter transplants the scaffold into a target repository at a pinned commit.',
    imgSrc: og('colloid-swarm'),
    href: 'https://github.com/Sarb0Z/colloid-swarm',
    techStack: ['Python', 'Bash', 'Claude Code', 'Codex', 'MCP'],
  },
  {
    title: 'Mailstation: enterprise email infrastructure',
    description:
      'Built solo in about two months: a production email platform sending 200K+ emails a day across 1,000+ domains. A multi-channel campaign engine with A/B logic and threaded follow-ups sits on KumoMTA and Amazon SES edge nodes, each running a Python agent daemon. Automated SPF/DKIM/DMARC lifecycle, Redis-locked graduated warmup, blacklist monitoring, and bi-directional Salesforce sync. It replaced the Salesforce email tool it was measured against and beat it on campaign response rates.',
    href: '/blog/silent-integration-failure',
    techStack: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Celery',
      'KumoMTA',
      'AWS',
      'React',
      'TypeScript',
    ],
  },
  {
    title: 'NPI Discovery Service',
    description:
      'Search and bulk-export US healthcare providers from the public NPPES registry. A partition-aware collector splits by provider type and then narrows by postal prefix until each leaf query fits within upstream result limits, and reports incomplete partitions in response metadata rather than silently truncating. Redis-backed caching, a WebSocket gateway streaming bulk-job progress across API instances, correlation-ID middleware for end-to-end tracing, Terraform-provisioned deploys.',
    imgSrc: og('npi-discovery-service'),
    href: 'https://github.com/Sarb0Z/npi-discovery-service',
    techStack: ['TypeScript', 'NestJS', 'NextJS', 'Redis', 'Terraform'],
  },
  {
    title: 'WARPO: WhatsApp backup export',
    description:
      'WhatsApp chat exporter for Android (crypt12, crypt14, crypt15) and iOS backups. Decrypts the database formats, handles key extraction, and writes the conversations out as HTML and JSON. The kind of binary-format work that is hard to fake, which is the point.',
    imgSrc: og('WARPO'),
    href: 'https://github.com/Sarb0Z/WARPO',
    techStack: ['Python', 'SQLite'],
  },
  {
    title: 'Balloon game in 8086 assembly',
    description:
      'A DOS text-mode animation written in 8086 assembly. Writes directly to the CGA video buffer at segment 0xB800 with no BIOS or DOS print calls, hooks the IRQ 0 hardware timer through the interrupt vector table to drive a live tick counter, and implements custom scroll, clear, and draw routines on a stack-based calling convention.',
    imgSrc: og('balloon-game-8086'),
    href: 'https://github.com/Sarb0Z/balloon-game-8086',
    techStack: ['Assembly'],
  },
  {
    title: 'Facial emotion recognition, real time',
    description:
      'A convolutional neural network trained from scratch on the FER2013 training set (28,709 images across 7 emotion classes) with a real-time inference loop in OpenCV: Haar-cascade face detection, 48x48 grayscale crop, per-frame prediction, and an on-frame label. Exported to ONNX for on-device inference inside a Unity game, the basis of my final-year project on gamified emotional-development intervention.',
    imgSrc: '/static/images/show_emotion.png',
    href: 'https://github.com/Sarb0Z/EmotionRecognitionModel',
    techStack: ['Python', 'PyTorch', 'OpenCV', 'ONNX', 'Unity'],
  },
  {
    title: 'Music Tools',
    description:
      'A Node.js monorepo for a GitHub-backed personal music library: a Discord bot that streams audio on demand from a private repository with no local storage, transcoding to 16-bit PCM at 48 kHz through ffmpeg and preloading the next queued track to avoid dropouts, plus CLI tools for downloading, uploading, and listing tracks.',
    imgSrc: og('music-tools'),
    href: 'https://github.com/Sarb0Z/music-tools',
    techStack: ['NodeJS', 'ffmpeg'],
  },
  {
    title: 'Candy Crush clone',
    description:
      'A match-three game built from scratch in C++ and SFML. An early deep dive into graphics programming: shaders, sprite rendering, and the difference between dynamic and static linking. Special candy combinations, save and load, and scoring.',
    imgSrc: og('candycrush'),
    href: 'https://github.com/Sarb0Z/candycrush',
    techStack: ['C++', 'SFML'],
  },
]

export default projectsData
