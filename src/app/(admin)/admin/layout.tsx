// src/app/(admin)/admin/layout.tsx — Premium admin layout with collapsible sidebar.

import type { ReactNode } from 'react';
import { BrandLogo } from '@/shared/components/brand-logo';
import { AdminSidebarClient } from './admin-sidebar-client';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Console — Migunani',
  description: 'Operational control center for the Migunani platform.',
  robots: { index: false, follow: false },
};

// Icons are referenced by string key to avoid passing component functions
// from server to client (Next.js App Router limitation).
const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/users', label: 'Users', icon: 'users' },
  { href: '/admin/tools', label: 'Tools', icon: 'tools' },
  { href: '/admin/seo', label: 'SEO', icon: 'seo' },
  { href: '/admin/analytics', label: 'Analytics', icon: 'analytics' },
  { href: '/admin/revenue', label: 'Revenue', icon: 'analytics' },
  { href: '/admin/growth', label: 'Growth', icon: 'analytics' },
  { href: '/admin/audit', label: 'Audit Trail', icon: 'audit' },
  { href: '/admin/flags', label: 'Feature Flags', icon: 'flags' },
  { href: '/admin/monitoring', label: 'Monitoring', icon: 'monitoring' },
  { href: '/admin/settings', label: 'Settings', icon: 'settings' },
  { href: '/admin/content', label: 'Content', icon: 'content' },
  { href: '/admin/health', label: 'System Health', icon: 'health' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              Admin
            </span>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              View site →
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex flex-1">
        <AdminSidebarClient items={NAV_ITEMS} />

        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
