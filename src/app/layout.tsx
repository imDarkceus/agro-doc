import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a fallback good for Bangla
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DiseaseHistoryProvider } from '@/contexts/DiseaseHistoryContext';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin', 'bengali'], // Added bengali subset
  variable: '--font-inter',
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
      <body className={`${inter.variable} font-sans antialiased`}>
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
