import { categories } from '@/data/categories';

export function generateStaticParams() {
  return categories.map((c) => ({
    category: c.slug,
  }));
}

export default function CategoryLayout({ children }) {
  return <>{children}</>;
}
