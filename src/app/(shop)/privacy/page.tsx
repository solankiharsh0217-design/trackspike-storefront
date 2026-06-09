import type { Metadata } from 'next';
import { PolicyPage } from '@/components/layout/policy-page';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="January 2026"
      subtitle="How we collect, use, and protect your information."
      sections={[
        {
          heading: 'What We Collect',
          body: [
            'We collect the information you give us — name, email, shipping address, and payment details — when you place an order or create an account, plus basic analytics about how you use our site.',
          ],
        },
        {
          heading: 'How We Use It',
          body: [
            'To process and ship your orders, provide support, prevent fraud, and (only if you opt in) send you product news. We never sell your personal data.',
          ],
        },
        {
          heading: 'Cookies',
          body: [
            'We use cookies to keep your cart, remember preferences, and understand site performance. You can control cookies in your browser settings — see our Cookie Policy for detail.',
          ],
        },
        {
          heading: 'Your Rights',
          body: [
            'You can request a copy of your data, ask us to correct it, or have it deleted at any time by emailing privacy@trackspike.com.',
          ],
        },
      ]}
    />
  );
}
