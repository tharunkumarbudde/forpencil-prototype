'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, ChevronDown, Grid3X3, LayoutGrid, X } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import { products } from '@/data/products';
import { categories, brands, getCategoryBySlug } from '@/data/categories';
import styles from './shop.module.css';

export default function ShopPage() {
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [gridCols, setGridCols] = useState(4);

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

      {/* Category Header */}
      <div className={styles.categoryHeader}>
        <div className="container">
          <h1 className={styles.categoryTitle}>Shop All Products</h1>
          <p className={styles.categoryDesc}>
            Explore our complete collection of premium art supplies, creative tools, and materials.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className="container">
          <div className={styles.toolbarInner}>
            <button
              className={styles.filterToggle}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className={styles.filterCount}>{activeFilterCount}</span>
              )}
            </button>

            <span className={styles.productCount}>{sortedProducts.length} products</span>

            <div className={styles.toolbarRight}>
              <div className={styles.sortWrap}>
                <label htmlFor="sort" className="sr-only">Sort by</label>
                <select
                  id="sort"
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Avg. Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.shopLayout}>
          {/* Filter Sidebar */}
          <aside className={`${styles.filterSidebar} ${showFilters ? styles.filterOpen : ''}`}>
            <div className={styles.filterHeader}>
              <h3 className={styles.filterTitle}>Filters</h3>
              {activeFilterCount > 0 && (
                <button className={styles.clearFilters} onClick={clearFilters}>
                  Clear all
                </button>
              )}
              <button
                className={`${styles.filterClose}`}
                onClick={() => setShowFilters(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Categories */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterGroupTitle}>Categories</h4>
              <ul className={styles.filterList}>
                {categories.slice(0, 8).map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/shop/${cat.slug}`} className={styles.filterLink}>
                      {cat.name}
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
                {brands.slice(0, 10).map((brand) => (
                  <li key={brand.name}>
                    <label className={styles.filterCheckbox}>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.name)}
                        onChange={() => toggleBrand(brand.name)}
                      />
                      <span className={styles.checkmark} />
                      <span className={styles.filterName}>{brand.name}</span>
                      <span className={styles.filterCount}>({brand.count})</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterGroupTitle}>Price</h4>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  className={styles.priceInput}
                  placeholder="Min"
                  value={priceRange[0] || ''}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                />
                <span>—</span>
                <input
                  type="number"
                  className={styles.priceInput}
                  placeholder="Max"
                  value={priceRange[1] || ''}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 5000])}
                />
              </div>
            </div>

            {/* Availability */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterGroupTitle}>Availability</h4>
              <ul className={styles.filterList}>
                <li>
                  <label className={styles.filterCheckbox}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.checkmark} />
                    <span>In Stock</span>
                  </label>
                </li>
              </ul>
            </div>
          </aside>

          {/* Filter Overlay (mobile) */}
          {showFilters && (
            <div
              className={styles.filterOverlay}
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Product Grid */}
          <div className={styles.productArea}>
            {sortedProducts.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search for something else.</p>
                <button className="btn btn--secondary" onClick={clearFilters}>
                  Clear Filters
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
