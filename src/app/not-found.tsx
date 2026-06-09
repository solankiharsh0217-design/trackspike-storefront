import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 text-center text-white">
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[160px]" />

      <p className="relative mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-accent/70">
        ✦ Off the Track
      </p>
      <h1 className="relative font-heading text-[clamp(5rem,22vw,16rem)] font-black uppercase leading-none tracking-[-0.05em]">
        4<span className="gradient-text">0</span>4
      </h1>
      <p className="relative mt-2 max-w-sm text-white/45">
        This page took a wrong turn. Let&apos;s get you back to the start line.
      </p>
      <Link
        href="/"
        className="group relative mt-8 inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-gold transition-all duration-300 hover:shadow-gold-lg"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back Home
      </Link>
    </main>
  );
}
