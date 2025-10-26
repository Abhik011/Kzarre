import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "KZARRÈ Admin",
  description: "Admin Dashboard Platform",
  icons: {
    icon: "/logo.png",
  },
  keywords: ["Admin Dashboard", "KZARRÈ", "Management", "Next.js"],
  authors: [{ name: "Creonox Technologies", url: "https://www.creonox.in" }],
  themeColor: "#000000",
  openGraph: {
    title: "KZARRÈ Admin",
    description: "Admin Dashboard Platform",
    url: "https://www.creonox.in",
    siteName: "KZARRÈ",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KZARRÈ Admin",
    description: "Admin Dashboard Platform",
    images: ["/og-image.png"],
    site: "@creonox",
    creator: "@creonox",
  },
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
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Creonox Technologies" />
        <meta
          name="description"
          content="Admin Dashboard Platform"
        />
        <meta name="keywords" content="Admin Dashboard, KZARRÈ, Management, Next.js" />
        <title>KZARRÈ Admin</title>
      </head>
      <body
        className={`${nunitoSans.variable} font-nunito-sans antialiased bg-gray-50`}
      >
        {children}
        {/* Performance monitoring */}
        <SpeedInsights />
      </body>
    </html>
  );
}
