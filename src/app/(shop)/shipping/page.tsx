import type { Metadata } from 'next';
import { PolicyPage } from '@/components/layout/policy-page';

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: 'Fast, carbon-neutral shipping and free 30-day returns on every TrackSpike order.',
};

export default function ShippingPage() {
  return (
    <PolicyPage
      eyebrow="Logistics"
      title="Shipping & Returns"
      subtitle="Fast, tracked, carbon-neutral delivery — and a 30-day return window, no questions asked."
      sections={[
        {
          heading: 'Shipping Options',
          body: [
            'Standard (3–5 business days): Free on orders over $100, otherwise $9.99.',
            'Express (1–2 business days): $14.99, available at checkout.',
            'In-stock orders placed before 12pm PT ship the same day from our Portland warehouse.',
          ],
        },
        {
          heading: 'Tracking',
          body: [
            'The moment your order leaves the building you’ll get an email with a live tracking link. You can also track any order from the Track Order page using your order number and email.',
          ],
        },
        {
          heading: 'International',
          body: [
            'We ship to over 40 countries. Duties and taxes are calculated at checkout so there’s nothing to pay on delivery. International transit typically takes 5–10 business days.',
          ],
        },
        {
          heading: 'Returns & Exchanges',
          body: [
            'Changed your mind? Return any unworn pair in its original box within 30 days for a full refund. We’ll email you a prepaid label — returns are free and there are no restocking fees.',
            'Need a different size? Start an exchange and we’ll ship the new pair as soon as your return is scanned by the carrier.',
          ],
        },
        {
          heading: 'Warranty',
          body: [
            'Every TrackSpike is covered by a 2-year warranty against manufacturing defects. If something’s wrong with the build, we’ll replace it.',
          ],
        },
      ]}
    />
  );
}
