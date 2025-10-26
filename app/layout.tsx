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
  icons: {
    icon: '/logo.png',
  },
  keywords: ['admin', 'dashboard', 'KZARRÈ'],
  authors: [{ name: 'Creonox', url: 'https://www.creonox.in' }],
  viewport: { width: 'device-width', initialScale: 1 },
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunitoSans.variable} font-nunito-sans`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content={metadata.description ?? undefined} />
        <meta name="theme-color" content={metadata.themeColor as string} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* resolve icon href from metadata.icons which may be a string, an array, or an object */}
        <link
          rel="icon"
          href={
            typeof metadata.icons === 'string'
              ? metadata.icons
              : Array.isArray(metadata.icons)
              ? (metadata.icons[0] as any)?.url ?? '/logo.png'
              : (metadata.icons as any)?.icon ?? '/logo.png'
          }
        />
        <title>{String(metadata.title ?? '')}</title>
      </head>
      <body className="antialiased bg-gray-50">
        {children}
        <SpeedInsights /> {/* Vercel SpeedInsights */}
      </body>
    </html>
  );
}
