import { SiteFooter, SiteHeader } from '@/components/SiteShell';

export function HubLayout({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <>
      <SiteHeader breadcrumb={breadcrumb} />
      <main className="container max-w-6xl mx-auto px-4 py-12">{children}</main>
      <SiteFooter />
    </>
  );
}
