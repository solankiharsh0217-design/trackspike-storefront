import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';

export const metadata: Metadata = {
  title: 'Press',
  description: 'TrackSpike in the press, plus media resources and brand assets.',
};

const coverage = [
  { outlet: 'Runner’s World', quote: '“The energy return is genuinely the best we’ve tested this year.”', date: 'May 2026' },
  { outlet: 'Hypebeast', quote: '“TrackSpike is quietly building the most exciting silhouette in performance.”', date: 'Apr 2026' },
  { outlet: 'GQ', quote: '“Proof that a performance shoe can look this good off the track.”', date: 'Mar 2026' },
  { outlet: 'Fast Company', quote: '“A masterclass in building a brand community from zero.”', date: 'Feb 2026' },
];

const facts = [
  { label: 'Founded', value: '2024' },
  { label: 'HQ', value: 'Portland, OR' },
  { label: 'Athletes', value: '50,000+' },
  { label: 'Countries', value: '40+' },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        eyebrow="Press"
        title="In the News"
        subtitle="For interviews, product samples, or brand assets, reach our press team at press@trackspike.com."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Quick facts */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
              <p className="font-heading text-3xl font-black text-accent">{f.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-white/40">{f.label}</p>
            </div>
          ))}
        </div>

        {/* Coverage */}
        <h2 className="mb-6 font-heading text-2xl font-black uppercase tracking-tight">Coverage</h2>
        <div className="space-y-4">
          {coverage.map((c) => (
            <div key={c.outlet} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-heading text-lg font-bold">{c.outlet}</p>
                <span className="text-xs uppercase tracking-wider text-white/30">{c.date}</span>
              </div>
              <p className="text-white/55">{c.quote}</p>
            </div>
          ))}
        </div>

        {/* Press kit */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:flex-row">
          <div>
            <h3 className="font-heading text-xl font-black uppercase">Media Kit</h3>
            <p className="mt-1 text-white/45">Logos, product imagery, and brand guidelines.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-black"
          >
            <Download className="h-4 w-4" />
            Request Kit
          </Link>
        </div>

        <p className="mt-10 text-center text-white/40">
          Media enquiries:{' '}
          <a href="mailto:press@trackspike.com" className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">
            press@trackspike.com <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </p>
      </section>
    </div>
  );
}
