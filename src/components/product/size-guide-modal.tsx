'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const rows = [
  { us: '6', eu: '38.5', uk: '5.5', cm: '24' },
  { us: '7', eu: '40', uk: '6', cm: '25' },
  { us: '8', eu: '41', uk: '7', cm: '26' },
  { us: '9', eu: '42.5', uk: '8', cm: '27' },
  { us: '10', eu: '44', uk: '9', cm: '28' },
  { us: '11', eu: '45', uk: '10', cm: '29' },
  { us: '12', eu: '46', uk: '11', cm: '30' },
  { us: '13', eu: '47.5', uk: '12', cm: '31' },
];

export function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#111] p-7 text-white"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-heading text-xl font-black uppercase tracking-tight">Size Guide</h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[11px] uppercase tracking-wider text-white/40">
                  <th className="pb-3 font-semibold">US</th>
                  <th className="pb-3 font-semibold">EU</th>
                  <th className="pb-3 font-semibold">UK</th>
                  <th className="pb-3 font-semibold">CM</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.us} className="border-b border-white/[0.06]">
                    <td className="py-2.5 font-bold">{r.us}</td>
                    <td className="py-2.5 text-white/60">{r.eu}</td>
                    <td className="py-2.5 text-white/60">{r.uk}</td>
                    <td className="py-2.5 text-white/60">{r.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-5 text-xs leading-relaxed text-white/40">
              Measure your foot from heel to longest toe. If you&apos;re between sizes, we recommend
              sizing up for a more relaxed fit.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
