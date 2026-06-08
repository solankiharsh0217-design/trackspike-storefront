import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'Running', href: '/products?category=running' },
    { name: 'Casual', href: '/products?category=casual' },
    { name: 'Trail', href: '/products?category=trail' },
    { name: 'Sale', href: '/products?sale=true' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping & Returns', href: '/shipping' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Track Order', href: '/track' },
  ],
};

const socialLinks = [
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'YouTube', href: '#', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-[#050505] text-white relative overflow-hidden">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

      {/* Watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center">
        <span className="font-heading font-black text-[clamp(4rem,15vw,12rem)] text-white/[0.025] tracking-[-0.04em] leading-none whitespace-nowrap">
          TRACKSPIKE
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 py-16 lg:py-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-heading text-base font-bold mb-7 block">
              <span className="text-accent">TRACK</span>
              <span className="text-white">SPIKE</span>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed mb-7 max-w-xs">
              Premium athletic footwear engineered for performance. Built for those who push boundaries.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-accent hover:border-accent/20 hover:bg-accent/5 transition-all duration-300"
                  aria-label={link.name}
                >
                  <link.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-[9px] font-bold text-white/30 mb-5 uppercase tracking-[0.25em]">Shop</p>
            <ul className="space-y-3.5">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/35 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[9px] font-bold text-white/30 mb-5 uppercase tracking-[0.25em]">Company</p>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/35 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-[9px] font-bold text-white/30 mb-5 uppercase tracking-[0.25em]">Support</p>
            <ul className="space-y-3.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/35 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] py-7 flex flex-col sm:flex-row items-center justify-between gap-4 relative">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} TrackSpike USA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-white/20 hover:text-white/50 text-xs transition-colors duration-200">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
