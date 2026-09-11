/* Mock data: Categories — mirrors WooCommerce REST API v3 response shape */

export const categories = [
  {
    id: 1,
    name: 'Paints & Colours',
    slug: 'paints-colours',
    description: 'Premium paints and colours for every medium — from watercolours and acrylics to oils and gouache.',
    image: null,
    count: 245,
    parent: 0,
    children: [
      { id: 11, name: 'Acrylic Colours', slug: 'acrylic-colours', count: 68, parent: 1 },
      { id: 12, name: 'Watercolours', slug: 'watercolours', count: 54, parent: 1 },
      { id: 13, name: 'Oil Colours', slug: 'oil-colours', count: 32, parent: 1 },
      { id: 14, name: 'Gouache Paints', slug: 'gouache-paints', count: 18, parent: 1 },
      { id: 15, name: 'Fabric Painting', slug: 'fabric-painting', count: 24, parent: 1 },
      { id: 16, name: 'Alcohol Inks', slug: 'alcohol-inks', count: 15, parent: 1 },
      { id: 17, name: 'Pastels & Crayons', slug: 'pastels-crayons', count: 22, parent: 1 },
      { id: 18, name: 'Chalk Paints', slug: 'chalk-paints', count: 12, parent: 1 },
    ],
  },
  {
    id: 2,
    name: 'Drawing & Illustration',
    slug: 'drawing-illustration',
    description: 'Pencils, pens, markers and everything for drawing, sketching and illustration.',
    image: null,
    count: 312,
    parent: 0,
    children: [
      { id: 21, name: 'Pencils', slug: 'pencils', count: 65, parent: 2 },
      { id: 22, name: 'Pens', slug: 'pens', count: 78, parent: 2 },
      { id: 23, name: 'Markers', slug: 'markers', count: 45, parent: 2 },
      { id: 24, name: 'Pastels', slug: 'pastels', count: 32, parent: 2 },
      { id: 25, name: 'Calligraphy', slug: 'calligraphy', count: 28, parent: 2 },
      { id: 26, name: 'Inks', slug: 'inks', count: 20, parent: 2 },
    ],
  },
  {
    id: 3,
    name: 'Brushes & Accessories',
    slug: 'brushes-accessories',
    description: 'Quality brushes for every technique, plus essential painting accessories.',
    image: null,
    count: 187,
    parent: 0,
    children: [
      { id: 31, name: 'Acrylic Brushes', slug: 'acrylic-brushes', count: 35, parent: 3 },
      { id: 32, name: 'Watercolour Brushes', slug: 'watercolour-brushes', count: 42, parent: 3 },
      { id: 33, name: 'Oil Brushes', slug: 'oil-brushes', count: 28, parent: 3 },
      { id: 34, name: 'Easels', slug: 'easels', count: 15, parent: 3 },
      { id: 35, name: 'Palettes & Knives', slug: 'palettes-knives', count: 22, parent: 3 },
    ],
  },
  {
    id: 4,
    name: 'Paper & Canvas',
    slug: 'paper-canvas',
    description: 'Sketchbooks, watercolour paper, canvas boards, stretched canvas and specialty papers.',
    image: null,
    count: 198,
    parent: 0,
    children: [
      { id: 41, name: 'Watercolour Paper', slug: 'watercolour-paper', count: 45, parent: 4 },
      { id: 42, name: 'Canvas', slug: 'canvas', count: 52, parent: 4 },
      { id: 43, name: 'Sketching Papers', slug: 'sketching-papers', count: 38, parent: 4 },
      { id: 44, name: 'Mixed Media Papers', slug: 'mixed-media-papers', count: 22, parent: 4 },
      { id: 45, name: 'Diaries & Journals', slug: 'diaries-journals', count: 18, parent: 4 },
    ],
  },
  {
    id: 5,
    name: 'Sketch & Drawing',
    slug: 'sketch-drawing',
    description: 'Sketchbooks and watercolour books in every size for your creative journey.',
    image: null,
    count: 86,
    parent: 0,
    children: [
      { id: 51, name: 'Sketch Books', slug: 'sketch-books', count: 48, parent: 5 },
      { id: 52, name: 'Watercolour Books', slug: 'watercolour-books', count: 38, parent: 5 },
    ],
  },
  {
    id: 6,
    name: 'Craft',
    slug: 'craft',
    description: 'Resin art, decoupage, tapes, decoratives and creative craft supplies.',
    image: null,
    count: 134,
    parent: 0,
    children: [
      { id: 61, name: 'Resin Art', slug: 'resin-art', count: 35, parent: 6 },
      { id: 62, name: 'Decoupage Art', slug: 'decoupage-art', count: 18, parent: 6 },
      { id: 63, name: 'Wood Products', slug: 'wood-products', count: 24, parent: 6 },
      { id: 64, name: 'Decoratives', slug: 'decoratives', count: 28, parent: 6 },
      { id: 65, name: 'Tapes', slug: 'tapes', count: 16, parent: 6 },
    ],
  },
  {
    id: 7,
    name: 'Kids',
    slug: 'kids',
    description: 'Creative supplies designed for young artists and budding creators.',
    image: null,
    count: 92,
    parent: 0,
    children: [
      { id: 71, name: 'Crayons', slug: 'crayons', count: 22, parent: 7 },
      { id: 72, name: 'Colour Pencils', slug: 'colour-pencils', count: 18, parent: 7 },
      { id: 73, name: 'Poster Colours', slug: 'poster-colours', count: 15, parent: 7 },
      { id: 74, name: 'Activity Sets', slug: 'activity-sets', count: 20, parent: 7 },
    ],
  },
  {
    id: 8,
    name: 'Stationery',
    slug: 'stationery',
    description: 'Essential desk supplies, pens, adhesives and organisational accessories.',
    image: null,
    count: 156,
    parent: 0,
    children: [
      { id: 81, name: 'Desk Accessories', slug: 'desk-accessories', count: 45, parent: 8 },
      { id: 82, name: 'Adhesives', slug: 'adhesives', count: 18, parent: 8 },
      { id: 83, name: 'Sharpeners & Erasers', slug: 'sharpeners-erasers', count: 28, parent: 8 },
    ],
  },
  {
    id: 9,
    name: 'Surface',
    slug: 'surface',
    description: 'Canvas boards, stretched canvas, canvas rolls and MDF boards.',
    image: null,
    count: 78,
    parent: 0,
  },
  {
    id: 10,
    name: 'Gift Sets',
    slug: 'gift-sets',
    description: 'Curated art supply gift sets for every occasion.',
    image: null,
    count: 24,
    parent: 0,
  },
];

export const brands = [
  { id: 1, name: 'Brustro', slug: 'brustro', logo: null },
  { id: 2, name: 'Winsor & Newton', slug: 'winsor-newton', logo: null },
  { id: 3, name: 'Faber-Castell', slug: 'faber-castell', logo: null },
  { id: 4, name: 'Camel', slug: 'camel', logo: null },
  { id: 5, name: 'Daler Rowney', slug: 'daler-rowney', logo: null },
  { id: 6, name: 'Sakura', slug: 'sakura', logo: null },
  { id: 7, name: 'Staedtler', slug: 'staedtler', logo: null },
  { id: 8, name: 'Copic', slug: 'copic', logo: null },
  { id: 9, name: 'Artline', slug: 'artline', logo: null },
  { id: 10, name: 'POSCA', slug: 'posca', logo: null },
  { id: 11, name: 'Mungyo', slug: 'mungyo', logo: null },
  { id: 12, name: 'Mont Marte', slug: 'mont-marte', logo: null },
];

export function getCategoryBySlug(slug) {
  for (const cat of categories) {
    if (cat.slug === slug) return cat;
    if (cat.children) {
      const child = cat.children.find((c) => c.slug === slug);
      if (child) return child;
    }
  }
  return null;
}

export function getTopLevelCategories() {
  return categories.filter((c) => c.parent === 0);
}
