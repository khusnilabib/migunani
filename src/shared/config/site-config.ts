// src/shared/config/site-config.ts — global site configuration.

import { getPublicEnv } from './env';

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  locale: string;
  twitterHandle: string;
  categories: string[];
}

export const siteConfig: SiteConfig = {
  name: 'Migunani',
  shortName: 'Migunani',
  description:
    'Browser-first productivity tools. Privacy-respecting, fast, and free. No accounts required for core tasks.',
  url: getPublicEnv().siteUrl,
  locale: 'en_US',
  twitterHandle: '@migunani',
  categories: ['image', 'pdf', 'developer', 'text', 'converters', 'seo', 'calculators'],
};
