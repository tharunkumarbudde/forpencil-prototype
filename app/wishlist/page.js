'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import styles from './wishlist.module.css';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className="container">
          <div className={styles.emptyContent}>
            <Heart size={64} strokeWidth={0.8} className={styles.emptyIcon} />
            <h1 className={styles.emptyTitle}>Your Wishlist is Empty</h1>
            <p className={styles.emptyText}>Save your favourite items here for later.</p>
            <Link href="/shop" className="btn btn--primary btn--lg">
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wishlistPage}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>My Wishlist</h1>
            <p className={styles.count}>{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>
          <button className={styles.clearBtn} onClick={clearWishlist}>
            Clear Wishlist
          </button>
        </div>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <ProductCard key={item.id} product={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
