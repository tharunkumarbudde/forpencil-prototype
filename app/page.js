import Link from 'next/link';
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import { products } from '@/data/products';
import { brands } from '@/data/categories';
import styles from './page.module.css';

export default function HomePage() {
  const bestsellers = products.filter(p => p.badge === 'Bestseller' || Number(p.rating_count) > 100);
  const trending = products.filter(p => p.badge === 'Trending' || p.badge === 'New');
  const underFive = products.filter(p => Number(p.price) < 500);
  const allProducts = products.slice(0, 8);

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Premium Art Supplies</span>
          <h1 className={styles.heroTitle}>Create Without Limits</h1>
          <p className={styles.heroSubtitle}>
            Premium art supplies and creative tools for artists, students, makers and everyone who loves to create.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/shop" className="btn btn--primary btn--lg">
              Shop Art Supplies
            </Link>
            <Link href="/shop/paints-colours" className="btn btn--secondary btn--lg">
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      {/* ── SHOP BY CREATIVE WORLD ── */}
      <section className={`section ${styles.creativeWorlds}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Explore</span>
            <h2 className={styles.sectionTitle}>Shop by Creative World</h2>
          </div>
          <div className={styles.worldsGrid}>
            {[
              { title: 'Draw', desc: 'Pencils, pens & sketchbooks', href: '/shop/drawing-illustration', icon: '✏️' },
              { title: 'Paint', desc: 'Watercolours, acrylics & oils', href: '/shop/paints-colours', icon: '🎨' },
              { title: 'Paper', desc: 'Canvas, sketchbooks & more', href: '/shop/paper-canvas', icon: '📄' },
              { title: 'Write', desc: 'Calligraphy, pens & inks', href: '/shop/stationery', icon: '✒️' },
              { title: 'Craft', desc: 'Resin, decoupage & DIY', href: '/shop/craft', icon: '🎭' },
              { title: 'Create', desc: 'Gift sets & essentials', href: '/shop/gift-sets', icon: '✨' },
            ].map((world, i) => (
              <Link key={world.title} href={world.href} className={styles.worldCard} style={{ '--delay': `${i * 80}ms` }}>
                <div className={styles.worldImageArea}>
                  <span className={styles.worldEmoji}>{world.icon}</span>
                </div>
                <div className={styles.worldInfo}>
                  <h3 className={styles.worldTitle}>{world.title}</h3>
                  <p className={styles.worldDesc}>{world.desc}</p>
                  <span className={styles.worldLink}>
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COLLECTIONS ── */}
      <section className={`section ${styles.collections}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Curated</span>
            <h2 className={styles.sectionTitle}>Featured Collections</h2>
          </div>
          <div className={styles.collectionGrid}>
            {[
              { title: 'Artist Essentials', desc: 'Everything you need to begin creating.', href: '/shop?tag=essential', color: '#E8DDD0' },
              { title: 'Watercolour Studio', desc: 'Explore pigments, papers and brushes.', href: '/shop/watercolours', color: '#D4E1ED' },
              { title: 'Sketch & Draw', desc: 'For ideas that begin with a line.', href: '/shop/sketch-drawing', color: '#E5E0DA' },
              { title: 'Professional Artists', desc: 'Premium materials for serious creators.', href: '/shop?tag=professional', color: '#D7D0C5' },
            ].map((col, i) => (
              <Link key={col.title} href={col.href} className={styles.collectionCard}>
                <div className={styles.collectionImage} style={{ backgroundColor: col.color }}>
                  <div className={styles.collectionOverlay}>
                    <h3 className={styles.collectionTitle}>{col.title}</h3>
                    <p className={styles.collectionDesc}>{col.desc}</p>
                    <span className={styles.collectionLink}>
                      Shop Now <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING NOW ── */}
      <section className={`section ${styles.productSection}`}>
        <div className="container">
          <div className={styles.sectionHeaderRow}>
            <div>
              <span className="eyebrow">What&apos;s Hot</span>
              <h2 className={styles.sectionTitle}>Trending Now</h2>
            </div>
            <Link href="/shop?sort=popularity" className={styles.viewAll}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className={styles.productGrid}>
            {allProducts.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL BANNER ── */}
      <section className={styles.editorial}>
        <div className={styles.editorialInner}>
          <div className={styles.editorialContent}>
            <span className="eyebrow">The ForPencil Journal</span>
            <h2 className={styles.editorialTitle}>Tools for ideas that won&apos;t sit still.</h2>
            <p className={styles.editorialText}>
              Whether you&apos;re a professional artist, a weekend painter, or a curious beginner — we believe the right tools can transform how you create.
            </p>
            <Link href="/shop" className="btn btn--secondary btn--lg">
              Start Creating
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className={`section ${styles.productSection}`}>
        <div className="container">
          <div className={styles.sectionHeaderRow}>
            <div>
              <span className="eyebrow">Fresh Finds</span>
              <h2 className={styles.sectionTitle}>New Arrivals</h2>
            </div>
            <Link href="/shop?sort=date" className={styles.viewAll}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className={styles.productGrid}>
            {allProducts.slice(4, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND SHOWCASE ── */}
      <section className={`section--sm ${styles.brandsSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Trusted Brands</span>
            <h2 className={styles.sectionTitle}>Shop by Brand</h2>
          </div>
          <div className={styles.brandsGrid}>
            {brands.slice(0, 8).map((brand) => (
              <Link
                key={brand.id}
                href={`/shop?brand=${brand.slug}`}
                className={styles.brandCard}
              >
                <span className={styles.brandName}>{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section className={`section ${styles.trust}`}>
        <div className="container">
          <div className={styles.trustGrid}>
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹999' },
              { icon: ShieldCheck, title: '100% Authentic', desc: 'Genuine products only' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '7-day return policy' },
              { icon: Headphones, title: 'Expert Support', desc: 'Dedicated art supply team' },
            ].map((item) => (
              <div key={item.title} className={styles.trustItem}>
                <item.icon size={28} strokeWidth={1.5} className={styles.trustIcon} />
                <h4 className={styles.trustTitle}>{item.title}</h4>
                <p className={styles.trustDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
