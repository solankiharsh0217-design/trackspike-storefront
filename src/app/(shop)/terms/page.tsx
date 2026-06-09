import type { Metadata } from 'next';
import { PolicyPage } from '@/components/layout/policy-page';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="January 2026"
      subtitle="The rules of the road for using TrackSpike."
      sections={[
        {
          heading: 'Using Our Site',
          body: [
            'By accessing TrackSpike you agree to use the site lawfully and not to interfere with its operation or security. We may update these terms from time to time; continued use means you accept the changes.',
          ],
        },
        {
          heading: 'Orders & Pricing',
          body: [
            'All orders are subject to acceptance and availability. We reserve the right to refuse or cancel an order, for example if a product was mispriced. Prices are shown in USD and include applicable taxes where required.',
          ],
        },
        {
          heading: 'Intellectual Property',
          body: [
            'All content on this site — logos, imagery, product designs, and copy — belongs to TrackSpike and may not be reused without permission.',
          ],
        },
        {
          heading: 'Limitation of Liability',
          body: [
            'TrackSpike is not liable for indirect or consequential damages arising from use of our products or site, to the fullest extent permitted by law.',
          ],
        },
      ]}
    />
  );
}
