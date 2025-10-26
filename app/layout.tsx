import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = {
  title: 'KZARRÈ Admin',
  description: 'Admin Dashboard Platform',
  icons: { icon: '/logo.png' },
  keywords: ['admin', 'dashboard', 'KZARRÈ'],
  authors: [{ name: 'Creonox', url: 'https://www.creonox.in' }],
  viewport: { width: 'device-width', initialScale: 1 },
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeColorContent =
    typeof metadata.themeColor === 'string'
      ? metadata.themeColor
      : Array.isArray(metadata.themeColor)
      ? metadata.themeColor
          .map((tc) => (typeof tc === 'string' ? tc : (tc as any).color))
          .filter(Boolean)
          .join(', ')
      : metadata.themeColor && typeof metadata.themeColor === 'object' && 'color' in metadata.themeColor
      ? (metadata.themeColor as any).color
      : undefined;

  // Resolve favicon href from metadata.icons safely across possible types
  const faviconHref = (() => {
    const icons = metadata.icons;
    if (!icons) return '/logo.png';
    if (typeof icons === 'string') return icons;
    if (Array.isArray(icons)) {
      const first = icons[0];
      return typeof first === 'string' ? first : (first as any).url || (first as any).icon || '/logo.png';
    }
    return (icons as any).icon || (icons as any).url || '/logo.png';
  })();

  return (
    <html lang="en" className={`${nunitoSans.variable} font-nunito-sans`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content={metadata.description || undefined} />
        <meta name="theme-color" content={themeColorContent || undefined} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={faviconHref} />
      </head>
      <body className="antialiased bg-gray-50">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
