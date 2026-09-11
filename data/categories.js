export const categories = [
  { id: 1, name: "Paints & Colours", slug: "paints-colours", image: "https://placehold.co/400x400/1a1a1a/ffffff/png?text=Paints", count: 12 },
  { id: 2, name: "Paper & Canvas", slug: "paper-canvas", image: "https://placehold.co/400x400/1a1a1a/ffffff/png?text=Canvas", count: 15 },
  { id: 3, name: "Sketch & Drawing", slug: "sketch-drawing", image: "https://placehold.co/400x400/1a1a1a/ffffff/png?text=Sketch", count: 8 },
  { id: 4, name: "Pens & Pencils", slug: "pens-and-pencils", image: "https://placehold.co/400x400/1a1a1a/ffffff/png?text=Pens", count: 10 },
  { id: 5, name: "Brushes", slug: "brushes-2", image: "https://placehold.co/400x400/1a1a1a/ffffff/png?text=Brushes", count: 6 },
  { id: 6, name: "Markers", slug: "markers", image: "https://placehold.co/400x400/1a1a1a/ffffff/png?text=Markers", count: 5 },
  { id: 7, name: "Craft", slug: "craft", image: "https://placehold.co/400x400/1a1a1a/ffffff/png?text=Craft", count: 4 },
  { id: 8, name: "Kids", slug: "kids", image: "https://placehold.co/400x400/1a1a1a/ffffff/png?text=Kids", count: 3 }
];

export const brands = [
  { name: 'Brustro', count: 32 },
  { name: 'Camel', count: 10 },
  { name: 'Doms', count: 5 },
  { name: 'Faber-Castell', count: 2 },
  { name: 'ForPencil', count: 1 }
];

export function getCategoryBySlug(slug) {
  return categories.find(c => c.slug === slug);
}
