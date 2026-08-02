// src/app/(auth)/register/page.tsx — Register page (server component shell).

import type { Metadata } from 'next';
import { RegisterForm } from './register-form';

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create a free Migunani account to track tools, history, and favorites.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
