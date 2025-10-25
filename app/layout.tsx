import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KZARRÈ Admin',
  description: 'Admin Dashboard Platform',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}