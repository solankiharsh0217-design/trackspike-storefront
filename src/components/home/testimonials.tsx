'use client';

import { Star, Quote } from 'lucide-react';
import { Reveal, RevealStagger, RevealItem } from '@/components/motion/reveal';

const testimonials = [
  {
    quote:
      'Shaved four minutes off my marathon PB in the Velocity Racer. The energy return is unreal — it genuinely feels like the shoe is pushing you forward.',
    name: 'Marcus T.',
    role: 'Marathon runner · Boston',
    rating: 5,
  },
  {
    quote:
      'I live in my Heritage Ones. They go with everything, the leather has aged beautifully, and six months in they still look box-fresh. Best $130 I’ve spent.',
    name: 'Aisha R.',
    role: 'Verified buyer · Brooklyn',
    rating: 5,
  },
  {
    quote:
      'Took the Trailhead through mud, rivers, and 30 miles of rock. Dry feet the whole way and zero hot spots. These things are bombproof.',
    name: 'Diego M.',
    role: 'Ultra trail runner · Colorado',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#f5f4f1] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <Reveal direction="up">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
              ✦ Word on the Street
            </p>
            <h2 className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-primary">
              Loved by 50,000+
            </h2>
            <div className="mt-5 flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm font-semibold text-secondary">4.9 / 5 from 12,400+ reviews</span>
            </div>
          </Reveal>
        </div>

        <RevealStagger className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.name}>
              <figure className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
                <Quote className="h-8 w-8 text-accent/30" />
                <div className="mt-4 flex">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-primary/80">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-black/5 pt-5">
                  <p className="font-heading font-bold text-primary">{t.name}</p>
                  <p className="text-xs uppercase tracking-wider text-secondary">{t.role}</p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
