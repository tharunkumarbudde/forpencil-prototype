'use client';

import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Sparkles, Truck } from 'lucide-react';
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
      <div className={styles.overlay} onClick={closeDrawer} role="presentation" />
      <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Shopping Cart">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <ShoppingBag size={18} className={styles.titleIcon} />
            <h2 className={styles.title}>Your Studio Cart ({cartCount})</h2>
          </div>
          <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        {cartCount > 0 && (
          <div className={styles.shippingBar}>
            {amountToFreeShipping > 0 ? (
              <p className={styles.shippingText}>
                Add <strong className={styles.shippingHighlight}>₹{formatPrice(amountToFreeShipping)}</strong> more to unlock <strong className={styles.shippingHighlight}>COMPLIMENTARY EXPRESS SHIPPING</strong>
              </p>
            ) : (
              <p className={styles.shippingTextUnlocked}>
                <Truck size={14} /> Congratulations! You’ve unlocked <strong>Free Express Shipping!</strong>
              </p>
            )}
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${shippingProgress}%` }} />
            </div>
          </div>
        )}

        {/* Items List */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <ShoppingBag size={52} strokeWidth={1} className={styles.emptyIcon} />
              <h3 className={styles.emptyTitle}>Your Studio Cart is Empty</h3>
              <p className={styles.emptyText}>Find your next medium. Explore our curated fine art collections.</p>
              <Link href="/shop" className="btn btn--primary btn--lg" onClick={closeDrawer}>
                EXPLORE CATALOG <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImageWrap}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className={styles.itemImg} />
                  ) : (
                    <div className={styles.itemImagePlaceholder}>
                      <ShoppingBag size={20} strokeWidth={1.2} />
                    </div>
                  )}
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
                  title="Remove item"
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
            <div className={styles.subtotalRow}>
              <span className={styles.subtotalLabel}>Subtotal</span>
              <span className={styles.subtotalPrice}>₹{formatPrice(cartTotal)}</span>
            </div>
            <p className={styles.shippingNote}>Taxes & Shipping calculated at checkout</p>
            <Link
              href="/checkout"
              className="btn btn--primary btn--full btn--lg"
              onClick={closeDrawer}
            >
              PROCEED TO CHECKOUT — ₹{formatPrice(cartTotal)} <ArrowRight size={16} />
            </Link>
            <Link
              href="/cart"
              className={styles.viewCartLink}
              onClick={closeDrawer}
            >
              View Detailed Studio Bag
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
