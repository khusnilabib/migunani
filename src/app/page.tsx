// src/app/page.tsx — Premium homepage (Sprint 8 — max 6 sections).

import { organizationJsonLd, websiteJsonLd } from '@/shared/lib/json-ld';
import { HomeHero } from '@/shared/components/home/home-hero';
import { FeaturedTools } from '@/shared/components/home/featured-tools';
import { PopularCategories } from '@/shared/components/home/popular-categories';
import { WhyChooseUs } from '@/shared/components/home/why-choose-us';
import { FaqSection } from '@/shared/components/home/faq-section';
import { FinalCta } from '@/shared/components/home/final-cta';

export default function HomePage() {
  const orgLd = organizationJsonLd();
  const siteLd = websiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
      />

      {/* 1. Hero — full viewport, search visible */}
      <HomeHero />

      {/* 2. Featured Tools — 6 premium cards */}
      <FeaturedTools />

      {/* 3. Popular Categories — 4 clean cards */}
      <PopularCategories />

      {/* 4. Why Choose Migunani — 3 compact value cards */}
      <WhyChooseUs />

      {/* 5. FAQ — 5 questions max */}
      <FaqSection />

      {/* 6. CTA with newsletter */}
      <FinalCta />

      {/* Footer (from layout) */}
    </>
  );
}
