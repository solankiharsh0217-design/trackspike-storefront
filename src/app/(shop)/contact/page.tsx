'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Check } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';

const channels = [
  { icon: Mail, label: 'Email', value: 'help@trackspike.com', href: 'mailto:help@trackspike.com' },
  { icon: Phone, label: 'Phone', value: '+1 (800) 555-0142', href: 'tel:+18005550142' },
  { icon: MapPin, label: 'HQ', value: '500 Track Ave, Portland, OR', href: '#' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        eyebrow="Get in Touch"
        title="Talk to Us"
        subtitle="Questions about sizing, orders, or just want to talk shop? Our team of real humans replies within one business day."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Channels */}
          <div className="space-y-4">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-accent/30"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">{c.label}</p>
                  <p className="font-semibold">{c.value}</p>
                </div>
              </a>
            ))}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Support Hours</p>
              <p className="mt-1 font-semibold">Mon–Fri, 9am–6pm PT</p>
              <p className="mt-1 text-sm text-white/40">Weekend orders ship Monday.</p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-9">
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
                  <Check className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-heading text-2xl font-black uppercase">Message Sent</h3>
                <p className="mt-2 max-w-sm text-white/45">
                  Thanks for reaching out — we&apos;ll be in your inbox within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="First name" name="first" />
                  <Field label="Last name" name="last" />
                </div>
                <Field label="Email" name="email" type="email" />
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                    Subject
                  </label>
                  <select
                    required
                    className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm text-white focus:border-accent focus:outline-none"
                  >
                    <option className="bg-[#111]">Order question</option>
                    <option className="bg-[#111]">Sizing & fit</option>
                    <option className="bg-[#111]">Returns & exchanges</option>
                    <option className="bg-[#111]">Wholesale</option>
                    <option className="bg-[#111]">Something else</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help?"
                    className="w-full resize-none rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:border-accent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-gold transition-all duration-300 hover:shadow-gold-lg"
                >
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = 'text' }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:border-accent focus:outline-none"
      />
    </div>
  );
}
