'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
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
        'fixed top-4 left-4 right-4 z-50 transition-all duration-300',
        isScrolled && 'top-2'
      )}
    >
      <nav
        className={cn(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
          'bg-surface/85 backdrop-blur-xl border border-border rounded-xl',
          'shadow-lg transition-all duration-300',
          isScrolled && 'shadow-xl'
        )}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-xl font-bold text-primary"
          >
            <span className="text-accent">Track</span>Spike
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-secondary hover:text-accent transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="p-2 text-secondary hover:text-accent transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-secondary hover:text-accent transition-colors duration-200"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2 text-secondary hover:text-accent transition-colors duration-200"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {itemCount()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleCart}
              className="relative p-2 text-secondary hover:text-accent transition-colors duration-200"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {itemCount()}
                </span>
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-secondary hover:text-accent transition-colors duration-200"
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
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-secondary hover:text-accent hover:bg-background rounded-lg transition-colors duration-200"
                onClick={() => useUIStore.getState().closeAll()}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 px-4 mt-4 pt-4 border-t border-border">
              <button className="p-2 text-secondary hover:text-accent transition-colors duration-200">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-secondary hover:text-accent transition-colors duration-200">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
