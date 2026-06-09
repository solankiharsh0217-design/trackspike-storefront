'use client';

import Image from 'next/image';
import { Feather, Zap, Recycle, ShieldCheck } from 'lucide-react';
import { Reveal, RevealStagger, RevealItem } from '@/components/motion/reveal';

const features = [
  {
    icon: Zap,
    title: 'ReboundCore™ Foam',
    description: 'Proprietary midsole returns up to 85% of impact energy back into your stride.',
  },
  {
    icon: Feather,
    title: 'Featherweight Build',
    description: 'Engineered knit uppers shave grams without sacrificing lockdown or support.',
  },
  {
    icon: ShieldCheck,
    title: 'All-Terrain Grip',
    description: 'Continental-grade rubber compounds bite into any surface, wet or dry.',
  },
  {
    icon: Recycle,
    title: 'Built Responsibly',
    description: 'At least 30% recycled materials in every pair, carbon-neutral shipping always.',
  },
];

export function TechFeatures() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — copy + features */}
          <div className="order-2 lg:order-1">
            <Reveal direction="up">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-accent/70">
                ✦ The Tech
              </p>
              <h2 className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-white">
                Science you
                <br />
                can <span className="gradient-text">feel</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/45">
                Every TrackSpike is a lab of obsessive engineering. Here&apos;s what&apos;s
                under the hood of your next personal best.
              </p>
            </Reveal>

            <RevealStagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {features.map((feature) => (
                <RevealItem key={feature.title}>
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-white">{feature.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/40">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>

          {/* Right — image */}
          <Reveal direction="left" className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/images/products/jordan-red.jpg"
                alt="TrackSpike engineering detail"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">Cutaway</p>
                  <p className="font-heading text-xl font-bold text-white">ReboundCore™ Stack</p>
                </div>
                <span className="rounded-full bg-accent px-4 py-2 text-[11px] font-black uppercase tracking-wider text-black">
                  85% Return
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
