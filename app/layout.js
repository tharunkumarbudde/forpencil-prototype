import './globals.css';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

export const metadata = {
  title: {
    default: 'ForPencil — Premium Art Supplies & Creative Tools',
    template: '%s | ForPencil',
  },
  description:
    'Discover premium art supplies, fine art materials, and creative tools. Shop watercolours, acrylics, brushes, sketchbooks, canvas and more from top brands.',
  keywords: [
    'art supplies',
    'painting supplies',
    'watercolour',
    'acrylic paint',
    'brushes',
    'canvas',
    'sketchbook',
    'drawing pencils',
    'art materials India',
    'ForPencil',
  ],
  openGraph: {
    title: 'ForPencil — Premium Art Supplies & Creative Tools',
    description:
      'Discover premium art supplies and creative tools for artists, students, and everyone who loves to create.',
    url: 'https://www.forpencil.com',
    siteName: 'ForPencil',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ForPencil — Premium Art Supplies',
    description: 'Premium art supplies and creative tools for every artist.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main id="main-content" role="main">
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
