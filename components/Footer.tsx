import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="mt-24 border-t hairline">
      <div className="mx-auto grid w-full max-w-site gap-10 px-5 py-12 md:grid-cols-3 md:px-8">
        <div className="space-y-3">
          <p className="display text-2xl">Abdul Rafay Zahid</p>
          <p className="max-w-xs text-sm text-muted">
            Backend and systems engineer in Karachi. Open to remote work and sponsored relocation.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <ul className="space-y-2">
            <li className="eyebrow">Site</li>
            <li>
              <Link href="/projects" className="link-underline">
                Work
              </Link>
            </li>
            <li>
              <Link href="/blog" className="link-underline">
                Writing
              </Link>
            </li>
            <li>
              <Link href="/experience" className="link-underline">
                Experience
              </Link>
            </li>
            <li>
              <Link href="/about" className="link-underline">
                About
              </Link>
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="eyebrow">Elsewhere</li>
            <li>
              <Link href={siteMetadata.github ?? ''} className="link-underline">
                GitHub
              </Link>
            </li>
            <li>
              <Link href={siteMetadata.linkedin ?? ''} className="link-underline">
                LinkedIn
              </Link>
            </li>
            <li>
              <a href="/resume.pdf" className="link-underline">
                Resume (PDF)
              </a>
            </li>
            <li>
              <a href={`mailto:${siteMetadata.email}`} className="link-underline">
                Email
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-2 text-sm text-muted md:text-right">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]">
            Karachi &middot; UTC+5
          </p>
          <p>&copy; {new Date().getFullYear()} Abdul Rafay Zahid</p>
          <p>Next.js, Contentlayer, GitHub Pages.</p>
          <p className="hidden font-mono text-[11px] md:block">
            <kbd className="kbd">⌘</kbd> <kbd className="kbd">K</kbd> jumps anywhere
          </p>
        </div>
      </div>
    </footer>
  )
}
