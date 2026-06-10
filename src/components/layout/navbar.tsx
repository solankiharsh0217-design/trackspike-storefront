'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useUIStore } from '@/store/ui-store';
import { useAuthStore } from '@/store/auth-store';

const navigation = [
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCartStore();
  const { isMobileMenuOpen, toggleMobileMenu, toggleCart } = useUIStore();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading text-lg font-bold tracking-[-0.02em] text-white group">
            <span className="text-accent">TRACK</span>
            <span className="text-white">SPIKE</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[11px] font-semibold text-white/40 hover:text-white tracking-[0.15em] uppercase transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              className="p-2.5 text-white/40 hover:text-white transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>
            {user ? (
              <div className="relative group">
                <button
                  className="p-2.5 text-accent hover:text-accent/80 transition-colors duration-200"
                  aria-label="Account"
                >
                  <User className="w-[18px] h-[18px]" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#111] border border-white/10 rounded-2xl p-2 shadow-xl">
                  <div className="px-3 py-2 text-xs text-white/40 border-b border-white/10 mb-2">
                    {user.firstName} {user.lastName}
                  </div>
                  <Link
                    href="/account"
                    className="block px-3 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-3 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2.5 text-white/40 hover:text-white transition-colors duration-200"
                aria-label="Sign In"
              >
                <User className="w-[18px] h-[18px]" />
              </Link>
            )}
            <button
              onClick={toggleCart}
              className="relative p-2.5 text-white/40 hover:text-white transition-colors duration-200"
              aria-label="Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {itemCount() > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-accent text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {itemCount()}
                </span>
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2.5 text-white/40 hover:text-white transition-colors duration-200 ml-1"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.06] pb-6 animate-slide-down">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-4 text-[11px] font-semibold text-white/40 hover:text-white tracking-[0.15em] uppercase transition-colors duration-200"
                onClick={() => useUIStore.getState().closeAll()}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-white/[0.06] mt-4 pt-4">
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="block py-3 text-[11px] font-semibold text-white/40 hover:text-white tracking-[0.15em] uppercase transition-colors"
                    onClick={() => useUIStore.getState().closeAll()}
                  >
                    My Account
                  </Link>
                  <Link
                    href="/orders"
                    className="block py-3 text-[11px] font-semibold text-white/40 hover:text-white tracking-[0.15em] uppercase transition-colors"
                    onClick={() => useUIStore.getState().closeAll()}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => { logout(); useUIStore.getState().closeAll(); }}
                    className="block py-3 text-[11px] font-semibold text-white/40 hover:text-white tracking-[0.15em] uppercase transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block py-3 text-[11px] font-semibold text-white/40 hover:text-white tracking-[0.15em] uppercase transition-colors"
                  onClick={() => useUIStore.getState().closeAll()}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
