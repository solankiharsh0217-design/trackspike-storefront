'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { CountUp } from '@/components/motion/count-up';

const stats = [
  { value: 50, suffix: 'K+', label: 'Athletes worldwide' },
  { value: 10, suffix: 'M+', label: 'Miles logged' },
  { value: 4.9, suffix: '★', label: 'Average rating', decimals: 1 },
  { value: 2024, suffix: '', label: 'Founded', plain: true },
];

export function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <Reveal direction="right">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/images/lifestyle/athlete-lacing.jpg"
                alt="A TrackSpike athlete laces up before a session"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 rounded-2xl bg-[#0a0a0a] px-6 py-4 text-white shadow-2xl">
                <p className="font-heading text-3xl font-black leading-none">Est. 2024</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Built in the USA
                </p>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal direction="up">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
                ✦ Our Story
              </p>
              <h2 className="font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-primary">
                Made by
                <br />
                <span className="gradient-text">athletes, for athletes</span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <div className="mt-7 max-w-xl space-y-5 text-base leading-relaxed text-secondary">
                <p>
                  TrackSpike started in a garage with a single belief: the gap between
                  you and your personal best is measured in milliseconds — and the right
                  shoe should help you close it.
                </p>
                <p>
                  We obsess over every gram, every stitch, every degree of energy return.
                  From the track to the street, we build footwear that performs as hard as
                  you do.
                </p>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal direction="up" delay={0.2}>
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    {stat.plain ? (
                      <p className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-black leading-none text-primary">
                        {stat.value}
                      </p>
                    ) : (
                      <CountUp
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals ?? 0}
                        className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-black leading-none text-primary"
                      />
                    )}
                    <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-secondary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <Link
                href="/about"
                className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-accent hover:text-black"
              >
                Read Our Story
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
