import type { Metadata } from 'next';
import { Archivo, Inter } from 'next/font/google';
import '../styles/globals.css';

// Display face — sporty grotesque, goes heavy for streetwear impact
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://trackspike-storefront.vercel.app'),
  title: {
    default: 'TrackSpike — Run Your Own Race',
    template: '%s | TrackSpike',
  },
  description:
    'Performance footwear built for those who move different. Engineered to break records, designed to break necks. Shop running, casual, trail and training kicks.',
  keywords: [
    'shoes',
    'sneakers',
    'running shoes',
    'streetwear',
    'athletic footwear',
    'TrackSpike',
    'trail shoes',
    'training shoes',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trackspike-storefront.vercel.app',
    siteName: 'TrackSpike',
    title: 'TrackSpike — Run Your Own Race',
    description:
      'Performance footwear built for those who move different. Engineered to break records.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrackSpike — Run Your Own Race',
    description: 'Performance footwear built for those who move different.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
