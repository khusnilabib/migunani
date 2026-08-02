// src/shared/lib/json-ld.ts — JSON-LD structured data builders (Phase 7 SEO).
// Generates structured data for Organization, WebSite, SoftwareApplication,
// BreadcrumbList, FAQPage, and SearchAction per schema.org spec.

import { siteConfig } from '@/shared/config/site-config';
import type { ToolManifest } from '@packages/types';

type JsonLd = Record<string, unknown>;

// ─── Organization ────────────────────────────────────────────────────────────
export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`,
      width: 512,
      height: 512,
    },
    sameAs: [
      `https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`,
      'https://github.com/migunani',
    ],
  };
}

// ─── WebSite (with SearchAction) ─────────────────────────────────────────────
export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ─── SoftwareApplication (per tool) ──────────────────────────────────────────
export function softwareApplicationJsonLd(manifest: ToolManifest): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${siteConfig.url}/tools/${manifest.category}/${manifest.slug}#software`,
    name: manifest.title,
    description: manifest.description,
    url: `${siteConfig.url}/tools/${manifest.category}/${manifest.slug}`,
    applicationCategory: manifest.seo.structuredData.applicationCategory || 'Utilities',
    operatingSystem: 'Web',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    featureList: manifest.relatedTools,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  };
}

// ─── BreadcrumbList ──────────────────────────────────────────────────────────
export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── FAQPage ─────────────────────────────────────────────────────────────────
export function faqJsonLd(faqs: Array<{ question: string; answer: string }>): JsonLd | null {
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

// ─── Combined (for tool pages) ───────────────────────────────────────────────
export function toolPageJsonLd(manifest: ToolManifest): JsonLd[] {
  const items: JsonLd[] = [softwareApplicationJsonLd(manifest)];

  if (manifest.seo.breadcrumb.length > 0) {
    items.push(
      breadcrumbJsonLd(
        manifest.seo.breadcrumb.map((b) => ({ name: b.name, url: b.url })),
      ),
    );
  }

  const faq = faqJsonLd(manifest.seo.faq);
  if (faq) items.push(faq);

  return items;
}

// ─── Serialize to <script> tag content ────────────────────────────────────────
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  const arr = Array.isArray(data) ? data : [data];
  // Use @graph to combine multiple entities cleanly
  if (arr.length === 1) return JSON.stringify(arr[0]);
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': arr });
}
