'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingBag, Minus, Plus, Truck, ShieldCheck, RotateCcw, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products, formatPrice, getDiscountPercentage } from '@/data/products';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import styles from './product.module.css';

export function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default function ProductPage({ params }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  const product = products.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('description');
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Product Not Found</h1>
          <p>The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop" className="btn btn--primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const discount = getDiscountPercentage(Number(product.regular_price), Number(product.sale_price));
  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter(
    (p) => p.id !== product.id && p.categories[0]?.slug === product.categories[0]?.slug
  ).slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.src,
      brand: product.brand,
      slug: product.slug,
      quantity,
    });
  };

  const handleWishlist = () => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      image: product.images?.[0]?.src,
      brand: product.brand,
      slug: product.slug,
    });
  };

  return (
    <div className={styles.productPage}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              {product.categories[0] && (
                <li><Link href={`/shop/${product.categories[0].slug}`}>{product.categories[0].name}</Link></li>
              )}
              <li aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className={styles.productLayout}>
          {/* Product Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              {product.images?.[0]?.src ? (
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <ShoppingBag size={64} strokeWidth={0.8} />
                </div>
              )}
              {/* Badges */}
              <div className={styles.badges}>
                {product.badge && <span className="badge badge--new">{product.badge}</span>}
                {discount > 0 && <span className="badge badge--sale">{discount}% OFF</span>}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            {/* Brand */}
            <span className={styles.brand}>{product.brand}</span>

            {/* Title */}
            <h1 className={styles.title}>{product.name}</h1>

            {/* Rating */}
            {Number(product.rating_count) > 0 && (
              <div className={styles.rating}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={star <= Math.round(Number(product.average_rating)) ? 'var(--star-filled)' : 'none'}
                      stroke={star <= Math.round(Number(product.average_rating)) ? 'var(--star-filled)' : 'var(--star-empty)'}
                    />
                  ))}
                </div>
                <span className={styles.ratingText}>
                  {product.average_rating} ({product.rating_count} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className={styles.priceBlock}>
              <span className={styles.price}>₹{formatPrice(product.price)}</span>
              {product.on_sale && (
                <>
                  <span className={styles.originalPrice}>₹{formatPrice(product.regular_price)}</span>
                  <span className={styles.discount}>Save {discount}%</span>
                </>
              )}
            </div>

            <p className={styles.taxNote}>Inclusive of all taxes</p>

            {/* Short Description */}
            <p className={styles.shortDesc}>{product.short_description}</p>

            {/* Quantity & Add to Cart */}
            <div className={styles.addToCartSection}>
              <div className={styles.quantitySelector}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button className={`btn btn--primary btn--lg ${styles.addToCartBtn}`} onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                Add to Cart — ₹{formatPrice(Number(product.price) * quantity)}
              </button>
            </div>

            {/* Wishlist */}
            <button className={styles.wishlistLink} onClick={handleWishlist}>
              <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
              {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <div className={styles.trustBadge}>
                <Truck size={16} />
                <span>Free shipping above ₹999</span>
              </div>
              <div className={styles.trustBadge}>
                <ShieldCheck size={16} />
                <span>100% authentic product</span>
              </div>
              <div className={styles.trustBadge}>
                <RotateCcw size={16} />
                <span>7-day easy returns</span>
              </div>
            </div>

            {/* Product Details Accordion */}
            <div className={styles.accordions}>
              {[
                { key: 'description', title: 'Description', content: product.description },
                {
                  key: 'specifications',
                  title: 'Specifications',
                  content: product.attributes?.map(a => `${a.name}: ${a.options.join(', ')}`).join('\n'),
                },
                {
                  key: 'shipping',
                  title: 'Shipping & Returns',
                  content: 'Free shipping on orders above ₹999. Standard delivery in 4-7 business days. Easy 7-day returns for unused items in original packaging.',
                },
              ].map((acc) => (
                <div key={acc.key} className={styles.accordion}>
                  <button
                    className={`${styles.accordionHeader} ${openAccordion === acc.key ? styles.accordionOpen : ''}`}
                    onClick={() => setOpenAccordion(openAccordion === acc.key ? '' : acc.key)}
                    aria-expanded={openAccordion === acc.key}
                  >
                    <span>{acc.title}</span>
                    <ChevronDown size={16} className={styles.accordionIcon} />
                  </button>
                  {openAccordion === acc.key && (
                    <div className={styles.accordionContent}>
                      <p style={{ whiteSpace: 'pre-line' }}>{acc.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedTitle}>You May Also Like</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Mobile Add to Cart */}
      <div className={styles.stickyMobile}>
        <div className={styles.stickyPrice}>
          <span className={styles.stickyPriceValue}>₹{formatPrice(product.price)}</span>
          {product.on_sale && (
            <span className={styles.stickyOriginal}>₹{formatPrice(product.regular_price)}</span>
          )}
        </div>
        <button className="btn btn--primary" onClick={handleAddToCart}>
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
