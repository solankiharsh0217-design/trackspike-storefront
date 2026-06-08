import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import '../styles/globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'TrackSpike USA - Premium Athletic Footwear',
    template: '%s | TrackSpike USA',
  },
  description:
    'Premium athletic and casual footwear for the modern athlete. Engineered for performance, designed for style. Shop our collection of running shoes, sneakers, and more.',
  keywords: [
    'shoes',
    'athletic',
    'running',
    'sneakers',
    'footwear',
    'TrackSpike',
    'premium',
    'sports shoes',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trackspikeusa.com',
    siteName: 'TrackSpike USA',
    title: 'TrackSpike USA - Premium Athletic Footwear',
    description:
      'Premium athletic and casual footwear for the modern athlete.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
