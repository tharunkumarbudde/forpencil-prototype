'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, X, ArrowRight, Check } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import { products } from '@/data/products';
import { categories, brands } from '@/data/categories';
import styles from './shop.module.css';

export default function ShopPage() {
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    
    if (selectedBrands.length > 0) {
      sorted = sorted.filter(p => selectedBrands.includes(p.brand));
    }
    sorted = sorted.filter(p => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'rating':
        sorted.sort((a, b) => Number(b.average_rating) - Number(a.average_rating));
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        sorted.sort((a, b) => b.rating_count - a.rating_count);
    }
    return sorted;
  }, [sortBy, selectedBrands, priceRange]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 5000]);
  };

  const activeFilterCount = selectedBrands.length + (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0);

  return (
    <div className={styles.shopPage}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">Shop All</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Category Editorial Header */}
      <div className={styles.categoryHeader}>
        <div className="container">
          <span className="eyebrow eyebrow--accent">CURATED CATALOG</span>
          <h1 className={styles.categoryTitle}>All Art Supplies & Tools</h1>
          <p className={styles.categoryDesc}>
            Explore our complete collection of archival watercolors, acrylics, fine sketchbooks, calligraphic inks, and artist tools.
          </p>

          {/* Top Subcategory Chips */}
          <div className={styles.subCatChips}>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/shop/${cat.slug}`} className={styles.subCatChip}>
                {cat.name} <span className={styles.subCatChipCount}>({cat.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Filter Toolbar */}
      <div className={styles.toolbar}>
        <div className="container">
          <div className={styles.toolbarInner}>
            <button
              className={styles.filterToggle}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={15} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className={styles.filterCount}>{activeFilterCount}</span>
              )}
            </button>

            <span className={styles.productCount}>Showing {sortedProducts.length} curated products</span>

            <div className={styles.toolbarRight}>
              <label htmlFor="sort" className={styles.sortLabel}>Sort by:</label>
              <select
                id="sort"
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Most Popular</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFilterCount > 0 && (
            <div className={styles.activeTagsRow}>
              {selectedBrands.map((brand) => (
                <span key={brand} className={styles.activeTag}>
                  Brand: {brand}
                  <button onClick={() => toggleBrand(brand)} aria-label={`Remove ${brand} filter`}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                <span className={styles.activeTag}>
                  Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                  <button onClick={() => setPriceRange([0, 5000])} aria-label="Remove price filter">
                    <X size={12} />
                  </button>
                </span>
              )}
              <button className={styles.clearAllBtn} onClick={clearFilters}>
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <div className={styles.shopLayout}>
          {/* Filter Sidebar */}
          <aside className={`${styles.filterSidebar} ${showFilters ? styles.filterOpen : ''}`}>
            <div className={styles.filterHeader}>
              <h3 className={styles.filterTitle}>Filter Catalog</h3>
              {activeFilterCount > 0 && (
                <button className={styles.clearFilters} onClick={clearFilters}>
                  Clear all
                </button>
              )}
              <button
                className={styles.filterClose}
                onClick={() => setShowFilters(false)}
                aria-label="Close filter drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Categories */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterGroupTitle}>Categories</h4>
              <ul className={styles.filterList}>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/shop/${cat.slug}`} className={styles.filterLink}>
                      <span>{cat.name}</span>
                      <span className={styles.filterLinkCount}>{cat.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterGroupTitle}>Brands</h4>
              <ul className={styles.filterList}>
                {brands.map((brand) => (
                  <li key={brand.id}>
                    <label className={styles.filterCheckbox}>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.name)}
                        onChange={() => toggleBrand(brand.name)}
                      />
                      <span className={styles.checkmark} />
                      <span>{brand.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterGroupTitle}>Max Price (₹)</h4>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  className={styles.priceInput}
                  placeholder="Min ₹"
                  value={priceRange[0] || ''}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                />
                <span>—</span>
                <input
                  type="number"
                  className={styles.priceInput}
                  placeholder="Max ₹"
                  value={priceRange[1] || ''}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 5000])}
                />
              </div>
            </div>
          </aside>

          {/* Filter Mobile Overlay Backdrop */}
          {showFilters && (
            <div
              className={styles.filterOverlay}
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Product Grid Area */}
          <div className={styles.productArea}>
            {sortedProducts.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No products match your current filters</h3>
                <p>Try expanding your price range or clearing brand selections.</p>
                <button className="btn btn--secondary" onClick={clearFilters}>
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={styles.productGrid}>
                {sortedProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
