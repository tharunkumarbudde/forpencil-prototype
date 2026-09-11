import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div style={{ minHeight: '60vh', padding: 'var(--space-16) 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--space-4)', textAlign: 'center' }}>
          Contact Us
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--fg-secondary)', marginBottom: 'var(--space-10)' }}>
          Have a question or need assistance? We&apos;re here to help.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
          <div style={{ textAlign: 'center', padding: 'var(--space-6)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <Mail size={24} style={{ margin: '0 auto var(--space-4)', color: 'var(--fg-primary)' }} />
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Email Us</h3>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 'var(--text-sm)' }}>support@forpencil.com</p>
          </div>
          <div style={{ textAlign: 'center', padding: 'var(--space-6)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <Phone size={24} style={{ margin: '0 auto var(--space-4)', color: 'var(--fg-primary)' }} />
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Call Us</h3>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 'var(--text-sm)' }}>+91 98765 43210</p>
          </div>
          <div style={{ textAlign: 'center', padding: 'var(--space-6)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <MapPin size={24} style={{ margin: '0 auto var(--space-4)', color: 'var(--fg-primary)' }} />
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Visit Us</h3>
            <p style={{ color: 'var(--fg-secondary)', fontSize: 'var(--text-sm)' }}>123 Art Street, Creative City</p>
          </div>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>Send a Message</h2>
          <input type="text" placeholder="Your Name" className="input" required />
          <input type="email" placeholder="Your Email" className="input" required />
          <textarea placeholder="Your Message" className="input" rows={5} required style={{ resize: 'vertical' }}></textarea>
          <button type="submit" className="btn btn--primary btn--lg">Send Message</button>
        </form>
      </div>
    </div>
  );
}
