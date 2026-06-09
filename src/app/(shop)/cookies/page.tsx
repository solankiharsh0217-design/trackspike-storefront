import type { Metadata } from 'next';
import { PolicyPage } from '@/components/layout/policy-page';

export const metadata: Metadata = { title: 'Cookie Policy' };

export default function CookiesPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Cookie Policy"
      updated="January 2026"
      subtitle="What cookies we use and why."
      sections={[
        {
          heading: 'Essential Cookies',
          body: [
            'These keep the site working — remembering what’s in your cart, keeping you signed in, and securing checkout. They can’t be switched off.',
          ],
        },
        {
          heading: 'Analytics Cookies',
          body: [
            'These help us understand which products and pages people love so we can make the site better. The data is aggregated and never identifies you personally.',
          ],
        },
        {
          heading: 'Marketing Cookies',
          body: [
            'If you opt in, these let us show you relevant TrackSpike products on other sites. You can decline these without affecting your shopping experience.',
          ],
        },
        {
          heading: 'Managing Cookies',
          body: [
            'You can clear or block cookies in your browser settings at any time. Note that disabling essential cookies may break parts of the site.',
          ],
        },
      ]}
    />
  );
}
