'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Editorial Newsletter Strip */}
      <div className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <div className={styles.newsletterText}>
              <span className="eyebrow eyebrow--accent">CREATIVE DISPATCH</span>
              <h3 className={styles.newsletterTitle}>Join the ForPencil Journal</h3>
              <p className={styles.newsletterDesc}>
                Receive early access to rare pigment drops, studio tips, and exclusive artist discounts.
              </p>
            </div>
            <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
              <div className={styles.inputWrap}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className={styles.newsletterInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address for newsletter subscription"
                  required
                />
                <button type="submit" className={`btn btn--primary ${styles.newsletterBtn}`}>
                  {subscribed ? (
                    <>
                      <CheckCircle2 size={16} /> Subscribed
                    </>
                  ) : (
                    <>
                      SUBSCRIBE <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandCol}>
              <Link href="/" className={styles.footerLogo}>
                <span className={styles.logoMark}>FORPENCIL</span>
                <span className={styles.logoSub}>FINE ART SUPPLIES</span>
              </Link>
              <p className={styles.brandText}>
                A premium digital home for creativity. Curating museum-grade pigments, paper surfaces, and precision tools for artists worldwide.
              </p>
              <div className={styles.social}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Facebook</a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Pinterest</a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>YouTube</a>
              </div>
            </div>

            {/* Shop Links */}
            <div className={styles.linkCol}>
              <h6 className={styles.colTitle}>Mediums</h6>
              <ul className={styles.linkList}>
                <li><Link href="/shop/watercolours">Watercolours</Link></li>
                <li><Link href="/shop/acrylic-colours">Acrylic Colours</Link></li>
                <li><Link href="/shop/oil-colours">Oil Paints</Link></li>
                <li><Link href="/shop/gouache-paints">Gouache</Link></li>
                <li><Link href="/shop/drawing-illustration">Graphite & Charcoal</Link></li>
                <li><Link href="/shop/paper-canvas">Cotton Paper Pads</Link></li>
                <li><Link href="/shop/craft">Resin & Craft</Link></li>
                <li><Link href="/shop/gift-sets">Studio Gift Boxes</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div className={styles.linkCol}>
              <h6 className={styles.colTitle}>Customer Care</h6>
              <ul className={styles.linkList}>
                <li><Link href="/contact">Support & Contact</Link></li>
                <li><Link href="/about">Our Philosophy</Link></li>
                <li><Link href="/account">My Account</Link></li>
                <li><Link href="/wishlist">Saved Wishlist</Link></li>
                <li><Link href="/cart">Cart Summary</Link></li>
                <li><Link href="/shop?filter=bestseller">Bestseller List</Link></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className={styles.linkCol}>
              <h6 className={styles.colTitle}>Studio Concierge</h6>
              <ul className={styles.contactList}>
                <li>
                  <Mail size={14} className={styles.contactIcon} />
                  <a href="mailto:support@forpencil.com">support@forpencil.com</a>
                </li>
                <li>
                  <Phone size={14} className={styles.contactIcon} />
                  <a href="tel:+919876543210">+91 (0) 98765 43210</a>
                </li>
                <li>
                  <MapPin size={14} className={styles.contactIcon} />
                  <span>Studio Headquarters, Mumbai, MH, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} FORPENCIL PVT LTD. ALL RIGHTS RESERVED.
            </p>
            <div className={styles.payments}>
              <span className={styles.paymentLabel}>SECURE GATEWAYS</span>
              <div className={styles.paymentIcons}>
                <span className={styles.paymentIcon}>RAZORPAY</span>
                <span className={styles.paymentIcon}>UPI</span>
                <span className={styles.paymentIcon}>VISA</span>
                <span className={styles.paymentIcon}>MASTERCARD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
