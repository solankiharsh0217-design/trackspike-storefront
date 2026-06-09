import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the team obsessed with going faster. Open roles at TrackSpike.',
};

const roles = [
  { title: 'Senior Footwear Designer', team: 'Product', location: 'Portland, OR', type: 'Full-time' },
  { title: 'Materials R&D Engineer', team: 'Innovation', location: 'Portland, OR', type: 'Full-time' },
  { title: 'Performance Marketing Lead', team: 'Growth', location: 'Remote (US)', type: 'Full-time' },
  { title: 'Retail Experience Manager', team: 'Retail', location: 'New York, NY', type: 'Full-time' },
  { title: 'Community & Athletes Coordinator', team: 'Brand', location: 'Remote (US)', type: 'Contract' },
];

const perks = [
  'Unlimited PTO & 4-day summer Fridays',
  'Free pairs every season',
  'Full health, dental & vision',
  'Annual race-entry stipend',
  '401(k) with 5% match',
  'Home-office & gear budget',
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        eyebrow="Careers"
        title={<>Build What's<br />Next</>}
        subtitle="We're a small team that ships fast and obsesses over the details. If milliseconds excite you, we should talk."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Perks */}
        <h2 className="mb-6 font-heading text-2xl font-black uppercase tracking-tight">Why TrackSpike</h2>
        <div className="mb-16 grid gap-3 sm:grid-cols-2">
          {perks.map((perk) => (
            <div
              key={perk}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {perk}
            </div>
          ))}
        </div>

        {/* Open roles */}
        <h2 className="mb-6 font-heading text-2xl font-black uppercase tracking-tight">Open Roles</h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {roles.map((role) => (
            <Link
              key={role.title}
              href="/contact"
              className="group flex flex-col gap-2 py-6 transition-colors hover:bg-white/[0.015] sm:flex-row sm:items-center sm:justify-between sm:px-2"
            >
              <div>
                <h3 className="font-heading text-lg font-bold transition-colors group-hover:text-accent">
                  {role.title}
                </h3>
                <p className="text-sm text-white/40">{role.team}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm text-white/50">{role.location}</span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-wider text-white/50">
                  {role.type}
                </span>
                <ArrowUpRight className="h-5 w-5 text-accent transition-transform group-hover:rotate-45" />
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-white/40">
          Don&apos;t see your role?{' '}
          <Link href="/contact" className="font-semibold text-accent hover:underline">
            Send us a note anyway.
          </Link>
        </p>
      </section>
    </div>
  );
}
