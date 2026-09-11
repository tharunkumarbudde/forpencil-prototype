'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, getDiscountPercentage } from '@/data/products';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const discount = getDiscountPercentage(
    Number(product.regular_price),
    Number(product.sale_price)
  );

  const wishlisted = isInWishlist(product.id);

  const primaryImage = product.images?.[0]?.src;
  const secondaryImage = product.images?.[1]?.src || primaryImage;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage,
      brand: product.brand,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      image: primaryImage,
      brand: product.brand,
      slug: product.slug,
    });
  };

  return (
    <article
      className={styles.card}
      style={{ '--animation-delay': `${(index % 8) * 50}ms` }}
    >
      <Link href={`/product/${product.slug}`} className={styles.imageWrap}>
        {/* Badges */}
        <div className={styles.badges}>
          {product.badge && (
            <span className={`${styles.badge} ${styles.badgeNew}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className={`${styles.badge} ${styles.badgeSale}`}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Product Dual Image Reveal */}
        <div className={styles.imageStack}>
          {primaryImage ? (
            <>
              <img
                src={primaryImage}
                alt={product.name}
                className={styles.primaryImg}
                loading="lazy"
              />
              {secondaryImage && secondaryImage !== primaryImage && (
                <img
                  src={secondaryImage}
                  alt={`${product.name} alternate view`}
                  className={styles.secondaryImg}
                  loading="lazy"
                />
              )}
            </>
          ) : (
            <div className={styles.imagePlaceholder}>
              <ShoppingBag size={28} strokeWidth={1.2} />
            </div>
          )}
        </div>

        {/* Quick Add Overlay Button */}
        <div className={styles.quickActions}>
          <button 
            className={`${styles.quickBtn} ${added ? styles.quickBtnAdded : ''}`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check size={14} /> <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className={styles.info}>
        <span className={styles.brand}>{product.brand}</span>
        <Link href={`/product/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>

        {/* Rating */}
        {Number(product.rating_count) > 0 ? (
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={11}
                  fill={star <= Math.round(Number(product.average_rating)) ? 'var(--star-filled)' : 'none'}
                  stroke={star <= Math.round(Number(product.average_rating)) ? 'var(--star-filled)' : 'var(--star-empty)'}
                />
              ))}
            </div>
            <span className={styles.ratingText}>
              ({product.rating_count})
            </span>
          </div>
        ) : (
          <span className={styles.editorialTag}>Architectural Grade</span>
        )}

        {/* Price Row */}
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{formatPrice(product.price)}</span>
          {product.on_sale && product.regular_price && product.regular_price !== product.sale_price && (
            <span className={styles.originalPrice}>₹{formatPrice(product.regular_price)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
