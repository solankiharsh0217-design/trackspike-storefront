import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { SmoothScroll } from '@/components/motion/smooth-scroll';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
