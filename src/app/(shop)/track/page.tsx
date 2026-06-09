'use client';

import { useState } from 'react';
import { Package, Check, Truck, MapPin, Search } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';

const steps = [
  { icon: Check, label: 'Order Confirmed', date: 'Jun 6, 9:14 AM', done: true },
  { icon: Package, label: 'Packed & Ready', date: 'Jun 6, 4:02 PM', done: true },
  { icon: Truck, label: 'In Transit', date: 'Jun 7, 8:30 AM', done: true },
  { icon: MapPin, label: 'Out for Delivery', date: 'Expected Jun 9', done: false },
];

export default function TrackPage() {
  const [tracking, setTracking] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        eyebrow="Where's my order?"
        title="Track Order"
        subtitle="Enter your order number and email to see exactly where your kicks are."
      />

      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTracking(true);
          }}
          className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]"
        >
          <input
            required
            placeholder="Order number"
            defaultValue="TSP-284910"
            className="rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:border-accent focus:outline-none"
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black"
          >
            <Search className="h-4 w-4" />
            Track
          </button>
        </form>

        {tracking && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Order</p>
                <p className="font-heading text-xl font-black">#TSP-284910</p>
              </div>
              <span className="rounded-full bg-accent/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent">
                In Transit
              </span>
            </div>

            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={step.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        step.done ? 'bg-accent text-black' : 'border border-white/15 text-white/40'
                      }`}
                    >
                      <step.icon className="h-4 w-4" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`h-12 w-px ${step.done ? 'bg-accent/40' : 'bg-white/10'}`} />
                    )}
                  </div>
                  <div className="pb-6 pt-1.5">
                    <p className={`font-semibold ${step.done ? 'text-white' : 'text-white/40'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-white/40">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
