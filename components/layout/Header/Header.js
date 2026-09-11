'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, 
  ArrowRight, Sparkles, Truck, ShieldCheck, HelpCircle 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products, searchProducts, formatPrice } from '@/data/products';
import { categories, brands } from '@/data/categories';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  const { cartCount, toggleDrawer } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isMobileMenuOpen || isSearchOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isMobileMenuOpen, isSearchOpen]);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setSearchResults(searchProducts(searchQuery).slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navItems = [
    { label: 'Shop All', href: '/shop', hasMega: false },
    { label: 'Art Supplies', href: '/shop/paints-colours', hasMega: true, megaKey: 'art' },
    { label: 'Drawing & Writing', href: '/shop/drawing-illustration', hasMega: true, megaKey: 'drawing' },
    { label: 'Paper & Canvas', href: '/shop/paper-canvas', hasMega: true, megaKey: 'paper' },
    { label: 'Brushes & Tools', href: '/shop/brushes-accessories', hasMega: false },
    { label: 'Craft', href: '/shop/craft', hasMega: false },
    { label: 'Gift Sets', href: '/shop/gift-sets', hasMega: false },
  ];

  const megaMenuData = {
    art: {
      title: 'Art Supplies',
      columns: [
        {
          title: 'Color Mediums',
          links: [
            { label: 'Watercolours', href: '/shop/watercolours' },
            { label: 'Acrylic Colours', href: '/shop/acrylic-colours' },
            { label: 'Oil Colours', href: '/shop/oil-colours' },
            { label: 'Gouache Paints', href: '/shop/gouache-paints' },
            { label: 'Alcohol Inks', href: '/shop/alcohol-inks' },
            { label: 'Fabric Painting', href: '/shop/fabric-painting' },
          ],
        },
        {
          title: 'Pastels & Effects',
          links: [
            { label: 'Pastels & Crayons', href: '/shop/pastels-crayons' },
            { label: 'Chalk Paints', href: '/shop/chalk-paints' },
            { label: 'Resin Art', href: '/shop/resin-art' },
            { label: 'Palettes & Knives', href: '/shop/palettes-knives' },
          ],
        },
        {
          title: 'Curated Worlds',
          links: [
            { label: 'The Artist’s Desk', href: '/shop?collection=artists-desk' },
            { label: 'Bestsellers', href: '/shop?filter=bestseller' },
            { label: 'New Arrivals', href: '/shop?filter=new' },
            { label: 'Clearance Vault', href: '/shop?filter=clearance' },
          ],
        },
      ],
      editorialCard: {
        tag: 'Curated World',
        title: 'Granulating Watercolours & Fine Pigments',
        desc: 'Experience pure archival pigments engineered for lightfast beauty.',
        link: '/shop/watercolours',
        btnText: 'Explore Pigments',
        imgSrc: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
      },
    },
    drawing: {
      title: 'Drawing & Illustration',
      columns: [
        {
          title: 'Pencils & Charcoal',
          links: [
            { label: 'Graphite Pencils', href: '/shop/pencils' },
            { label: 'Charcoal Pencils', href: '/shop/pencils' },
            { label: 'Coloured Pencils', href: '/shop/pencils' },
            { label: 'Sketch Books', href: '/shop/sketch-books' },
          ],
        },
        {
          title: 'Pens & Markers',
          links: [
            { label: 'Fineliner Pens', href: '/shop/pens' },
            { label: 'Brush Pens', href: '/shop/pens' },
            { label: 'Acrylic Markers & POSCA', href: '/shop/markers' },
            { label: 'Calligraphy & Inks', href: '/shop/calligraphy' },
          ],
        },
        {
          title: 'Featured Brands',
          links: [
            { label: 'Brustro', href: '/shop?brand=brustro' },
            { label: 'Faber-Castell', href: '/shop?brand=faber-castell' },
            { label: 'Sakura', href: '/shop?brand=sakura' },
            { label: 'Staedtler', href: '/shop?brand=staedtler' },
          ],
        },
      ],
      editorialCard: {
        tag: 'Artist Selection',
        title: 'Precision Fineliners & Technical Inks',
        desc: 'Engineered Japanese nibs designed for ultra-sharp architectural precision.',
        link: '/shop/drawing-illustration',
        btnText: 'View Tools',
        imgSrc: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop',
      },
    },
    paper: {
      title: 'Paper & Canvas',
      columns: [
        {
          title: 'Paper Surfaces',
          links: [
            { label: 'Cotton Watercolour Paper', href: '/shop/watercolour-paper' },
            { label: 'Sketching & Drawing Pads', href: '/shop/sketching-papers' },
            { label: 'Mixed Media Sheets', href: '/shop/mixed-media-papers' },
            { label: 'Diaries & Art Journals', href: '/shop/diaries-journals' },
          ],
        },
        {
          title: 'Canvas & Boards',
          links: [
            { label: 'Stretched Cotton Canvas', href: '/shop/canvas' },
            { label: 'MDF & Canvas Boards', href: '/shop/canvas' },
            { label: 'Canvas Rolls', href: '/shop/canvas' },
            { label: 'Gesso & Primers', href: '/shop/paints-colours' },
          ],
        },
        {
          title: 'Formats',
          links: [
            { label: 'Cold Pressed (300 GSM)', href: '/shop/watercolour-paper' },
            { label: 'Hot Pressed Smooth', href: '/shop/watercolour-paper' },
            { label: 'Rough Texture', href: '/shop/watercolour-paper' },
          ],
        },
      ],
      editorialCard: {
        tag: 'Substrate Focus',
        title: '100% Cotton 300 GSM Archival Surfaces',
        desc: 'Superior water absorption and lifting capabilities for fine art watercolors.',
        link: '/shop/paper-canvas',
        btnText: 'Discover Surfaces',
        imgSrc: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
      },
    },
  };

  return (
    <>
      {/* Editorial Top Announcement Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topBarLeft}>
            <Truck size={13} className={styles.topBarIcon} />
            <span>Complimentary Express Shipping on Orders Above ₹999</span>
          </div>
          <div className={styles.topBarRight}>
            <span className={styles.topBarBadge}>
              <Sparkles size={11} /> 100% Authentic Fine Art Supplies
            </span>
            <span className={styles.topBarDivider}>/</span>
            <Link href="/about" className={styles.topBarLink}>Our Story</Link>
            <span className={styles.topBarDivider}>/</span>
            <Link href="/contact" className={styles.topBarLink}>Support</Link>
          </div>
        </div>
      </div>

      {/* Main Editorial Header */}
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={`container ${styles.headerInner}`}>
          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.iconBtn} ${styles.mobileOnly}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          {/* Editorial Brand Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>FORPENCIL</span>
            <span className={styles.logoSub}>FINE ART SUPPLIES</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Main Navigation">
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

                {/* Rich Editorial Mega Menu */}
                {item.hasMega && activeMegaMenu === item.megaKey && (
                  <div className={styles.megaMenu}>
                    <div className={styles.megaMenuInner}>
                      <div className={styles.megaContent}>
                        <div className={styles.megaColumns}>
                          {megaMenuData[item.megaKey]?.columns.map((col, idx) => (
                            <div key={idx} className={styles.megaColumn}>
                              <h6 className={styles.megaColumnTitle}>{col.title}</h6>
                              <ul className={styles.megaColumnLinks}>
                                {col.links.map((link) => (
                                  <li key={link.href}>
                                    <Link 
                                      href={link.href} 
                                      className={styles.megaLink}
                                      onClick={() => setActiveMegaMenu(null)}
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Mega Menu Editorial Card */}
                        {megaMenuData[item.megaKey]?.editorialCard && (
                          <div className={styles.megaEditorial}>
                            <div className={styles.megaEditorialImageWrap}>
                              <img 
                                src={megaMenuData[item.megaKey].editorialCard.imgSrc} 
                                alt={megaMenuData[item.megaKey].editorialCard.title}
                                className={styles.megaEditorialImg}
                              />
                            </div>
                            <div className={styles.megaEditorialBody}>
                              <span className={styles.megaEditorialTag}>
                                {megaMenuData[item.megaKey].editorialCard.tag}
                              </span>
                              <h5 className={styles.megaEditorialTitle}>
                                {megaMenuData[item.megaKey].editorialCard.title}
                              </h5>
                              <p className={styles.megaEditorialDesc}>
                                {megaMenuData[item.megaKey].editorialCard.desc}
                              </p>
                              <Link 
                                href={megaMenuData[item.megaKey].editorialCard.link}
                                className={styles.megaEditorialBtn}
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                {megaMenuData[item.megaKey].editorialCard.btnText} <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search catalog"
              title="Search"
            >
              <Search size={20} />
            </button>

            <Link 
              href="/wishlist" 
              className={`${styles.iconBtn} ${styles.desktopOnly}`} 
              aria-label="Wishlist"
              title="Saved Items"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className={styles.badge}>{wishlistCount}</span>
              )}
            </Link>

            <Link 
              href="/account" 
              className={`${styles.iconBtn} ${styles.desktopOnly}`} 
              aria-label="Account"
              title="Account"
            >
              <User size={20} />
            </Link>

            <button
              className={`${styles.iconBtn} ${styles.cartBtn}`}
              onClick={toggleDrawer}
              aria-label={`Shopping bag containing ${cartCount} items`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Upgraded Editorial Search Overlay */}
      {isSearchOpen && (
        <div className={styles.searchOverlay} role="dialog" aria-modal="true" aria-label="Search ForPencil Catalog">
          <div className={styles.searchOverlayBackdrop} onClick={() => setIsSearchOpen(false)} />
          <div className={styles.searchOverlayInner}>
            <div className={styles.searchHeader}>
              <div>
                <span className="eyebrow eyebrow--accent">CURATED SEARCH</span>
                <h2 className={styles.searchTitle}>What tools are you looking for?</h2>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className={styles.searchInputWrap}>
              <Search size={22} className={styles.searchIcon} />
              <input
                ref={searchInputRef}
                type="search"
                className={styles.searchInput}
                placeholder="Search watercolors, sketchbooks, POSCA, acrylics, Brustro..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              )}
            </form>

            {/* Instant Search Results */}
            {searchResults.length > 0 ? (
              <div className={styles.searchResults}>
                <h6 className={styles.sectionHeaderLabel}>Matching Products ({searchResults.length})</h6>
                <div className={styles.resultsList}>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className={styles.resultItem}
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <div className={styles.resultImgWrap}>
                        <img src={product.images[0]?.src} alt={product.name} />
                      </div>
                      <div className={styles.resultInfo}>
                        <span className={styles.resultBrand}>{product.brand}</span>
                        <h4 className={styles.resultName}>{product.name}</h4>
                        <div className={styles.resultPriceWrap}>
                          <span className={styles.resultPrice}>₹{formatPrice(product.price)}</span>
                          {product.on_sale && product.regular_price && (
                            <span className={styles.resultRegPrice}>₹{formatPrice(product.regular_price)}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className={styles.viewAllWrap}>
                  <button 
                    type="button" 
                    className="btn btn--secondary btn--sm"
                    onClick={handleSearchSubmit}
                  >
                    View All Results for "{searchQuery}" <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.searchSuggestions}>
                <div className={styles.suggestionCol}>
                  <h6 className={styles.sectionHeaderLabel}>Popular Mediums</h6>
                  <div className={styles.searchTags}>
                    {['Watercolours', 'Acrylic Paints', 'Sketchbooks', 'POSCA Markers', 'Graphite Pencils', 'Canvas Boards', 'Calligraphy'].map((tag) => (
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

                <div className={styles.suggestionCol}>
                  <h6 className={styles.sectionHeaderLabel}>Top Brands</h6>
                  <div className={styles.searchTags}>
                    {['Brustro', 'Faber-Castell', 'Sakura', 'Staedtler', 'Winsor & Newton', 'POSCA', 'Uniball'].map((brand) => (
                      <Link
                        key={brand}
                        href={`/shop?brand=${encodeURIComponent(brand.toLowerCase().replace(/\s+/g, '-'))}`}
                        className={styles.searchTag}
                        onClick={() => setIsSearchOpen(false)}
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upgraded Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileBackdrop} onClick={() => setIsMobileMenuOpen(false)} />
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuHeader}>
              <div>
                <span className={styles.logoMark}>FORPENCIL</span>
                <span className={styles.logoSub}>CREATIVE DESTINATION</span>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className={styles.mobileNav}>
              <div className={styles.mobileNavSection}>
                <span className={styles.mobileNavSectionTitle}>Categories</span>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} className={styles.mobileNavArrow} />
                  </Link>
                ))}
              </div>

              <div className={styles.mobileNavSection}>
                <span className={styles.mobileNavSectionTitle}>Quick Links</span>
                <Link 
                  href="/wishlist" 
                  className={styles.mobileNavLink} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart size={18} />
                  <span>Wishlist ({wishlistCount})</span>
                </Link>
                <Link 
                  href="/account" 
                  className={styles.mobileNavLink} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={18} />
                  <span>My Account</span>
                </Link>
                <Link 
                  href="/about" 
                  className={styles.mobileNavLink} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>About ForPencil</span>
                </Link>
                <Link 
                  href="/contact" 
                  className={styles.mobileNavLink} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Contact Support</span>
                </Link>
              </div>
            </nav>

            <div className={styles.mobileMenuFooter}>
              <p className={styles.mobileFooterText}>
                Crafted for artists, designers, and creative minds worldwide.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
