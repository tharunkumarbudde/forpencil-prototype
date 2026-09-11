'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, Heart, ShoppingBag, Minus, Plus, Truck, ShieldCheck, 
  RotateCcw, ChevronDown, Check, Sparkles, Layers, Package 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products, formatPrice, getDiscountPercentage } from '@/data/products';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import styles from './product.module.css';

export default function ProductPage({ params }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  const product = products.find((p) => p.slug === slug);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('description');
  const [addedToast, setAddedToast] = useState(false);

  const { addItem, toggleDrawer } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Product Unavailable</h1>
          <p>The requested art tool or material could not be found.</p>
          <Link href="/shop" className="btn btn--primary">Return to Catalog</Link>
        </div>
      </div>
    );
  }

  const discount = getDiscountPercentage(Number(product.regular_price), Number(product.sale_price));
  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter(
    (p) => p.id !== product.id && p.categories[0]?.slug === product.categories[0]?.slug
  ).slice(0, 4);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [{ src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop', alt: product.name }];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0]?.src,
      brand: product.brand,
      slug: product.slug,
      quantity,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleWishlist = () => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      image: images[0]?.src,
      brand: product.brand,
      slug: product.slug,
    });
  };

  return (
    <div className={styles.productPage}>
      {/* Breadcrumb Navigation */}
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
          {/* Gallery Column */}
          <div className={styles.gallery}>
            <div className={styles.mainImageWrap}>
              <img
                src={images[selectedImageIndex]?.src}
                alt={images[selectedImageIndex]?.alt || product.name}
                className={styles.mainImage}
              />
              <div className={styles.badges}>
                {product.badge && <span className={`${styles.badge} ${styles.badgeNew}`}>{product.badge}</span>}
                {discount > 0 && <span className={`${styles.badge} ${styles.badgeSale}`}>-{discount}%</span>}
              </div>
            </div>

            {/* Thumbnail Carousel Strip */}
            {images.length > 1 && (
              <div className={styles.thumbnails}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`${styles.thumbBtn} ${selectedImageIndex === idx ? styles.thumbBtnActive : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                  >
                    <img src={img.src} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Product Information */}
          <div className={styles.info}>
            <div className={styles.brandRow}>
              <span className={styles.brand}>{product.brand}</span>
              <span className={styles.stockStatus}>
                <span className={styles.stockDot} /> In Stock & Ready to Ship
              </span>
            </div>

            <h1 className={styles.title}>{product.name}</h1>

            {/* Rating */}
            {Number(product.rating_count) > 0 ? (
              <div className={styles.rating}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={15}
                      fill={star <= Math.round(Number(product.average_rating)) ? 'var(--star-filled)' : 'none'}
                      stroke={star <= Math.round(Number(product.average_rating)) ? 'var(--star-filled)' : 'var(--star-empty)'}
                    />
                  ))}
                </div>
                <span className={styles.ratingText}>
                  {product.average_rating} ({product.rating_count} verified reviews)
                </span>
              </div>
            ) : (
              <div className={styles.rating}>
                <span className={styles.editorialBadge}>Studio Quality Verified</span>
              </div>
            )}

            {/* Price Block */}
            <div className={styles.priceBlock}>
              <span className={styles.price}>₹{formatPrice(product.price)}</span>
              {product.on_sale && product.regular_price && (
                <>
                  <span className={styles.originalPrice}>₹{formatPrice(product.regular_price)}</span>
                  <span className={styles.discountBadge}>Save {discount}%</span>
                </>
              )}
            </div>

            <p className={styles.taxNote}>Inclusive of all GST taxes & studio packaging</p>

            {/* Short Description */}
            {product.short_description && (
              <p className={styles.shortDesc}>{product.short_description}</p>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className={styles.actionRow}>
              <div className={styles.quantitySelector}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button 
                className={`btn btn--primary btn--lg ${styles.addToCartBtn}`} 
                onClick={handleAddToCart}
              >
                {addedToast ? (
                  <>
                    <Check size={18} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    Add to Cart — ₹{formatPrice(Number(product.price) * quantity)}
                  </>
                )}
              </button>
            </div>

            {/* Wishlist Button */}
            <button className={styles.wishlistBtn} onClick={handleWishlist}>
              <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
              <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
            </button>

            {/* Value Props & Trust */}
            <div className={styles.trustBadges}>
              <div className={styles.trustBadge}>
                <Truck size={18} className={styles.trustIcon} />
                <div>
                  <span className={styles.trustTitle}>Complimentary Express Shipping</span>
                  <span className={styles.trustDesc}>Free delivery on orders over ₹999 across India</span>
                </div>
              </div>
              <div className={styles.trustBadge}>
                <ShieldCheck size={18} className={styles.trustIcon} />
                <div>
                  <span className={styles.trustTitle}>100% Genuine Manufacture</span>
                  <span className={styles.trustDesc}>Certified direct from international brand houses</span>
                </div>
              </div>
              <div className={styles.trustBadge}>
                <RotateCcw size={18} className={styles.trustIcon} />
                <div>
                  <span className={styles.trustTitle}>7-Day Easy Returns</span>
                  <span className={styles.trustDesc}>Hassle-free replacement for damaged or unused items</span>
                </div>
              </div>
            </div>

            {/* Product Accordions */}
            <div className={styles.accordions}>
              {[
                { 
                  key: 'description', 
                  title: 'Description & Technique Notes', 
                  content: product.description || 'Crafted with premium materials for fine art, illustration, and studio workflows.' 
                },
                {
                  key: 'specifications',
                  title: 'Product Specifications',
                  content: product.attributes && product.attributes.length > 0 
                    ? product.attributes.map(a => `${a.name}: ${a.options.join(', ')}`).join('\n')
                    : `Brand: ${product.brand}\nMedium: ${product.categories[0]?.name || 'Art Supply'}\nOrigin: Japan / Germany / India\nArchival Grade: Yes`,
                },
                {
                  key: 'included',
                  title: 'What’s Included',
                  content: `1x Original ${product.name} packaged in authentic brand studio box.`,
                },
                {
                  key: 'shipping',
                  title: 'Shipping & Delivery Details',
                  content: 'Orders are dispatched within 24 hours from our centralized studio warehouse. Delivered within 3-5 business days across India.',
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
            <div className={styles.relatedHeader}>
              <span className="eyebrow eyebrow--accent">RECOMMENDED FOR YOUR STUDIO</span>
              <h2 className={styles.relatedTitle}>You May Also Need</h2>
            </div>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <div className={styles.stickyMobile}>
        <div className={styles.stickyPrice}>
          <span className={styles.stickyPriceValue}>₹{formatPrice(product.price)}</span>
          {product.on_sale && product.regular_price && (
            <span className={styles.stickyOriginal}>₹{formatPrice(product.regular_price)}</span>
          )}
        </div>
        <button className="btn btn--primary btn--sm" onClick={handleAddToCart}>
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
