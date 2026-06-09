import { PageHero } from '@/components/layout/page-hero';

export interface PolicySection {
  heading: string;
  body: string[];
}

interface PolicyPageProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  updated?: string;
  sections: PolicySection[];
}

/**
 * Shared layout for prose-heavy pages — policies, legal, shipping, etc.
 */
export function PolicyPage({ eyebrow, title, subtitle, updated, sections }: PolicyPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {updated && (
          <p className="mb-10 text-xs uppercase tracking-[0.2em] text-white/30">
            Last updated · {updated}
          </p>
        )}
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 font-heading text-xl font-bold uppercase tracking-tight text-white">
                {section.heading}
              </h2>
              <div className="space-y-3 leading-relaxed text-white/55">
                {section.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
