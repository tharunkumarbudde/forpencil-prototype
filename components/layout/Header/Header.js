'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Phone, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { categories } from '@/data/categories';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, toggleDrawer } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isMobileMenuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'Shop All', href: '/shop', hasMega: false },
    { label: 'Art Supplies', href: '/shop/paints-colours', hasMega: true, megaKey: 'art' },
    { label: 'Drawing', href: '/shop/drawing-illustration', hasMega: true, megaKey: 'drawing' },
    { label: 'Paper & Canvas', href: '/shop/paper-canvas', hasMega: true, megaKey: 'paper' },
    { label: 'Brushes', href: '/shop/brushes-accessories', hasMega: false },
    { label: 'Craft', href: '/shop/craft', hasMega: false },
    { label: 'Kids', href: '/shop/kids', hasMega: false },
  ];

  const megaMenuData = {
    art: {
      title: 'Art Supplies',
      columns: [
        {
          title: 'Painting',
          links: [
            { label: 'Watercolours', href: '/shop/watercolours' },
            { label: 'Acrylic Colours', href: '/shop/acrylic-colours' },
            { label: 'Oil Colours', href: '/shop/oil-colours' },
            { label: 'Gouache', href: '/shop/gouache-paints' },
            { label: 'Fabric Painting', href: '/shop/fabric-painting' },
            { label: 'Alcohol Inks', href: '/shop/alcohol-inks' },
          ],
        },
        {
          title: 'Mediums & More',
          links: [
            { label: 'Pastels & Crayons', href: '/shop/pastels-crayons' },
            { label: 'Chalk Paints', href: '/shop/chalk-paints' },
            { label: 'Spray Cans', href: '/shop/spray-cans' },
            { label: 'Fixatives', href: '/shop/fixatives' },
          ],
        },
        {
          title: 'Collections',
          links: [
            { label: 'Bestsellers', href: '/shop?tag=bestseller' },
            { label: 'New Arrivals', href: '/shop?tag=new' },
            { label: 'Under ₹500', href: '/shop?max_price=500' },
            { label: 'Gift Sets', href: '/shop/gift-sets' },
            { label: 'Clearance', href: '/shop/clearance-sale' },
          ],
        },
      ],
    },
    drawing: {
      title: 'Drawing & Illustration',
      columns: [
        {
          title: 'Drawing',
          links: [
            { label: 'Graphite Pencils', href: '/shop/pencils' },
            { label: 'Charcoal', href: '/shop/charcoal-graphite-pencils' },
            { label: 'Coloured Pencils', href: '/shop/colour-pencils' },
            { label: 'Sketch Books', href: '/shop/sketch-books' },
          ],
        },
        {
          title: 'Pens & Markers',
          links: [
            { label: 'Fineliners', href: '/shop/fineliner-pens' },
            { label: 'Brush Pens', href: '/shop/brush-pens' },
            { label: 'Markers', href: '/shop/markers' },
            { label: 'POSCA', href: '/shop/posca' },
          ],
        },
        {
          title: 'Calligraphy & Ink',
          links: [
            { label: 'Calligraphy Pens', href: '/shop/calligraphy' },
            { label: 'Inks', href: '/shop/inks' },
            { label: 'Nibs', href: '/shop/pens-nibs' },
          ],
        },
      ],
    },
    paper: {
      title: 'Paper & Canvas',
      columns: [
        {
          title: 'Paper',
          links: [
            { label: 'Watercolour Paper', href: '/shop/watercolour-paper' },
            { label: 'Sketching Paper', href: '/shop/sketching-papers' },
            { label: 'Mixed Media Paper', href: '/shop/mixed-media-papers' },
            { label: 'Diaries & Journals', href: '/shop/diaries-journals' },
          ],
        },
        {
          title: 'Canvas',
          links: [
            { label: 'Stretched Canvas', href: '/shop/stretched-canvas' },
            { label: 'Canvas Boards', href: '/shop/canvas-boards' },
            { label: 'Canvas Roll', href: '/shop/canvas-roll' },
            { label: 'Canvas Pad', href: '/shop/canvas-pad' },
            { label: 'Gesso', href: '/shop/gesso' },
          ],
        },
        {
          title: 'Books',
          links: [
            { label: 'Sketch Books', href: '/shop/sketch-books' },
            { label: 'Watercolour Books', href: '/shop/watercolour-books' },
          ],
        },
      ],
    },
  };

  return (
    <>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topBarLeft}>
            <Truck size={14} />
            <span>Free shipping on orders above ₹999</span>
          </div>
          <div className={styles.topBarRight}>
            <a href="tel:+919876543210" className={styles.topBarLink}>
              <Phone size={12} />
              <span>Support</span>
            </a>
            <span className={styles.topBarDivider}>|</span>
            <Link href="/about" className={styles.topBarLink}>About</Link>
            <span className={styles.topBarDivider}>|</span>
            <Link href="/contact" className={styles.topBarLink}>Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={`container ${styles.headerInner}`}>
          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.iconBtn} ${styles.mobileOnly}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>FORPENCIL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <div
                key={item.label}
                className={styles.navItem}
                onMouseEnter={() => item.hasMega && setActiveMegaMenu(item.megaKey)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                  {item.hasMega && <ChevronDown size={12} className={styles.navChevron} />}
                </Link>

                {/* Mega Menu */}
                {item.hasMega && activeMegaMenu === item.megaKey && (
                  <div className={styles.megaMenu}>
                    <div className={styles.megaMenuInner}>
                      <div className={styles.megaColumns}>
                        {megaMenuData[item.megaKey]?.columns.map((col, idx) => (
                          <div key={idx} className={styles.megaColumn}>
                            <h6 className={styles.megaColumnTitle}>{col.title}</h6>
                            <ul className={styles.megaColumnLinks}>
                              {col.links.map((link) => (
                                <li key={link.href}>
                                  <Link href={link.href} className={styles.megaLink}>
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link href="/account" className={`${styles.iconBtn} ${styles.desktopOnly}`} aria-label="Account">
              <User size={20} />
            </Link>
            <Link href="/wishlist" className={`${styles.iconBtn} ${styles.desktopOnly}`} aria-label="Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className={styles.badge}>{wishlistCount}</span>
              )}
            </Link>
            <button
              className={styles.iconBtn}
              onClick={toggleDrawer}
              aria-label={`Cart (${cartCount} items)`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className={styles.searchOverlay} role="dialog" aria-label="Search">
          <div className={styles.searchOverlayInner}>
            <div className={styles.searchHeader}>
              <h2 className={styles.searchTitle}>Search</h2>
              <button
                className={styles.iconBtn}
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.searchInputWrap}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search for products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className={styles.searchSuggestions}>
              <h6 className={styles.searchSuggestionsTitle}>Popular Searches</h6>
              <div className={styles.searchTags}>
                {['Watercolour', 'Brush Pens', 'Sketchbook', 'Acrylic Paint', 'POSCA', 'Canvas', 'Pencils'].map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className={styles.searchTag}
                    onClick={() => setIsSearchOpen(false)}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuHeader}>
              <span className={styles.logoText}>FORPENCIL</span>
              <button
                className={styles.iconBtn}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className={styles.mobileNav}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="divider" />
              <Link href="/account" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
                <User size={18} /> Account
              </Link>
              <Link href="/wishlist" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
                <Heart size={18} /> Wishlist
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
