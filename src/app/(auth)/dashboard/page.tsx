// src/app/(auth)/dashboard/page.tsx — User dashboard (server component).
//
// Protected: when Supabase is configured, visitors without a session are
// redirected to /login. When Supabase is NOT configured, the dashboard
// renders in a "preview" mode with a mock guest so the UI is still visible
// in the sandbox.

import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getServerUser } from '@/identity/lib/supabase-server';
import { isSupabaseConfigured } from '@/shared/config/env';
import { routes } from '@/shared/config/routes';
import { DashboardView } from './dashboard-view';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Migunani dashboard — recent tools, history, favorites, and account.',
};

export default async function DashboardPage() {
  const configured = isSupabaseConfigured();

  if (configured) {
    const user = await getServerUser();
    if (!user) {
      redirect(routes.login);
    }
    return (
      <DashboardView
        user={user}
        demo={false}
        memberSince={new Date().toISOString()}
      />
    );
  }

  // Preview mode (Supabase not configured).
  return (
    <DashboardView
      user={{ id: 'guest-preview', email: 'guest@example.com', role: 'guest' }}
      demo
      memberSince={new Date().toISOString()}
    />
  );
}
