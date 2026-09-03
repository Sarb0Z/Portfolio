import Link from '@/components/Link'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import { ProjectRow, ProjectLog } from '@/components/ProjectRow'
import {
  Availability,
  Button,
  FactList,
  SectionHeading,
  Stat,
  ArrowLink,
} from '@/components/design'

const MAX_POSTS = 3

export default function Home({ posts }) {
  const featured = projectsData.filter((p) => p.featured)
  const rest = projectsData.filter((p) => !p.featured)

  return (
    <>
      {/* Hero */}
      <section className="rise grid gap-10 pb-16 md:grid-cols-12 md:items-end md:pb-24">
        <div className="md:col-span-8">
          <Availability />
          <h1 className="display mt-5 text-[2.75rem] leading-[1.02] md:text-7xl">
            Systems that hold up <em className="text-accent">when the traffic shows up.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            I&apos;m Abdul Rafay Zahid, a backend and systems engineer in Karachi. I scale C++
            network gateways, build mail infrastructure that sends 200K+ emails a day, and write the
            plumbing under AI products.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/resume.pdf">Resume (PDF)</Button>
            <Button href={siteMetadata.github ?? ''} variant="ghost">
              GitHub
            </Button>
            <Button href={siteMetadata.linkedin ?? ''} variant="ghost">
              LinkedIn
            </Button>
            <Button href={`mailto:${siteMetadata.email}`} variant="ghost">
              {siteMetadata.email}
            </Button>
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="relative mx-auto max-w-[18rem] md:max-w-none">
            <Image
              src="/static/images/avatar.png"
              alt="Abdul Rafay Zahid"
              width={894}
              height={974}
              priority
              className="w-full rounded-lg border hairline object-cover grayscale transition duration-500 hover:grayscale-0"
            />
            <FactList
              className="mt-5"
              items={[
                ['role', 'backend and systems engineer'],
                ['now', 'Software Engineer, Softaims'],
                ['base', 'Karachi, UTC+5'],
                ['hours', 'Gulf and EU overlap'],
                ['open to', 'remote, EOR, sponsored relocation'],
                ['learning', 'Rust, via a terminal music player'],
              ]}
            />
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="grid grid-cols-2 gap-8 border-y hairline py-8 md:grid-cols-4">
        <Stat value="200 → 5,000" label="concurrent TLS clients on one C++ gateway" />
        <Stat value="200K+" label="emails a day through infrastructure I built solo" />
        <Stat value="1,000+" label="sending domains with automated DNS lifecycle" />
        <Stat value="~50" label="engineers on the Colloid Swarm harness" />
      </section>

      {/* Selected work */}
      <section className="pt-20">
        <SectionHeading
          index="01"
          title="Selected work"
          aside={<ArrowLink href="/projects">All work</ArrowLink>}
        />
        {featured.map((p, i) => (
          <ProjectRow key={p.id} project={p} flip={i % 2 === 1} />
        ))}
      </section>

      {/* More */}
      <section className="pt-20">
        <SectionHeading
          index="02"
          title="Smaller pieces"
          aside={<span className="font-mono text-xs">click a row to expand</span>}
        />
        <div className="pt-8">
          <ProjectLog projects={rest} />
        </div>
      </section>

      {/* Writing */}
      <section className="pt-20">
        <SectionHeading
          index="03"
          title="Writing"
          aside={<ArrowLink href="/blog">All posts</ArrowLink>}
        />
        <ul>
          {posts.slice(0, MAX_POSTS).map((post) => {
            const { slug, date, title, summary } = post
            return (
              <li
                key={slug}
                className="grid gap-2 border-t hairline py-6 first:border-t-0 md:grid-cols-[9rem_1fr] md:gap-8"
              >
                <time dateTime={date} className="font-mono text-xs tabular-nums text-muted">
                  {date.slice(0, 10)}
                </time>
                <div>
                  <h3 className="display text-2xl">
                    <Link href={`/blog/${slug}`} className="transition-colors hover:text-accent">
                      {title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[15px] text-muted">{summary}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Now */}
      <section className="pt-20">
        <SectionHeading index="04" title="Now" />
        <div className="grid gap-8 pt-8 md:grid-cols-3">
          <div>
            <p className="eyebrow">Building</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/85">
              A voice onboarding agent whose backend keeps the whole interview replayable offline,
              with exactly-once writes and per-session locking.
            </p>
          </div>
          <div>
            <p className="eyebrow">Learning</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/85">
              Rust, by building a terminal music player. I already think in ownership and lifetimes
              from C++; Rust makes the compiler check it.
            </p>
          </div>
          <div>
            <p className="eyebrow">Drawn to</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/85">
              Computer vision, robotics, and autonomy, specifically the backend and infrastructure
              side of hard-tech.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mt-24 border-t hairline pt-12">
        <p className="display max-w-3xl text-3xl leading-tight md:text-5xl">
          Building something that has to hold up under load?{' '}
          <a href={`mailto:${siteMetadata.email}`} className="link-underline hover:text-accent">
            Let&apos;s talk.
          </a>
        </p>
        <p className="mt-4 font-mono text-xs text-muted">
          {siteMetadata.email}
          <span className="mx-2">&middot;</span>
          replies within a day, Karachi time
        </p>
      </section>
    </>
  )
}
