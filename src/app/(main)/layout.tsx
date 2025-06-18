import type { ReactNode } from 'react';
import { AppClientLayout } from '@/components/layout/AppClientLayout';

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return <AppClientLayout>{children}</AppClientLayout>;
}
