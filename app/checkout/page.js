'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, CreditCard, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { items, cartCount, cartTotal } = useCart();
  const [step, setStep] = useState(1);

  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className="container">
          <h1>Checkout</h1>
          <p>Your cart is empty. Please add items to proceed.</p>
          <Link href="/shop" className="btn btn--primary">Return to Shop</Link>
        </div>
      </div>
    );
  }

  const shippingCost = cartTotal >= 999 ? 0 : 99;
  const orderTotal = cartTotal + shippingCost;

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.header}>
        <div className="container">
          <Link href="/" className={styles.logo}>FORPENCIL</Link>
          <div className={styles.secure}>
            <Lock size={14} />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Main Form Area */}
          <div className={styles.main}>
            {/* Breadcrumb / Steps */}
            <nav className={styles.steps}>
              <ol>
                <li className={step >= 1 ? styles.activeStep : ''}>Information <ChevronRight size={12} /></li>
                <li className={step >= 2 ? styles.activeStep : ''}>Shipping <ChevronRight size={12} /></li>
                <li className={step >= 3 ? styles.activeStep : ''}>Payment</li>
              </ol>
            </nav>

            {step === 1 && (
              <form className={styles.formSection} onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className={styles.sectionHeader}>
                  <h2>Contact Information</h2>
                  <span>Already have an account? <Link href="/account" className="link">Log in</Link></span>
                </div>
                <input type="email" className="input" placeholder="Email" required />

                <h2 className={styles.sectionTitle}>Shipping Address</h2>
                <div className={styles.formRow}>
                  <input type="text" className="input" placeholder="First Name" required />
                  <input type="text" className="input" placeholder="Last Name" required />
                </div>
                <input type="text" className="input" placeholder="Address" required />
                <input type="text" className="input" placeholder="Apartment, suite, etc. (optional)" />
                <div className={styles.formRow}>
                  <input type="text" className="input" placeholder="City" required />
                  <input type="text" className="input" placeholder="State" required />
                  <input type="text" className="input" placeholder="PIN Code" required />
                </div>
                <input type="tel" className="input" placeholder="Phone" required />

                <button type="submit" className="btn btn--primary btn--lg btn--full" style={{ marginTop: 'var(--space-6)' }}>
                  Continue to Shipping
                </button>
              </form>
            )}

            {step === 2 && (
              <div className={styles.formSection}>
                <div className={styles.reviewBox}>
                  <div className={styles.reviewRow}>
                    <span className={styles.reviewLabel}>Contact</span>
                    <span className={styles.reviewValue}>customer@example.com</span>
                    <button className={styles.reviewEdit} onClick={() => setStep(1)}>Change</button>
                  </div>
                  <div className={styles.reviewRow}>
                    <span className={styles.reviewLabel}>Ship to</span>
                    <span className={styles.reviewValue}>123 Art Street, Creative City, 400001</span>
                    <button className={styles.reviewEdit} onClick={() => setStep(1)}>Change</button>
                  </div>
                </div>

                <h2 className={styles.sectionTitle}>Shipping Method</h2>
                <div className={styles.radioBox}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="shipping" defaultChecked />
                    <span className={styles.radioText}>Standard Shipping (4-7 business days)</span>
                    <span className={styles.radioPrice}>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                  </label>
                </div>

                <div className={styles.actions}>
                  <button className="btn btn--ghost" onClick={() => setStep(1)}>Return to Information</button>
                  <button className="btn btn--primary btn--lg" onClick={() => setStep(3)}>Continue to Payment</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Payment</h2>
                <p className={styles.secureText}>All transactions are secure and encrypted.</p>
                
                <div className={styles.paymentBox}>
                  <div className={styles.paymentHeader}>
                    <CreditCard size={20} />
                    <span>Pay with Razorpay / PayU</span>
                  </div>
                  <div className={styles.paymentBody}>
                    <p>After clicking &quot;Complete Order&quot;, you will be redirected to the secure payment gateway to complete your purchase securely.</p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className="btn btn--ghost" onClick={() => setStep(2)}>Return to Shipping</button>
                  <button className="btn btn--primary btn--lg">Complete Order</button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarInner}>
              <div className={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.id} className={styles.summaryItem}>
                    <div className={styles.summaryImageWrap}>
                      <div className={styles.summaryImage} />
                      <span className={styles.summaryBadge}>{item.quantity}</span>
                    </div>
                    <div className={styles.summaryItemInfo}>
                      <span className={styles.summaryItemName}>{item.name}</span>
                    </div>
                    <span className={styles.summaryItemPrice}>₹{formatPrice(Number(item.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.discountCode}>
                <input type="text" className="input" placeholder="Discount code" />
                <button className="btn btn--secondary">Apply</button>
              </div>

              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>₹{formatPrice(cartTotal)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                </div>
                <hr className="divider" style={{ margin: 'var(--space-4) 0' }} />
                <div className={`${styles.totalRow} ${styles.finalTotal}`}>
                  <span>Total</span>
                  <span><span className={styles.currency}>INR</span> ₹{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
