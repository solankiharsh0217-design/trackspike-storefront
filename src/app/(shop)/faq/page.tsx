'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';

const faqs = [
  {
    q: 'How do TrackSpike shoes fit?',
    a: 'Our shoes run true to size. If you’re between sizes or prefer a roomier fit, we recommend sizing up half a size. Check the size guide on any product page for US/EU/UK/CM conversions.',
  },
  {
    q: 'When will my order ship?',
    a: 'In-stock orders ship within 1–2 business days from our Portland warehouse. You’ll get a tracking link by email the moment it leaves the building. Weekend orders ship Monday.',
  },
  {
    q: 'What’s your return policy?',
    a: 'We offer free 30-day returns on unworn shoes in their original box. Started a return? We’ll email you a prepaid label — no questions, no restocking fees.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. We ship to over 40 countries with carbon-neutral shipping on every order. Duties and taxes are calculated at checkout so there are no surprises on delivery.',
  },
  {
    q: 'How should I care for my shoes?',
    a: 'Spot-clean with a soft brush and mild soap, air dry away from direct heat, and rotate pairs to let the foam recover. Avoid the washing machine — it breaks down the midsole.',
  },
  {
    q: 'Are your shoes sustainable?',
    a: 'Every pair contains at least 30% recycled material, our boxes are 100% recycled, and all shipping is carbon-neutral. We’re not perfect yet, but we publish our progress every year.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'If your order hasn’t shipped, email help@trackspike.com and we’ll do our best to update or cancel it. Once it’s on the truck, you can use our free returns instead.',
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        eyebrow="Help Center"
        title="FAQ"
        subtitle="The questions we get asked most. Can’t find what you need? Our team is one message away."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-heading text-lg font-bold">{faq.q}</span>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-accent">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <p className="overflow-hidden text-white/50 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <h3 className="font-heading text-xl font-black uppercase">Still stuck?</h3>
          <p className="mt-2 text-white/45">We reply to every message within one business day.</p>
          <Link
            href="/contact"
            className="mt-5 inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-black"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
