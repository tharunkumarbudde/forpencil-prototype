'use client';

import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import styles from './CartDrawer.module.css';

const FREE_SHIPPING_THRESHOLD = 999;

export default function CartDrawer() {
  const { items, isOpen, cartCount, cartTotal, closeDrawer, removeItem, updateQuantity } = useCart();

  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={closeDrawer} />
      <div className={styles.drawer} role="dialog" aria-label="Shopping cart">
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <ShoppingBag size={18} />
            Cart ({cartCount})
          </h2>
          <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Bar */}
        {cartCount > 0 && (
          <div className={styles.shippingBar}>
            {amountToFreeShipping > 0 ? (
              <p className={styles.shippingText}>
                Add <strong>₹{formatPrice(amountToFreeShipping)}</strong> more for <strong>FREE SHIPPING</strong>
              </p>
            ) : (
              <p className={styles.shippingText}>
                🎉 You&apos;ve unlocked <strong>FREE SHIPPING!</strong>
              </p>
            )}
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${shippingProgress}%` }} />
            </div>
          </div>
        )}

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <ShoppingBag size={48} strokeWidth={1} className={styles.emptyIcon} />
              <h3 className={styles.emptyTitle}>Your cart is empty</h3>
              <p className={styles.emptyText}>Find your medium. Start exploring.</p>
              <Link href="/shop" className="btn btn--primary" onClick={closeDrawer}>
                Shop Now
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImage}>
                  <ShoppingBag size={20} strokeWidth={1} />
                </div>
                <div className={styles.itemInfo}>
                  <span className={styles.itemBrand}>{item.brand}</span>
                  <Link
                    href={`/product/${item.slug || '#'}`}
                    className={styles.itemName}
                    onClick={closeDrawer}
                  >
                    {item.name}
                  </Link>
                  <div className={styles.itemBottom}>
                    <div className={styles.quantity}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className={styles.itemPrice}>₹{formatPrice(Number(item.price) * item.quantity)}</span>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span className={styles.subtotalPrice}>₹{formatPrice(cartTotal)}</span>
            </div>
            <p className={styles.shippingNote}>Shipping calculated at checkout</p>
            <Link
              href="/checkout"
              className="btn btn--primary btn--full btn--lg"
              onClick={closeDrawer}
            >
              Checkout — ₹{formatPrice(cartTotal)}
            </Link>
            <Link
              href="/cart"
              className={`btn btn--ghost ${styles.viewCart}`}
              onClick={closeDrawer}
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
