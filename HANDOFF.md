# Handoff: portfolio redesign (written 2026-09-03)

Read this first in a fresh session opened in `~/Projects/Portfolio`. It carries three
things: what is live and what is uncommitted right now, the up-to-date facts about
Abdul that every page must agree with, and the UI/UX requirements for the redesign.
Nothing here is private; the file can be committed or deleted.

## 1. Current state

**Live at https://www.abdulrafayzahid.dev** is commit `8b0d61d` on `main`: the old
template look with refreshed content. Deployed by `.github/workflows/deploy-gh-pages.yml`
about two minutes after each push to `main`.

**Uncommitted in the working tree (2026-09-03, later session)** is the full redesign in
the direction Abdul chose when asked: **editorial base with terminal touches**. Built clean
(`yarn build:static` exit 0), screenshotted at 1280px and 390px in dark and light, all
routes 200, no failed requests, zero em-dashes and zero old-template colour classes in the
built HTML. Not yet reviewed by Abdul, not committed, not pushed.

What the terminal touches are, concretely:
- Hero facts as a mono `key: value` block (`FactList` in `components/design.tsx`), also
  used on About. Section headings keep the serif title with a mono accent index.
- Projects as a log listing (`ProjectLog` in `components/ProjectRow.tsx`): year, kind,
  name, blurb, headline number, expanding in place via native `<details>` to the SVG
  diagram and full story. `/projects` shows all nine with the three featured open; home
  keeps the three featured as big rows with the number set large and the other six as the
  log. Numbers are the hero of each row.
- Command palette on Cmd/Ctrl+K (`components/CommandPalette.tsx`, kbar used directly, pliny
  search provider removed): pages, all projects, posts (loaded from `search.json` on first
  open), resume, GitHub, LinkedIn, email, theme toggle. Sequence shortcuts `g h/w/b/e/a/k`
  and `t` for theme. Visible `⌘K` hint in the header and footer, a "Jump to" row in the
  mobile menu. Opens on the first keypress (verified).
- Experience as a changelog: `YYYY-MM to YYYY-MM` markers, lowercase mono type and
  location, `+ N more` toggles.
- Writing lists use `YYYY-MM-DD` dates; post pages keep the long date.
- 404 page restyled (mono 404, "No such page."). Bookmarks rebuilt as plain rows with no
  sidebar, no thumbnails (`app/bookmarks/*`); the old bookmark components, the two dead icon
  components, `LazySearchProvider`, and the unused `layouts/ListLayout.tsx` are deleted.
- `components/Link.tsx` now treats hrefs with a file extension as plain anchors, which
  removes the `/resume.pdf.txt` prefetch 404 on every page.
- The 2024 profiling post had 15 em-dashes; replaced with commas, colons, or sentence
  breaks, meaning unchanged.

`kbar` was added to `package.json` (same version pliny pins), so `yarn.lock` changed.

To discard everything: `git checkout -- . && git clean -fd`.

## 2. Facts (the only content allowed on the site)

Everything user-facing must trace to these facts or to what Abdul says directly. Do not
invent projects, numbers, authorship, or scope. Source of truth is the private
career-ops repo at `~/Projects/career-ops` (`cv.md`, `article-digest.md`,
`config/profile.yml`, `modes/_profile.md`); the summary below is current as of
2026-09-03.

- **Name:** Abdul Rafay Zahid. **Positioning:** backend and systems engineer. About
  three years of experience (not junior; do not write "2 years").
- **Base:** Karachi, Pakistan, UTC+5. Works Gulf (GMT+4) and European hours.
- **Stance:** open to work. Fully remote via EOR or contract; also open to relocating
  where the employer sponsors the visa. Never mention salary on the site.
- **Contacts:** public email `sarbzga@gmail.com` (the site and the public resume use
  this one; never publish the phone number). GitHub `github.com/Sarb0Z`. LinkedIn
  `linkedin.com/in/abdul-rafay-zahid`. Resume PDF at `/resume.pdf` (published
  2026-08-04, one page, predates the Colloid Swarm entry; regenerate from career-ops
  with `generate-pdf.mjs --one-page` before relying on it).
- **Three things shipped (the headline proof):**
  1. Scaled a C++ TLS WebSocket gateway from 200 to 5,000 concurrent clients at Ebryx
     (non-blocking polling, connection pooling, batched Arena requests, up-front Arena
     memory; stress-tested and fixed a log-rotation race that crashed a worker thread).
  2. Built Mailstation solo in about two months at Softaims: 200K+ emails a day across
     1,000+ domains, KumoMTA and Amazon SES edge nodes, automated SPF/DKIM/DMARC
     lifecycle, Redis-locked warmup, blacklist monitoring, bi-directional Salesforce
     sync. Beat the Salesforce email tool it replaced on campaign response rates.
  3. Colloid Swarm (github.com/Sarb0Z/colloid-swarm): portable multi-agent engineering
     harness adopted company-wide by roughly 50 engineers; seven personas, three cost
     tiers, hostile review as an independent gate, adapters for Claude Code, Codex,
     Kimi, Copilot.
- **Other current work at Softaims (May 2025 to present):** Meridian voice onboarding
  agent on ElevenLabs Conversational AI (slot-walk state, replayable offline, scoped
  tool tokens, signed webhooks, exactly-once writes keyed on session + tool-call ID +
  body hash, Postgres advisory locks); Bitely food-delivery platform revamp; Playwright
  scraping 10,000+ records a day from 50+ sources; Instudi RAG recommendation system
  on OpenAI embeddings; LangChain deep-research agent framework; Engagemo LLM essay
  feedback system; NumPy/Pandas ETL in FastAPI; onboarding new hires.
- **Ebryx (June 2024 to April 2025, Invisily zero-trust platform):** the gateway work
  above; auto-update migration system for a multi-tenancy move; ZTNA component ported
  x86-64 to ARM (Raspberry Pi); device profiler packaged with Cython; MySQL pooling
  rewritten with RAII; policy evaluation cron to event-driven, 29% less redundant DB
  load (cProfile); Kafka risk-scoring pipeline feeding ML training and live inference;
  policy engine functional to OO; 2,000+ LoC removed, code smells down 37% (SonarQube).
- **Earlier:** Active Takeoff (Nov 2023 to Apr 2024, OCR + Elasticsearch), Systems
  Limited intern (2023), PITB intern (2022).
- **Public repos worth showing (all github.com/Sarb0Z/...):** colloid-swarm, WARPO
  (WhatsApp crypt12/14/15 + iOS backup export, 2 stars), npi-discovery-service
  (partition-aware NPPES bulk export, NestJS/Next.js/Redis/Terraform),
  EmotionRecognitionModel (CNN from scratch on FER2013, 28,709 images, 7 classes,
  real-time OpenCV, ONNX into Unity; final-year project), balloon-game-8086 (CGA buffer
  at 0xB800, IRQ 0 hook), music-tools (Discord streaming bot, 48 kHz PCM via ffmpeg),
  candycrush (C++/SFML). Do NOT feature ArtistFinder, HospitalServiceAPI, or the
  diabetes model (no accuracy claim exists for it).
- **Education:** BS Computer Science, FAST NUCES Lahore, 2020 to 2024. Leadership:
  Deputy Head of Conferences, Softec 2022; founder of the World Affairs Society at
  Karachi Grammar School (Renaissance 19).
- **Now:** learning Rust by building a terminal music player (no public repo yet, do
  not link one). Drawn to computer vision, robotics, autonomy, from the backend and
  infrastructure side.
- **Blog posts in `data/blog/`:** `silent-integration-failure` (2026-07-30, blocklist
  postmortem), `openrouter-routing-vs-data-residency` (2026-08-04),
  `gamified-asd-intervention` (2025-12-08), `latency-vs-cpu-time-multithreaded-profiling`
  (2024-12-09). The first two are reproduced LinkedIn posts; their wording is his.

## 3. Technical facts and build recipe

- Next.js 14 app router, `output: 'export'` static site, Contentlayer 2 for MDX,
  Tailwind 3, pliny utilities (search via kbar, formatDate). Deployed to GitHub Pages
  by the workflow on push to `main`; CNAME `www.abdulrafayzahid.dev`.
- **Node 20 is required** (`.nvmrc`). Build:
  `export PATH=~/.nvm/versions/node/v20.20.2/bin:$PATH && yarn install --immutable && yarn build:static`
  Output in `out/`. Serve locally with `python3 -m http.server 4173 --directory out`.
- **Prettier is a build gate:** `next build` runs eslint with `prettier/prettier` as an
  error, so run `yarn prettier --write <files>` before building or the build fails on
  formatting alone. Config: no semicolons, single quotes, width 100.
- **Type gate:** `siteMetadata.github`/`.linkedin` are typed `string | undefined`; pass
  `?? ''` to components that want `string`.
- **Screenshots:** Playwright is not a dependency of this repo. It is installed in
  `~/Projects/career-ops/node_modules`; run screenshot scripts from that directory
  against the local server (this is how the 2026-09-03 checks were done).
- **Fonts:** `next/font/google` in `app/layout.tsx`, fetched at build time (needs
  network; CI has it). Currently Inter, Instrument Serif (normal + italic), JetBrains
  Mono, exposed as `--font-inter`, `--font-instrument-serif`, `--font-jetbrains-mono`.
- **Push identity trap:** the machine's credential helper defaults to another GitHub
  account and gets 403 on this repo. Commit as
  `Sarb0Z <93070907+Sarb0Z@users.noreply.github.com>` (already pinned in this clone's
  local git config) and push with
  `git push "https://x-access-token:$(gh auth token --user Sarb0Z)@github.com/Sarb0Z/Portfolio.git" main`.
- **Known pre-existing noise:** `/_vercel/insights/script.js` 404s on the static export
  (`@vercel/analytics` was removed from the layout in the WIP; the 404 disappears with
  it). Bookmarks pages (`app/bookmarks/*`, `lib/raindrop.ts`) need `RAINDROP_ACCESS_TOKEN`
  and were not restyled. `app/not-found.tsx` was not restyled.
- **Dead after the WIP:** `components/DevIcons.tsx` and `components/LazyDevIcon.tsx` are
  no longer imported by any page; delete them if the WIP is kept (`components/techStack.ts`
  is still used as the `TechStack` type by `data/experienceData.ts`). `components/Card.tsx`
  and `components/LayoutWrapper.tsx` are already removed.
- **Social image:** `public/static/images/og.png` (1200x630, new, rendered from the
  design tokens) and `siteMetadata.socialBanner` points at it. The old
  `twitter-card.png` never existed on disk.

## 4. UI/UX requirements

### Hard rules, whichever direction is chosen
- No fabricated content. Every claim on the page maps to section 2.
- No em-dashes anywhere in copy. No "tech chips" or badge walls (Abdul dislikes chip
  lists on his resume; the same applies here). Stack goes in a plain mono line.
- Both light and dark mode must work; dark is the default theme
  (`siteMetadata.theme`). Never hardcode gray/zinc/blue; use tokens.
- Static export only. No server components that fetch at request time, no API routes.
- Mobile first-class: check 390px width, not just 1280px.
- Keep the existing routes and slugs (`/`, `/projects`, `/blog`, `/blog/<slug>`,
  `/tags`, `/tags/<tag>`, `/experience`, `/about`, `/bookmarks`, `/resume.pdf`).
- Contentlayer frontmatter for posts: `title`, `date`, `tags`, `summary`, `draft`,
  `authors: ['sarbz']`, `layout` (PostSimple or PostLayout).
- Performance: no third-party image services in the critical path; the WIP replaced
  GitHub OpenGraph screenshots with inline SVG covers for this reason.
- Accessibility: visible focus rings, semantic headings, alt text on the portrait,
  reduced-motion respected (a `.rise` helper exists and honours it).

### Direction A: editorial (the base of the uncommitted work)
Quiet, personal, professional. Serif display headings (Instrument Serif), Inter body,
JetBrains Mono for dates and labels, one orange accent, hairline dividers, generous
whitespace. Tokens live in `css/tailwind.css` (`--paper`, `--surface`, `--ink`,
`--muted`, `--line`, `--accent`) and `tailwind.config.js` exposes them as `bg-paper`,
`text-ink`, `border-line/15` etc. Primitives in `components/design.tsx` (`Eyebrow`,
`SectionHeading`, `Button`, `ArrowLink`, `Stat`, `Availability`). Generated SVG covers
in `components/Cover.tsx` (variants: fanout, mesh, tiers, partition, cipher, raster,
faces, wave, grid), one per project in `data/projectsData.ts`.

Pages as built: home = availability line, serif headline "Systems that hold up when
the traffic shows up.", portrait with a mono facts list, four-stat proof strip,
three featured projects with covers, six smaller pieces as tiles, latest three posts,
a "Now" row, a serif contact line. Work = alternating rows with covers. Experience =
single-column timeline with sticky mono date column. About = sticky portrait + facts
aside, prose on the right. Writing = list with sticky topics column. Post pages = one
prose column with mono meta. Header = name wordmark, five links, search, theme.
Footer = three columns.

Known gaps as of the latest session: none open in the site itself. Outside it: the resume
PDF predates Colloid Swarm (regenerate from career-ops), and the GitHub profile pins still
need the manual click.

### Direction B: terminal-inspired (spec; the touches above are the subset Abdul picked)
If "terminal UI/UX" meant a terminal aesthetic, these are the requirements. The goal
is a site that reads as a systems engineer's workspace without becoming a gimmick.
- Mono-first typography (JetBrains Mono for everything except maybe long prose, which
  may stay in Inter for readability). Colour: near-black paper, off-white ink, one
  phosphor-style accent (amber or green), used for prompts, cursors, and links only.
- Hero is a prompt, not a headline: a `$ whoami`-style line that types out the
  positioning sentence once (respect reduced motion: render instantly), followed by a
  static block of `key: value` facts (base, hours, open to, now). No fake shell that
  the user has to "use"; the whole site must be navigable by plain links.
- Navigation as a command palette: keep kbar (already installed, `SearchButton`) and
  make `Cmd/Ctrl+K` the primary way to jump; the visible nav stays as plain links.
- Section dividers as box-drawing or rule lines (`────`), section labels as mono
  uppercase with an index (`01 SELECTED WORK`). No cards with borders around every
  item; rows separated by hairlines.
- Projects rendered like a `ls -l` or a log: date, kind, name, one-line blurb, then an
  expandable detail. The SVG covers from Direction A can be reused as "diagrams".
- Numbers as the hero of each project (200 to 5,000; 200K+/day; 0xB800), set large in
  mono.
- Experience as a changelog: reverse-chronological, `YYYY-MM` markers, bullets kept.
- Writing list as a directory listing with dates; post pages switch to a normal prose
  column (mono headings, Inter body) so long posts stay readable.
- Light mode still required: paper background with dark ink and a darker accent; the
  terminal feel comes from typography and structure, not from forcing dark.
- Never: blinking cursors that never stop, scanlines, CRT curvature, ASCII portraits,
  matrix rain, or anything that slows first paint.

### Verification checklist before pushing any redesign
1. `yarn prettier --write` on changed files, then `yarn build:static` exits 0.
2. Serve `out/` and screenshot `/`, `/projects/`, `/experience/`, `/about/`, `/blog/`,
   one post, `/tags/`, `/404.html` at 1280px and 390px, dark AND light.
3. Grep the built HTML for the old email (`abdulrafay972`) and for em-dashes; both must
   be zero.
4. Click every link in the header, footer, and hero; `/resume.pdf` must return 200.
5. Push to `main` with the token URL above, wait for the Pages run
   (`gh run list -R Sarb0Z/Portfolio --workflow "Deploy to GitHub Pages" --limit 1`),
   then curl the live pages for a phrase from the new copy.

## 5. Related, outside this repo
- GitHub profile README (`Sarb0Z/Sarb0Z`) was rewritten the same day and renders; the
  six profile pins still need a manual "Customize your pins" click (no API exists):
  colloid-swarm, WARPO, npi-discovery-service, EmotionRecognitionModel,
  balloon-game-8086, music-tools.
- `colloid-swarm` had a `.github/README.md` shadowing its real README on GitHub; fixed.
