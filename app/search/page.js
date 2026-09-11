'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import { searchProducts } from '@/data/products';
import styles from './search.module.css';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      setResults(searchProducts(query));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className={styles.searchPage}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>
            {query ? `Search results for "${query}"` : 'Search'}
          </h1>
          <p className={styles.count}>
            {query && `${results.length} ${results.length === 1 ? 'result' : 'results'} found`}
          </p>
        </div>

        {!query ? (
          <div className={styles.emptyState}>
            <SearchIcon size={48} strokeWidth={1} className={styles.emptyIcon} />
            <h2>What are you looking for?</h2>
            <p>Enter a keyword to search our catalog of art supplies.</p>
          </div>
        ) : results.length === 0 ? (
          <div className={styles.emptyState}>
            <SearchIcon size={48} strokeWidth={1} className={styles.emptyIcon} />
            <h2>No results found</h2>
            <p>We couldn&apos;t find anything matching &quot;{query}&quot;.</p>
            <Link href="/shop" className="btn btn--primary" style={{ marginTop: 'var(--space-4)' }}>
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {results.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
