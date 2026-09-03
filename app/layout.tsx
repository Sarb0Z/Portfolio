import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import CommandPalette from '@/components/CommandPalette'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#d04614" />
      <meta name="msapplication-TileColor" content="#0b0b0c" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#faf9f6" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0b0b0c" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="min-h-screen bg-paper font-sans text-ink antialiased transition-colors duration-200">
        <ThemeProviders>
          <CommandPalette>
            <Header />
            <main className="mx-auto w-full max-w-site px-5 pt-24 md:px-8 md:pt-28">
              {children}
            </main>
            <Footer />
          </CommandPalette>
        </ThemeProviders>
      </body>
    </html>
  )
}
