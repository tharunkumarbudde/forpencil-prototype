'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, getDiscountPercentage } from '@/data/products';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const discount = getDiscountPercentage(
    Number(product.regular_price),
    Number(product.sale_price)
  );

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.src,
      brand: product.brand,
    });
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
      image: product.images?.[0]?.src,
      brand: product.brand,
      slug: product.slug,
    });
  };

  return (
    <article
      className={styles.card}
      style={{ '--animation-delay': `${index * 60}ms` }}
    >
      <Link href={`/product/${product.slug}`} className={styles.imageWrap}>
        {/* Badges */}
        <div className={styles.badges}>
          {product.badge && (
            <span className={`badge ${product.badge === 'Bestseller' || product.badge === 'Trending' ? 'badge--new' : 'badge--new'}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="badge badge--sale">{discount}% OFF</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Product Image */}
        {product.images?.[0]?.src ? (
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <div className={styles.imageIcon}>
              <ShoppingBag size={32} strokeWidth={1} />
            </div>
          </div>
        )}

        {/* Quick Actions (hover) */}
        <div className={styles.quickActions}>
          <button className={styles.quickBtn} onClick={handleAddToCart}>
            <ShoppingBag size={14} />
            <span>Add to Cart</span>
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
        {Number(product.rating_count) > 0 && (
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  fill={star <= Math.round(Number(product.average_rating)) ? 'var(--star-filled)' : 'none'}
                  stroke={star <= Math.round(Number(product.average_rating)) ? 'var(--star-filled)' : 'var(--star-empty)'}
                />
              ))}
            </div>
            <span className={styles.ratingText}>
              {product.average_rating} ({product.rating_count})
            </span>
          </div>
        )}

        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{formatPrice(product.price)}</span>
          {product.on_sale && product.regular_price !== product.sale_price && (
            <span className={styles.originalPrice}>₹{formatPrice(product.regular_price)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
