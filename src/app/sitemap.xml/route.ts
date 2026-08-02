// src/app/sitemap.xml/route.ts — Dynamic sitemap (Phase 7 SEO).
import { NextResponse } from 'next/server';
import { sitemapEntries } from '@/generated/sitemap';
import { siteConfig } from '@/shared/config/site-config';

export const runtime = 'nodejs';
export const revalidate = 3600; // 1 hour

export async function GET(): Promise<Response> {
  const now = new Date().toISOString();

  // Build full sitemap including all tools + static pages
  const urls: Array<{
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: number;
  }> = [
    { loc: siteConfig.url, lastmod: now, changefreq: 'weekly', priority: 1.0 },
    { loc: `${siteConfig.url}/roadmap`, lastmod: now, changefreq: 'weekly', priority: 0.7 },
    { loc: `${siteConfig.url}/changelog`, lastmod: now, changefreq: 'weekly', priority: 0.7 },
    { loc: `${siteConfig.url}/login`, lastmod: now, changefreq: 'monthly', priority: 0.3 },
    { loc: `${siteConfig.url}/register`, lastmod: now, changefreq: 'monthly', priority: 0.3 },
    { loc: `${siteConfig.url}/dashboard`, lastmod: now, changefreq: 'weekly', priority: 0.5 },
  ];

  // Add category pages
  const categories = ['image'];
  for (const cat of categories) {
    urls.push({
      loc: `${siteConfig.url}/tools/${cat}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.7,
    });
  }

  // Add all tool pages from generated sitemap
  for (const entry of sitemapEntries) {
    urls.push({
      loc: entry.url,
      lastmod: entry.lastModified,
      changefreq: entry.changeFrequency,
      priority: entry.priority,
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
