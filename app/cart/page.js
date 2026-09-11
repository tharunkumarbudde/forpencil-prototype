'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import styles from './cart.module.css';

export default function CartPage() {
  const { items, cartCount, cartTotal, removeItem, updateQuantity } = useCart();
  const freeShipping = cartTotal >= 999;
  const shippingFee = freeShipping ? 0 : 99;
  const grandTotal = cartTotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className="container">
          <div className={styles.emptyContent}>
            <ShoppingBag size={64} strokeWidth={0.8} className={styles.emptyIcon} />
            <h1 className={styles.emptyTitle}>Your Studio Bag is Empty</h1>
            <p className={styles.emptyText}>Find your medium. Explore our fine art materials and tools.</p>
            <Link href="/shop" className="btn btn--primary btn--lg">
              EXPLORE CATALOG <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <div className={styles.pageHeader}>
          <span className="eyebrow eyebrow--accent">STUDIO BAG</span>
          <h1 className={styles.pageTitle}>Review Your Items ({cartCount})</h1>
        </div>

        <div className={styles.layout}>
          {/* Cart Items List */}
          <div className={styles.itemsSection}>
            <div className={styles.itemsHeader}>
              <span>Product Details</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>

            {items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemLeft}>
                  <div className={styles.itemImage}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <ShoppingBag size={24} strokeWidth={1} />
                    )}
                  </div>
                  <div className={styles.itemDetails}>
                    <span className={styles.itemBrand}>{item.brand}</span>
                    <Link href={`/product/${item.slug || '#'}`} className={styles.itemName}>
                      {item.name}
                    </Link>
                    <span className={styles.itemPrice}>₹{formatPrice(item.price)} each</span>
                  </div>
                </div>

                <div className={styles.itemQuantity}>
                  <div className={styles.qtySelector}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className={styles.itemTotal}>
                  <span className={styles.totalPrice}>₹{formatPrice(Number(item.price) * item.quantity)}</span>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)} aria-label="Remove item">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}

            <div className={styles.cartGuarantees}>
              <div className={styles.guaranteeItem}>
                <Truck size={18} />
                <span>Complimentary Express Shipping on orders over ₹999</span>
              </div>
              <div className={styles.guaranteeItem}>
                <ShieldCheck size={18} />
                <span>100% Genuine Certified Art Supplies</span>
              </div>
              <div className={styles.guaranteeItem}>
                <RotateCcw size={18} />
                <span>7-Day Replacement Policy</span>
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Studio Order Summary</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal ({cartCount} items)</span>
              <span>₹{formatPrice(cartTotal)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Estimated Express Shipping</span>
              <span>{freeShipping ? 'Free' : `₹${shippingFee}`}</span>
            </div>

            {freeShipping && (
              <div className={styles.freeShippingBadge}>
                🎉 Free Shipping Unlocked
              </div>
            )}

            <div className={styles.summaryDivider} />

            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total Payable</span>
              <span>₹{formatPrice(grandTotal)}</span>
            </div>

            <p className={styles.taxInclusive}>Includes all applicable GST taxes</p>

            <Link href="/checkout" className="btn btn--primary btn--full btn--lg">
              PROCEED TO CHECKOUT <ArrowRight size={16} />
            </Link>

            <Link href="/shop" className={styles.continueShopping}>
              Continue Browsing Studio Supplies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
