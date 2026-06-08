import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import '../styles/globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TrackSpike USA - Premium Athletic Footwear',
    template: '%s | TrackSpike USA',
  },
  description: 'Premium athletic and casual footwear for the modern athlete. Shop our collection of running shoes, sneakers, and more.',
  keywords: ['shoes', 'athletic', 'running', 'sneakers', 'footwear', ' TrackSpike'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trackspikeusa.com',
    siteName: 'TrackSpike USA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
