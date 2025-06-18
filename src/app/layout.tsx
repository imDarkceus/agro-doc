import type {Metadata} from 'next';
import { Noto_Sans_Bengali } from 'next/font/google'; // Using Inter as a fallback good for Bangla
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DiseaseHistoryProvider } from '@/contexts/DiseaseHistoryContext';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '700'], // optional
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={notoBengali.className}>
        <SidebarProvider>
          <DiseaseHistoryProvider>
            {children}
            <Toaster />
          </DiseaseHistoryProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
