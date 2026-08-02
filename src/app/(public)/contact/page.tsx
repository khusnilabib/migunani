// src/app/(public)/contact/page.tsx — Contact page

import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Bug, Lightbulb, ShieldCheck, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeading } from '@/shared/components/section-heading';
import { routes } from '@/shared/config/routes';
import { siteConfig } from '@/shared/config/site-config';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Migunani team. We welcome feedback, bug reports, and feature requests.',
  alternates: { canonical: `${siteConfig.url}/contact` },
};

const CONTACT_OPTIONS = [
  { icon: Mail, title: 'General inquiries', description: 'Questions about Migunani, partnerships, or press.', email: 'hello@migunani.app' },
  { icon: Bug, title: 'Bug reports', description: 'Found a bug? Let us know so we can fix it.', email: 'bugs@migunani.app' },
  { icon: Lightbulb, title: 'Feature requests', description: 'Have an idea for a new tool or improvement?', email: 'features@migunani.app' },
  { icon: ShieldCheck, title: 'Privacy & security', description: 'Privacy questions or security vulnerability reports.', email: 'privacy@migunani.app' },
];

export default function ContactPage() {
  return (
    <main className="flex-1 animate-page-enter">
      <PageContainer className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href={routes.home} className="hover:text-foreground">Home</Link></li>
              <li aria-hidden>›</li>
              <li className="text-foreground">Contact</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight text-balance">Contact us</h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            We'd love to hear from you. Whether you have a question, found a bug, or want to suggest a new tool, we're here to help.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {CONTACT_OPTIONS.map((option) => (
              <Card key={option.title} className="card-interactive">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                      <option.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold">{option.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
                      <a href={`mailto:${option.email}`} className="mt-3 inline-block text-sm font-medium text-accent hover:underline">{option.email}</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <Card className="bg-muted/30">
            <CardContent className="flex items-center gap-4 p-6">
              <MessageSquare className="h-5 w-5 shrink-0 text-accent" aria-hidden />
              <div>
                <p className="text-sm font-semibold">Response time</p>
                <p className="mt-1 text-xs text-muted-foreground">We typically respond within 1-2 business days. For urgent security issues, include "URGENT" in the subject line.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </main>
  );
}
