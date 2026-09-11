'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import styles from './cart.module.css';

export default function CartPage() {
  const { items, cartCount, cartTotal, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className="container">
          <div className={styles.emptyContent}>
            <ShoppingBag size={64} strokeWidth={0.8} className={styles.emptyIcon} />
            <h1 className={styles.emptyTitle}>Your Cart is Empty</h1>
            <p className={styles.emptyText}>Looks like you haven&apos;t added anything yet.</p>
            <Link href="/shop" className="btn btn--primary btn--lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <h1 className={styles.pageTitle}>Shopping Cart</h1>
        <div className={styles.layout}>
          {/* Cart Items */}
          <div className={styles.itemsSection}>
            <div className={styles.itemsHeader}>
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            {items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemLeft}>
                  <div className={styles.itemImage}>
                    <ShoppingBag size={20} strokeWidth={1} />
                  </div>
                  <div className={styles.itemDetails}>
                    <span className={styles.itemBrand}>{item.brand}</span>
                    <Link href={`/product/${item.slug || '#'}`} className={styles.itemName}>
                      {item.name}
                    </Link>
                    <span className={styles.itemPrice}>₹{formatPrice(item.price)}</span>
                  </div>
                </div>
                <div className={styles.itemQuantity}>
                  <div className={styles.qtySelector}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className={styles.itemTotal}>
                  <span>₹{formatPrice(Number(item.price) * item.quantity)}</span>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)} aria-label="Remove">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal ({cartCount} items)</span>
              <span>₹{formatPrice(cartTotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{cartTotal >= 999 ? 'Free' : '₹99'}</span>
            </div>
            <hr className="divider" />
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>₹{formatPrice(cartTotal + (cartTotal >= 999 ? 0 : 99))}</span>
            </div>
            <Link href="/checkout" className="btn btn--primary btn--full btn--lg">
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <Link href="/shop" className={styles.continueShopping}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
