import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '60vh', padding: 'var(--space-16) 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--space-6)', textAlign: 'center' }}>
          About ForPencil
        </h1>
        <div style={{ fontSize: 'var(--text-lg)', color: 'var(--fg-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
          <p style={{ marginBottom: 'var(--space-4)' }}>
            Welcome to ForPencil, your premium destination for high-quality art supplies and creative tools. 
            We believe that every artist, whether a beginner or a professional, deserves access to the best materials to bring their visions to life.
          </p>
          <p style={{ marginBottom: 'var(--space-4)' }}>
            Founded with a passion for creativity, our mission is to curate an exceptional collection of paints, brushes, papers, and accessories from the world&apos;s most trusted brands. We don&apos;t just sell supplies; we aim to inspire and nurture the creative community.
          </p>
          <p style={{ marginBottom: 'var(--space-8)' }}>
            Thank you for choosing ForPencil as your creative partner. Let&apos;s create something beautiful together.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link href="/shop" className="btn btn--primary btn--lg">Explore Our Collection</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
