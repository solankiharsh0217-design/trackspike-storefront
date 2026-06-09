import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Target, Zap, Heart, Globe } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Reveal, RevealStagger, RevealItem } from '@/components/motion/reveal';

export const metadata: Metadata = {
  title: 'About',
  description:
    'TrackSpike was built in a garage on a single belief: the right shoe helps you close the gap to your personal best. Meet the team obsessed with going faster.',
};

const values = [
  { icon: Zap, title: 'Performance First', text: 'Every gram, every stitch, every degree of energy return is obsessed over.' },
  { icon: Target, title: 'No Shortcuts', text: 'We test in the lab and on the road until it is undeniably better.' },
  { icon: Heart, title: 'Athlete Led', text: 'Designed with the people who actually push the limits, not just market to them.' },
  { icon: Globe, title: 'Built Responsibly', text: 'Recycled materials and carbon-neutral shipping on every order, always.' },
];

const timeline = [
  { year: '2024', title: 'The Garage', text: 'Two runners, a 3D printer, and a stubborn idea about energy return.' },
  { year: '2025', title: 'First Drop', text: 'The Velocity Racer sells out in 48 hours. Word travels fast.' },
  { year: '2025', title: '50K Strong', text: 'Our community crosses fifty thousand athletes across 40 countries.' },
  { year: '2026', title: 'Going Further', text: 'New trail and training lines, same obsession with the clock.' },
];

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <PageHero
        eyebrow="Our Story"
        title={<>Move<br />Different</>}
        subtitle="We started in a garage with one belief: the gap between you and your personal best is measured in milliseconds — and the right shoe should help you close it."
      />

      {/* Intro image + copy */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/images/lifestyle/athlete-lacing.jpg"
                alt="A TrackSpike athlete prepares for a session"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal direction="left">
            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
              Engineered by people who <span className="gradient-text">actually run</span>
            </h2>
            <div className="mt-6 space-y-5 text-white/55 leading-relaxed">
              <p>
                TrackSpike isn&apos;t a logo slapped on a factory shoe. Every model starts with a
                question from the road: where are we losing milliseconds, and how do we get them back?
              </p>
              <p>
                That obsession built ReboundCore™ — our proprietary foam that returns up to 85% of
                impact energy — and a featherweight knit that disappears on your foot. We don&apos;t
                ship anything we wouldn&apos;t race in ourselves.
              </p>
            </div>
            <Link
              href="/products"
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:shadow-gold-lg"
            >
              Shop the Range
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-white/10 bg-white/[0.02] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <h2 className="mb-12 font-heading text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-[-0.03em]">
              What we stand for
            </h2>
          </Reveal>
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <RevealItem key={v.title}>
                <div className="rounded-2xl border border-white/10 bg-[#0e0e0e] p-7 h-full">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">{v.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent/70">✦ The Road So Far</p>
          <h2 className="mb-12 font-heading text-[clamp(2rem,4vw,3rem)] font-black uppercase tracking-[-0.03em]">
            From garage to global
          </h2>
        </Reveal>
        <RevealStagger className="grid gap-6 md:grid-cols-4">
          {timeline.map((t) => (
            <RevealItem key={t.title}>
              <div className="border-t-2 border-accent pt-5">
                <p className="font-heading text-3xl font-black text-accent">{t.year}</p>
                <h3 className="mt-2 font-heading text-lg font-bold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{t.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>
    </div>
  );
}
