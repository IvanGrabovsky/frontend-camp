import type { Metadata } from 'next';
import './globals.css';
import { ThemeInitScript } from '@/components/ThemeToggle';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { Inter, Fira_Code } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' });
const firaCode = Fira_Code({ subsets: ['latin', 'cyrillic'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Frontend Learning Hub — HTML, CSS, JavaScript, Next.js',
  description:
    'Повний навчальний шлях: HTML, CSS, JavaScript, методи масивів та Next.js. Інтерактивні уроки з практикою.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning className={cn(inter.variable, firaCode.variable)}>
      <head>
        <ThemeInitScript />
      </head>
      <body>
        <AuthProvider>
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
