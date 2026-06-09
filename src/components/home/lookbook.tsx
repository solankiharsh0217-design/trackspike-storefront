'use client';

import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { Reveal, RevealStagger, RevealItem } from '@/components/motion/reveal';

const shots = [
  { src: '/images/lifestyle/street-airmax.jpg', tall: true },
  { src: '/images/products/af1-pastel.jpg', tall: false },
  { src: '/images/lifestyle/jordans-track.jpg', tall: false },
  { src: '/images/products/vans-burgundy.jpg', tall: false },
  { src: '/images/lifestyle/jump-rooftop.jpg', tall: true },
  { src: '/images/products/airmax-orange.jpg', tall: false },
];

export function Lookbook() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <Reveal direction="up">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent/70">
              ✦ On the Streets
            </p>
            <h2 className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white">
              #RunYourOwnRace
            </h2>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/50 transition-colors hover:text-accent"
            >
              <Instagram className="h-4 w-4" />
              @trackspike
            </a>
          </Reveal>
        </div>

        <RevealStagger className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {shots.map((shot, i) => (
            <RevealItem key={shot.src} className={shot.tall ? 'row-span-2' : ''}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={`group relative block overflow-hidden rounded-xl ${
                  shot.tall ? 'aspect-[3/4] sm:h-full' : 'aspect-square'
                }`}
              >
                <Image
                  src={shot.src}
                  alt={`Lookbook ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                  <Instagram className="h-7 w-7 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
