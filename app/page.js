'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Sparkles, Star, ChevronLeft, ChevronRight, 
  Truck, ShieldCheck, RotateCcw, Award, CheckCircle2 
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import { products } from '@/data/products';
import { brands } from '@/data/categories';
import styles from './page.module.css';

export default function HomePage() {
  const [activeMedium, setActiveMedium] = useState('watercolor');
  const [activeCreator, setActiveCreator] = useState('professional');

  // Filter product groups from mock data safely
  const trendingProducts = products.slice(0, 8);
  const bestsellers = products.filter(p => Number(p.rating_count) > 0 || p.badge === 'Bestseller').slice(0, 8);
  const artistDeskProducts = products.filter(p => 
    p.categories.some(c => ['sketch-books', 'pencils', 'pens', 'watercolours', 'acrylic-brushes'].includes(c.slug))
  ).slice(0, 6);

  const mediumData = {
    watercolor: {
      name: 'Watercolor',
      tagline: 'Luminous washes & granulating pigments',
      desc: 'Formulated with ultra-fine, lightfast pigments that disperse effortlessly on 100% cotton cold pressed paper.',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop',
      slug: 'watercolours',
      count: '120+ Products',
    },
    acrylic: {
      name: 'Acrylic',
      tagline: 'Vibrant body & buttery consistency',
      desc: 'Heavy body acrylics with intense color saturation, drying to a rich permanent satin finish.',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop',
      slug: 'acrylic-colours',
      count: '95+ Products',
    },
    gouache: {
      name: 'Gouache',
      tagline: 'Opaque brilliance & velvet matte texture',
      desc: 'Versatile water-based paints offering bold flat color layers that re-wet easily for fine adjustments.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop',
      slug: 'gouache-paints',
      count: '48+ Products',
    },
    sketching: {
      name: 'Drawing & Line',
      tagline: 'Precision graphite, charcoal & fineliners',
      desc: 'Smooth grading graphite from 9B to 9H paired with smudge-resistant technical nibs.',
      image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=1000&auto=format&fit=crop',
      slug: 'drawing-illustration',
      count: '180+ Products',
    },
    calligraphy: {
      name: 'Calligraphy & Ink',
      tagline: 'Archival sumi ink & flexible nibs',
      desc: 'Rich carbon black inks and handcrafted calligraphic nibs for timeless typographic expression.',
      image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=1000&auto=format&fit=crop',
      slug: 'calligraphy',
      count: '64+ Products',
    },
    craft: {
      name: 'Resin & Craft',
      tagline: 'Decoupage, crystal resin & mixed media',
      desc: 'Ultra-clear epoxy resin, metallic powders, and decorative accessories for dimensional craft work.',
      image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1000&auto=format&fit=crop',
      slug: 'craft',
      count: '88+ Products',
    },
  };

  const creatorTiers = {
    beginner: {
      title: 'For Beginners',
      subtitle: 'Gentle entry points for your creative spark',
      desc: 'Carefully curated starter sets with intuitive tools that respond effortlessly to your first brushstrokes.',
      href: '/shop?tag=starter',
      img: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=800&auto=format&fit=crop',
      perks: ['Easy-to-use color sets', 'Pre-tested paper pads', 'Guided instructions included'],
    },
    student: {
      title: 'For Students',
      subtitle: 'High-performance value for art school & studio practice',
      desc: 'Reliable student-grade pigments, heavy-duty sketchbook bindings, and durable synthetic brushes.',
      href: '/shop?tag=student',
      img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop',
      perks: ['High pigment load', 'Archival quality paper', 'Student discount ready'],
    },
    hobbyist: {
      title: 'For Hobbyists',
      subtitle: 'Elevated materials to expand your weekend practice',
      desc: 'Explore specialized mediums like granulating watercolors, alcohol inks, and cotton rag sketchbooks.',
      href: '/shop?tag=hobbyist',
      img: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=800&auto=format&fit=crop',
      perks: ['Unique color palettes', 'Premium synthetic natural hair', 'Gift-worthy packaging'],
    },
    professional: {
      title: 'For Professionals',
      subtitle: 'Single-pigment purity & museum-grade permanence',
      desc: 'Pure lightfast pigments, 100% rag papers, and master-crafted sable brushes built for gallery work.',
      href: '/shop?tag=professional',
      img: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=800&auto=format&fit=crop',
      perks: ['ASTM Lightfastness I rating', '300-600 GSM Cotton Paper', 'Precision engineered tools'],
    },
  };

  return (
    <div className={styles.homepage}>
      {/* ── 01 EDITORIAL HERO ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGlow} />
        </div>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroGrid}>
            <div className={styles.heroTextCol}>
              <span className={styles.heroTag}>
                <Sparkles size={14} className={styles.heroTagIcon} />
                FORPENCIL EDITORIAL COMMERCE
              </span>
              <h1 className={styles.heroMainTitle}>
                CREATE <br />
                <span className={styles.heroOutlineText}>WITHOUT</span> <br />
                LIMITS<span className={styles.heroDot}>.</span>
              </h1>
              <p className={styles.heroDescription}>
                A digital sanctuary for artists, illustrators, and makers. 
                Discover museum-grade pigments, handcrafted brushes, and cotton surfaces designed for your finest ideas.
              </p>
              <div className={styles.heroCtaGroup}>
                <Link href="/shop" className="btn btn--primary btn--lg">
                  SHOP ART SUPPLIES <ArrowRight size={16} />
                </Link>
                <Link href="/shop/paints-colours" className="btn btn--secondary btn--lg">
                  EXPLORE COLLECTIONS
                </Link>
              </div>

              <div className={styles.heroStatsRow}>
                <div className={styles.heroStatItem}>
                  <span className={styles.heroStatNumber}>500+</span>
                  <span className={styles.heroStatLabel}>Curated Tools</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStatItem}>
                  <span className={styles.heroStatNumber}>100%</span>
                  <span className={styles.heroStatLabel}>Authentic Brands</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStatItem}>
                  <span className={styles.heroStatNumber}>4.9★</span>
                  <span className={styles.heroStatLabel}>Creator Rating</span>
                </div>
              </div>
            </div>

            <div className={styles.heroVisualCol}>
              <div className={styles.heroImageCardMain}>
                <img 
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop" 
                  alt="Watercolor pigment palette"
                  className={styles.heroImgMain}
                />
                <div className={styles.heroBadgeFloating}>
                  <span className={styles.heroBadgeCategory}>Featured Medium</span>
                  <span className={styles.heroBadgeTitle}>Pure Artists’ Pigments</span>
                </div>
              </div>
              <div className={styles.heroImageCardSecondary}>
                <img 
                  src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop" 
                  alt="Fine sketching nibs and tools"
                  className={styles.heroImgSecondary}
                />
                <div className={styles.heroSecondaryCaption}>
                  <span>Studio Edition 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 SHOP BY CREATIVE WORLD (ASYMMETRIC GRID) ── */}
      <section className={`section ${styles.worldsSection}`}>
        <div className="container">
          <div className={styles.sectionHeadingWrap}>
            <div>
              <span className="eyebrow eyebrow--accent">01 / DISCOVER WORLDS</span>
              <h2 className={styles.sectionTitle}>Shop by Creative World</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Intentionally grouped environments tailored for specific mediums, techniques, and studio workflows.
            </p>
          </div>

          <div className={styles.asymmetricGrid}>
            {/* World 1: DRAW (Large Hero Tile) */}
            <Link href="/shop/drawing-illustration" className={`${styles.worldTile} ${styles.worldTileLarge}`}>
              <img 
                src="https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=800&auto=format&fit=crop" 
                alt="DRAW world" 
                className={styles.worldTileImg}
              />
              <div className={styles.worldTileOverlay} />
              <div className={styles.worldTileContent}>
                <span className={styles.worldTileNum}>01</span>
                <h3 className={styles.worldTileTitle}>DRAW</h3>
                <p className={styles.worldTileDesc}>Graphite, charcoal, technical nibs & archival sketchbooks</p>
                <span className={styles.worldTileLink}>
                  Explore World <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            {/* World 2: PAINT */}
            <Link href="/shop/paints-colours" className={styles.worldTile}>
              <img 
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop" 
                alt="PAINT world" 
                className={styles.worldTileImg}
              />
              <div className={styles.worldTileOverlay} />
              <div className={styles.worldTileContent}>
                <span className={styles.worldTileNum}>02</span>
                <h3 className={styles.worldTileTitle}>PAINT</h3>
                <p className={styles.worldTileDesc}>Watercolors, heavy acrylics, oils & gouache</p>
                <span className={styles.worldTileLink}>
                  Explore World <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            {/* World 3: WRITE */}
            <Link href="/shop/stationery" className={styles.worldTile}>
              <img 
                src="https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=800&auto=format&fit=crop" 
                alt="WRITE world" 
                className={styles.worldTileImg}
              />
              <div className={styles.worldTileOverlay} />
              <div className={styles.worldTileContent}>
                <span className={styles.worldTileNum}>03</span>
                <h3 className={styles.worldTileTitle}>WRITE</h3>
                <p className={styles.worldTileDesc}>Calligraphy nibs, sumi inks & executive pens</p>
                <span className={styles.worldTileLink}>
                  Explore World <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            {/* World 4: PAPER */}
            <Link href="/shop/paper-canvas" className={styles.worldTile}>
              <img 
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop" 
                alt="PAPER world" 
                className={styles.worldTileImg}
              />
              <div className={styles.worldTileOverlay} />
              <div className={styles.worldTileContent}>
                <span className={styles.worldTileNum}>04</span>
                <h3 className={styles.worldTileTitle}>PAPER</h3>
                <p className={styles.worldTileDesc}>100% Cotton rag, canvas rolls & stretched boards</p>
                <span className={styles.worldTileLink}>
                  Explore World <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            {/* World 5: CRAFT */}
            <Link href="/shop/craft" className={styles.worldTile}>
              <img 
                src="https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop" 
                alt="CRAFT world" 
                className={styles.worldTileImg}
              />
              <div className={styles.worldTileOverlay} />
              <div className={styles.worldTileContent}>
                <span className={styles.worldTileNum}>05</span>
                <h3 className={styles.worldTileTitle}>CRAFT</h3>
                <p className={styles.worldTileDesc}>Crystal resin, decoupage sheets & gilding leaf</p>
                <span className={styles.worldTileLink}>
                  Explore World <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            {/* World 6: CREATE (Wide Banner Tile) */}
            <Link href="/shop/gift-sets" className={`${styles.worldTile} ${styles.worldTileWide}`}>
              <img 
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&auto=format&fit=crop" 
                alt="CREATE world" 
                className={styles.worldTileImg}
              />
              <div className={styles.worldTileOverlay} />
              <div className={styles.worldTileContent}>
                <span className={styles.worldTileNum}>06</span>
                <h3 className={styles.worldTileTitle}>CREATE</h3>
                <p className={styles.worldTileDesc}>Curated studio gift boxes & master painter sets</p>
                <span className={styles.worldTileLink}>
                  Explore World <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 03 EDITORIAL ARTWORK SECTION ── */}
      <section className={styles.editorialBreakSection}>
        <div className={styles.editorialBreakBg}>
          <img 
            src="https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1600&auto=format&fit=crop" 
            alt="Art studio workbench" 
            className={styles.editorialBreakImg}
          />
          <div className={styles.editorialBreakOverlay} />
        </div>
        <div className={`container ${styles.editorialBreakContainer}`}>
          <div className={styles.editorialBreakBox}>
            <span className="eyebrow eyebrow--accent">OUR PHILOSOPHY</span>
            <h2 className={styles.editorialBreakHeading}>
              MADE TO CREATE<span className={styles.heroDot}>.</span>
            </h2>
            <p className={styles.editorialBreakQuote}>
              "Tools become ideas. Ideas become something real."
            </p>
            <p className={styles.editorialBreakBody}>
              We source only authentic artist supplies engineered by masters—so your hand moves without resistance between imagination and paper.
            </p>
            <Link href="/shop" className="btn btn--light btn--lg">
              EXPLORE THE COLLECTION <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 04 FEATURED COLLECTION: THE ARTIST'S DESK ── */}
      <section className={`section ${styles.deskSection}`}>
        <div className="container">
          <div className={styles.sectionHeaderRow}>
            <div>
              <span className="eyebrow eyebrow--accent">02 / CURATED SELECTION</span>
              <h2 className={styles.sectionTitle}>THE ARTIST’S DESK</h2>
            </div>
            <Link href="/shop?collection=artists-desk" className={styles.viewAllLink}>
              View Full Desk <ArrowRight size={14} />
            </Link>
          </div>

          <div className={styles.deskGrid}>
            <div className={styles.deskBannerCard}>
              <span className={styles.deskTag}>Essential Workspace</span>
              <h3 className={styles.deskTitle}>Curated for daily creative rituals</h3>
              <p className={styles.deskDesc}>
                Hand-picked sketchbooks, precision pencils, and tactile accessories that keep your desk inspired.
              </p>
              <Link href="/shop/sketch-books" className="btn btn--primary btn--sm">
                Shop Desk Essentials
              </Link>
            </div>

            {artistDeskProducts.slice(0, 3).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 TRENDING PRODUCTS ── */}
      <section className={`section ${styles.trendingSection}`}>
        <div className="container">
          <div className={styles.sectionHeaderRow}>
            <div>
              <span className="eyebrow eyebrow--accent">03 / MOST REQUESTED</span>
              <h2 className={styles.sectionTitle}>TRENDING NOW</h2>
            </div>
            <Link href="/shop?sort=popularity" className={styles.viewAllLink}>
              Explore All Trending <ArrowRight size={14} />
            </Link>
          </div>

          <div className={styles.productGrid}>
            {trendingProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 TYPOGRAPHIC BREAK ── */}
      <section className={styles.typoBreakSection}>
        <div className="container">
          <div className={styles.typoBreakInner}>
            <span className={styles.typoBreakEyebrow}>FORPENCIL MANIFESTO</span>
            <h2 className={styles.typoBreakHeading}>
              EVERY IDEA <br />
              <span className="serif-italic">STARTS</span> <br />
              SOMEWHERE.
            </h2>
            <div className={styles.typoBreakLine} />
          </div>
        </div>
      </section>

      {/* ── 07 SHOP BY MEDIUM ── */}
      <section className={`section ${styles.mediumSection}`}>
        <div className="container">
          <div className={styles.sectionHeadingWrap}>
            <div>
              <span className="eyebrow eyebrow--accent">04 / DISCOVERY BY MEDIUM</span>
              <h2 className={styles.sectionTitle}>Explore by Medium</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Filter through materials crafted specifically for watercolorists, sketch artists, calligraphers, and crafters.
            </p>
          </div>

          {/* Medium Tabs */}
          <div className={styles.mediumTabs}>
            {Object.keys(mediumData).map((key) => (
              <button
                key={key}
                className={`${styles.mediumTabBtn} ${activeMedium === key ? styles.mediumTabBtnActive : ''}`}
                onClick={() => setActiveMedium(key)}
              >
                {mediumData[key].name}
              </button>
            ))}
          </div>

          {/* Medium Showcase Card */}
          <div className={styles.mediumShowcase}>
            <div className={styles.mediumVisual}>
              <img 
                src={mediumData[activeMedium].image} 
                alt={mediumData[activeMedium].name}
                className={styles.mediumImg}
              />
              <span className={styles.mediumCountBadge}>{mediumData[activeMedium].count}</span>
            </div>
            <div className={styles.mediumInfo}>
              <span className={styles.mediumTagline}>{mediumData[activeMedium].tagline}</span>
              <h3 className={styles.mediumName}>{mediumData[activeMedium].name}</h3>
              <p className={styles.mediumDesc}>{mediumData[activeMedium].desc}</p>

              <div className={styles.mediumFeaturesList}>
                <div className={styles.mediumFeature}>
                  <CheckCircle2 size={16} className={styles.mediumCheckIcon} />
                  <span>Lightfast pigments rated for gallery longevity</span>
                </div>
                <div className={styles.mediumFeature}>
                  <CheckCircle2 size={16} className={styles.mediumCheckIcon} />
                  <span>Engineered binder formula for smooth wash control</span>
                </div>
                <div className={styles.mediumFeature}>
                  <CheckCircle2 size={16} className={styles.mediumCheckIcon} />
                  <span>Tested with cotton surfaces and synthetic sables</span>
                </div>
              </div>

              <Link 
                href={`/shop/${mediumData[activeMedium].slug}`}
                className="btn btn--primary btn--lg"
              >
                SHOP {mediumData[activeMedium].name.toUpperCase()} SUPPLIES <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08 BESTSELLERS ── */}
      <section className={`section ${styles.bestsellerSection}`}>
        <div className="container">
          <div className={styles.sectionHeaderRow}>
            <div>
              <span className="eyebrow eyebrow--accent">05 / VERIFIED FAVORITES</span>
              <h2 className={styles.sectionTitle}>LOVED BY CREATORS</h2>
            </div>
            <Link href="/shop?filter=bestseller" className={styles.viewAllLink}>
              View All Bestsellers <ArrowRight size={14} />
            </Link>
          </div>

          <div className={styles.productGrid}>
            {bestsellers.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 09 FOR EVERY CREATOR ── */}
      <section className={`section ${styles.creatorSection}`}>
        <div className="container">
          <div className={styles.sectionHeadingWrap}>
            <div>
              <span className="eyebrow eyebrow--accent">06 / CURATED PATHWAYS</span>
              <h2 className={styles.sectionTitle}>FOR EVERY CREATOR</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Whether you are taking your first steps or building your master portfolio, we have matched the ideal tools for your stage.
            </p>
          </div>

          {/* Tier Buttons */}
          <div className={styles.creatorTabs}>
            {Object.keys(creatorTiers).map((tierKey) => (
              <button
                key={tierKey}
                className={`${styles.creatorTab} ${activeCreator === tierKey ? styles.creatorTabActive : ''}`}
                onClick={() => setActiveCreator(tierKey)}
              >
                {creatorTiers[tierKey].title}
              </button>
            ))}
          </div>

          {/* Tier Content Display */}
          <div className={styles.creatorContentCard}>
            <div className={styles.creatorInfoCol}>
              <span className={styles.creatorSubtitle}>{creatorTiers[activeCreator].subtitle}</span>
              <h3 className={styles.creatorTitle}>{creatorTiers[activeCreator].title}</h3>
              <p className={styles.creatorDesc}>{creatorTiers[activeCreator].desc}</p>

              <div className={styles.creatorPerks}>
                {creatorTiers[activeCreator].perks.map((perk, idx) => (
                  <div key={idx} className={styles.creatorPerkItem}>
                    <Sparkles size={14} className={styles.creatorPerkIcon} />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <Link href={creatorTiers[activeCreator].href} className="btn btn--primary btn--lg">
                FIND YOUR TOOLS <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.creatorImgCol}>
              <img 
                src={creatorTiers[activeCreator].img} 
                alt={creatorTiers[activeCreator].title}
                className={styles.creatorImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 10 BRAND SHOWCASE ── */}
      <section className={`section ${styles.brandSection}`}>
        <div className="container">
          <div className={styles.sectionHeadingWrap}>
            <div>
              <span className="eyebrow eyebrow--accent">07 / AUTHENTIC MANUFACTURE</span>
              <h2 className={styles.sectionTitle}>BRANDS WE BELIEVE IN</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              We stock 100% genuine products directly from legendary art supply houses worldwide.
            </p>
          </div>

          <div className={styles.brandGrid}>
            {brands.slice(0, 10).map((b) => (
              <Link key={b.id} href={`/shop?brand=${b.slug}`} className={styles.brandPill}>
                <span className={styles.brandPillName}>{b.name}</span>
                <ArrowRight size={14} className={styles.brandPillArrow} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11 SOCIAL PROOF ── */}
      <section className={`section ${styles.reviewsSection}`}>
        <div className="container">
          <div className={styles.sectionHeadingWrap}>
            <div>
              <span className="eyebrow eyebrow--accent">08 / COMMUNITY TESTIMONIALS</span>
              <h2 className={styles.sectionTitle}>TRUSTED BY CREATORS</h2>
            </div>
          </div>

          <div className={styles.reviewsGrid}>
            {[
              {
                name: 'Ananya Roy',
                role: 'Botanical Watercolorist',
                text: 'The paper quality and granulating pigments I received from ForPencil transformed my botanical paintings. Delivery was fast and packed with extreme care.',
                rating: 5,
                tag: 'Verified Artist',
              },
              {
                name: 'Vikramaditya S.',
                role: 'Architectural Illustrator',
                text: 'Fineliner pens with true Japanese nibs are hard to find. ForPencil consistently stocks genuine Sakura and Uni-ball pens that never bleed.',
                rating: 5,
                tag: 'Verified Studio',
              },
              {
                name: 'Priya Sharma',
                role: 'Calligraphy Educator',
                text: 'As an instructor, I recommend ForPencil to all my students. Their curated gift boxes and student kits take out all the guesswork.',
                rating: 5,
                tag: 'Verified Instructor',
              },
            ].map((review, idx) => (
              <div key={idx} className={styles.reviewCard}>
                <div className={styles.reviewStars}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--star-filled)" stroke="none" />
                  ))}
                </div>
                <p className={styles.reviewText}>"{review.text}"</p>
                <div className={styles.reviewMeta}>
                  <div>
                    <h4 className={styles.reviewName}>{review.name}</h4>
                    <span className={styles.reviewRole}>{review.role}</span>
                  </div>
                  <span className={styles.reviewTag}>{review.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12 FINAL EDITORIAL CTA ── */}
      <section className={styles.finalCtaSection}>
        <div className="container">
          <div className={styles.finalCtaInner}>
            <span className="eyebrow eyebrow--accent">START YOUR NEXT PIECE</span>
            <h2 className={styles.finalCtaTitle}>
              WHAT WILL <br />
              <span className="serif-italic">YOU CREATE?</span>
            </h2>
            <p className={styles.finalCtaDesc}>
              Join thousands of creators who trust ForPencil for their studio supplies.
            </p>
            <Link href="/shop" className="btn btn--primary btn--lg">
              START CREATING <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── VALUE GUARANTEES ── */}
      <section className={styles.guaranteeSection}>
        <div className="container">
          <div className={styles.guaranteeGrid}>
            <div className={styles.guaranteeItem}>
              <Truck size={24} className={styles.guaranteeIcon} />
              <div>
                <h4 className={styles.guaranteeTitle}>Complimentary Express Shipping</h4>
                <p className={styles.guaranteeDesc}>Free delivery across India on all orders over ₹999.</p>
              </div>
            </div>
            <div className={styles.guaranteeItem}>
              <ShieldCheck size={24} className={styles.guaranteeIcon} />
              <div>
                <h4 className={styles.guaranteeTitle}>100% Genuine Art Guarantee</h4>
                <p className={styles.guaranteeDesc}>Directly sourced from certified international manufacturers.</p>
              </div>
            </div>
            <div className={styles.guaranteeItem}>
              <RotateCcw size={24} className={styles.guaranteeIcon} />
              <div>
                <h4 className={styles.guaranteeTitle}>Hassle-Free 7-Day Returns</h4>
                <p className={styles.guaranteeDesc}>Easy replacements and returns for complete peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
