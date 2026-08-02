// src/app/layout.tsx — Root layout with premium design system.

import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { PlatformProvider } from '@/shared/providers/platform-provider';
import { SiteHeader } from '@/shared/components/site-header';
import { SiteFooter } from '@/shared/components/site-footer';
import { SearchOverlay } from '@/shared/components/search-overlay';
import { ToastProviders } from '@/shared/components/toast-providers';
import { siteConfig } from '@/shared/config/site-config';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.description}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'productivity tools',
    'image tools',
    'image resizer',
    'image compressor',
    'image converter',
    'browser tools',
    'online tools',
    'free tools',
    'no signup',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/app-icon.svg',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: '/og-default.svg', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-default.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': `${siteConfig.url}/feed.xml`,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
};

const noFoucScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFoucScript }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <PlatformProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div id="main-content" className="flex flex-1 flex-col">
              {children}
            </div>
            <SiteFooter />
          </div>
          <SearchOverlay />
          <ToastProviders />
        </PlatformProvider>
      </body>
    </html>
  );
}
