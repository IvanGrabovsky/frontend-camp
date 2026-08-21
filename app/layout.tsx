import type { Metadata } from 'next';
import { courseStylesHref } from '@/components/SiteShell';
import { ThemeInitScript } from '@/components/ThemeToggle';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Frontend Learning Hub — HTML, CSS, JavaScript, Next.js',
  description:
    'Повний навчальний шлях: HTML, CSS, JavaScript, методи масивів та Next.js. Інтерактивні уроки з практикою.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <ThemeInitScript />
        <link rel="stylesheet" href={courseStylesHref()} />
      </head>
      <body>{children}</body>
    </html>
  );
}
