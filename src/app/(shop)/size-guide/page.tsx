import type { Metadata } from 'next';
import { Ruler, Footprints, ArrowLeftRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';

export const metadata: Metadata = {
  title: 'Size Guide',
  description: 'Find your perfect TrackSpike fit with our US/EU/UK/CM conversion chart.',
};

const rows = [
  { us: '6', eu: '38.5', uk: '5.5', cm: '24' },
  { us: '7', eu: '40', uk: '6', cm: '25' },
  { us: '8', eu: '41', uk: '7', cm: '26' },
  { us: '9', eu: '42.5', uk: '8', cm: '27' },
  { us: '10', eu: '44', uk: '9', cm: '28' },
  { us: '11', eu: '45', uk: '10', cm: '29' },
  { us: '12', eu: '46', uk: '11', cm: '30' },
  { us: '13', eu: '47.5', uk: '12', cm: '31' },
];

const tips = [
  { icon: Footprints, title: 'Measure Late', text: 'Feet swell during the day — measure in the evening for the truest fit.' },
  { icon: Ruler, title: 'Heel to Toe', text: 'Stand on paper, mark heel and longest toe, measure the distance in cm.' },
  { icon: ArrowLeftRight, title: 'Between Sizes?', text: 'Size up half a size for a roomier, more forgiving fit.' },
];

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        eyebrow="Fit"
        title="Size Guide"
        subtitle="Get it right the first time. Our shoes run true to size — use the chart below to convert."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Chart */}
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-white/40">
                <th className="px-6 py-4 font-semibold">US</th>
                <th className="px-6 py-4 font-semibold">EU</th>
                <th className="px-6 py-4 font-semibold">UK</th>
                <th className="px-6 py-4 font-semibold">Foot length (CM)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.us} className="border-t border-white/[0.06] hover:bg-white/[0.02]">
                  <td className="px-6 py-3.5 font-bold">{r.us}</td>
                  <td className="px-6 py-3.5 text-white/60">{r.eu}</td>
                  <td className="px-6 py-3.5 text-white/60">{r.uk}</td>
                  <td className="px-6 py-3.5 text-white/60">{r.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tips */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {tips.map((tip) => (
            <div key={tip.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <tip.icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold">{tip.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/45">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
