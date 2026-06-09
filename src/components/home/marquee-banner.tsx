'use client';

const phrases = ['Run Your Own Race', 'Move Different', 'Break Records', 'No Days Off'];

/**
 * Oversized scrolling type banner — a bold streetwear signature between sections.
 */
export function MarqueeBanner() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-accent py-6 sm:py-8">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <span key={i} className="flex items-center">
            {phrases.map((phrase) => (
              <span key={phrase} className="flex items-center">
                <span className="px-8 font-heading text-3xl font-black uppercase tracking-[-0.02em] text-black sm:text-5xl">
                  {phrase}
                </span>
                <span className="text-2xl text-black/40 sm:text-4xl">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}
