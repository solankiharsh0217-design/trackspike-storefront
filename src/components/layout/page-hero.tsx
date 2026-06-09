import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
}

/**
 * Consistent dark page header used across all secondary pages.
 */
export function PageHero({ eyebrow, title, subtitle, align = 'left' }: PageHeroProps) {
  return (
    <div className="border-b border-white/10 bg-[#0a0a0a]">
      <div
        className={`mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8 ${
          align === 'center' ? 'text-center' : ''
        }`}
      >
        {eyebrow && (
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent/70">
            ✦ {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white">
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mt-4 max-w-xl text-white/45 ${align === 'center' ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
