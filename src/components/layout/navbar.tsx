'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useUIStore } from '@/store/ui-store';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCartStore();
  const { isMobileMenuOpen, toggleMobileMenu, toggleCart } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'top-0' : 'top-0'
      )}
    >
      <nav
        className={cn(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-3 transition-all duration-500',
          isScrolled
            ? 'bg-white/80 backdrop-blur-2xl border border-white/20 shadow-lg mt-0 rounded-none'
            : 'bg-white/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-sm'
        )}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-0 font-heading text-xl font-bold text-primary group"
          >
            <span className="text-accent group-hover:text-accent-hover transition-colors duration-300">Track</span>
            <span>Spike</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-secondary hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-1">
            <button
              className="p-2.5 text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2.5 text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2.5 text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {itemCount()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleCart}
              className="relative p-2.5 text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount()}
                </span>
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2.5 text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-slide-down">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-colors duration-200 font-medium"
                onClick={() => useUIStore.getState().closeAll()}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-4 mt-4 pt-4 border-t border-border">
              <button className="p-2.5 text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
