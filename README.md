## Personal Blog

A Next.js 14 portfolio and blog site with MDX content, Tailwind CSS styling, and multiple deployment options.

> **Note:** This is the Next.js version. A SvelteKit version is also available at [abdulrafayzahid.dev](abdulrafayzahid.dev/) — [Repo](https://github.com/Sarb0z/Portfolio)

## Features

- 📝 MDX blog posts with syntax highlighting
- 🎨 Tailwind CSS with dark mode
- 🔍 Full-text search with KBar
- 💬 Giscus comments
- 📊 Umami analytics
- 🚀 Multiple deployment targets

## Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Type check
yarn typecheck

# Lint
yarn lint:check
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:

- `NEXT_UMAMI_ID` - Umami analytics website ID
- `NEXT_PUBLIC_GISCUS_*` - Giscus comments configuration

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables in project settings
4. Deploy

Or use GitHub Actions:

```bash
# Add these secrets to GitHub:
VERCEL_ORG_ID=<your-org-id>
VERCEL_PROJECT_ID=<your-project-id>
VERCEL_TOKEN=<your-vercel-token>
```

### GitHub Pages

1. Go to Repository Settings → Pages
2. Set source to "GitHub Actions"
3. Add secrets for environment variables
4. Push to main branch

The workflow builds a static export and deploys to GitHub Pages.

### Dokku (Contabo/Self-hosted)

1. Install Dokku on your server
2. Create app: `dokku apps:create portfolio`
3. Set buildpack: `dokku buildpacks:add portfolio https://github.com/heroku/heroku-buildpack-nodejs`
4. Configure environment variables
5. Add GitHub secrets:
   - `DOKKU_SSH_PRIVATE_KEY`
   - `DOKKU_HOST`
   - `DOKKU_APP_NAME`

See `.github/workflows/deploy-dokku.yml` for detailed setup instructions.

## CI/CD Workflows

| Workflow              | Trigger      | Description                         |
| --------------------- | ------------ | ----------------------------------- |
| `ci.yml`              | PR, push     | Lint, typecheck, build verification |
| `deploy-vercel.yml`   | push to main | Deploy to Vercel                    |
| `deploy-gh-pages.yml` | push to main | Deploy to GitHub Pages              |
| `deploy-dokku.yml`    | push to main | Deploy to Dokku/Contabo             |

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Content:** Contentlayer + MDX
- **Comments:** Giscus
- **Analytics:** Umami
- **Search:** KBar
- **Deployment:** Vercel, GitHub Pages, Dokku

## License

MIT
