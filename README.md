# Portfolio

Personal portfolio and technical blog built with Next.js, Tailwind CSS, and Contentlayer. Covers professional experience, open-source projects, and long-form writing on systems programming topics.

## What it does

Serves as a public-facing record of work and writing. The site includes a timeline-style experience section, a projects page, a tag-based blog, and a bookmarks section. Posts are authored in MDX and rendered with syntax highlighting and an inline table of contents.

## Features

- Experience timeline with per-entry tech-stack badges and employer links
- Projects page linked to live deployments and source repositories
- MDX blog with tag filtering, pagination, and TOC generation
- Bookmark aggregation via Raindrop integration
- Lazy-loaded dev-icon components to avoid blocking page load
- Dark/light theme toggle

## Tech stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Contentlayer for MDX processing
- Yarn 3 (PnP), Husky pre-commit hooks, ESLint

## Blog posts (published)

- *Why perf, tshark, and valgrind Miss the Point* — measuring latency vs. CPU time in multi-threaded applications (Dec 2024)
- *Gamified ASD Intervention* — computer vision pipeline with OpenCV and ResNet for emotion recognition in a Unity-based HCI project (Dec 2025)

## How to run

```bash
yarn install
yarn dev
```

Requires `.env.local` based on `.env.example` (Umami analytics ID, Giscus comment config — all optional).

## Status

Active — last updated December 2025. Deployed at [abdulrafayzahid.dev](https://www.abdulrafayzahid.dev).
