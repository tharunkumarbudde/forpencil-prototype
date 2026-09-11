'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Heart, MapPin, User, LogOut } from 'lucide-react';
import styles from './account.module.css';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className={styles.accountPage}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>My Account</h1>
          <button className={styles.logoutBtn}>
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>JD</div>
              <div>
                <h2 className={styles.userName}>John Doe</h2>
                <p className={styles.userEmail}>john.doe@example.com</p>
              </div>
            </div>

            <nav className={styles.nav}>
              <button
                className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={18} />
                Orders
              </button>
              <button
                className={`${styles.navItem} ${activeTab === 'addresses' ? styles.active : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                <MapPin size={18} />
                Addresses
              </button>
              <Link href="/wishlist" className={styles.navItem}>
                <Heart size={18} />
                Wishlist
              </Link>
              <button
                className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} />
                Account Details
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className={styles.main}>
            {activeTab === 'orders' && (
              <div className={styles.tabContent}>
                <h2 className={styles.tabTitle}>Order History</h2>
                <div className={styles.emptyState}>
                  <Package size={48} strokeWidth={1} className={styles.emptyIcon} />
                  <h3>No orders yet</h3>
                  <p>You haven&apos;t placed any orders yet.</p>
                  <Link href="/shop" className="btn btn--primary">Start Shopping</Link>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className={styles.tabContent}>
                <div className={styles.tabHeader}>
                  <h2 className={styles.tabTitle}>Saved Addresses</h2>
                  <button className="btn btn--secondary btn--sm">Add New</button>
                </div>
                <div className={styles.addressCard}>
                  <span className="badge badge--new">Default</span>
                  <p className={styles.addressName}>John Doe</p>
                  <p className={styles.addressText}>
                    123 Art Street, Creative City<br />
                    Maharashtra, 400001<br />
                    India
                  </p>
                  <p className={styles.addressPhone}>+91 98765 43210</p>
                  <div className={styles.addressActions}>
                    <button className={styles.actionBtn}>Edit</button>
                    <button className={styles.actionBtn}>Delete</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className={styles.tabContent}>
                <h2 className={styles.tabTitle}>Account Details</h2>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>First Name</label>
                      <input type="text" className="input" defaultValue="John" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Last Name</label>
                      <input type="text" className="input" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input type="email" className="input" defaultValue="john.doe@example.com" readOnly />
                  </div>
                  
                  <h3 className={styles.subTitle}>Change Password</h3>
                  <div className={styles.formGroup}>
                    <label>Current Password</label>
                    <input type="password" className="input" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>New Password</label>
                    <input type="password" className="input" />
                  </div>
                  <button type="submit" className="btn btn--primary">Save Changes</button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
