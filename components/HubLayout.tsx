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
      <main className="container">{children}</main>
      <SiteFooter />
    </>
  );
}
