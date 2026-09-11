'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Newsletter Section */}
      <div className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <div className={styles.newsletterText}>
              <h3 className={styles.newsletterTitle}>Join the Creative Community</h3>
              <p className={styles.newsletterDesc}>
                Get early access to new arrivals, exclusive offers, and creative inspiration.
              </p>
            </div>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.newsletterInput}
                aria-label="Email for newsletter"
              />
              <button type="submit" className={`btn btn--primary ${styles.newsletterBtn}`}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandCol}>
              <Link href="/" className={styles.footerLogo}>
                FORPENCIL
              </Link>
              <p className={styles.brandText}>
                Premium art supplies and creative tools for artists, students, and everyone who loves to create.
              </p>
              <div className={styles.social}>
                <a href="#" aria-label="Instagram" className={styles.socialLink}>IG</a>
                <a href="#" aria-label="Facebook" className={styles.socialLink}>FB</a>
                <a href="#" aria-label="YouTube" className={styles.socialLink}>YT</a>
                <a href="#" aria-label="Twitter" className={styles.socialLink}>X</a>
              </div>
            </div>

            {/* Shop */}
            <div className={styles.linkCol}>
              <h6 className={styles.colTitle}>Shop</h6>
              <ul className={styles.linkList}>
                <li><Link href="/shop/paints-colours">Paints & Colours</Link></li>
                <li><Link href="/shop/drawing-illustration">Drawing & Illustration</Link></li>
                <li><Link href="/shop/brushes-accessories">Brushes & Accessories</Link></li>
                <li><Link href="/shop/paper-canvas">Paper & Canvas</Link></li>
                <li><Link href="/shop/craft">Craft</Link></li>
                <li><Link href="/shop/kids">Kids</Link></li>
                <li><Link href="/shop/stationery">Stationery</Link></li>
                <li><Link href="/shop/gift-sets">Gift Sets</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className={styles.linkCol}>
              <h6 className={styles.colTitle}>Help</h6>
              <ul className={styles.linkList}>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/about">About ForPencil</Link></li>
                <li><Link href="/shipping">Shipping & Delivery</Link></li>
                <li><Link href="/returns">Returns & Refunds</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.linkCol}>
              <h6 className={styles.colTitle}>Contact</h6>
              <ul className={styles.contactList}>
                <li>
                  <Mail size={14} />
                  <a href="mailto:hello@forpencil.com">hello@forpencil.com</a>
                </li>
                <li>
                  <Phone size={14} />
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </li>
                <li>
                  <MapPin size={14} />
                  <span>India</span>
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
              © {new Date().getFullYear()} ForPencil. All rights reserved.
            </p>
            <div className={styles.payments}>
              <span className={styles.paymentLabel}>Secure Payments</span>
              <div className={styles.paymentIcons}>
                <span className={styles.paymentIcon}>Visa</span>
                <span className={styles.paymentIcon}>Mastercard</span>
                <span className={styles.paymentIcon}>UPI</span>
                <span className={styles.paymentIcon}>GPay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
