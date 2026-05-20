import Link from 'next/link';
import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.section} aria-label="Call to Action">
      {/* Decorative Gradient Orbs */}
      <div className={`${styles.orb} ${styles.orbOne}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orbTwo}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orbThree}`} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Headline */}
          <h2 className={styles.headline}>
            Ready to{' '}
            <span className="gradient-text">Automate Your Business?</span>
          </h2>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            Book a free 30-minute strategy call and discover how AI can
            transform your operations — saving you time, money, and stress.
          </p>

          {/* Actions */}
          <div className={styles.actions}>
            <Link href="/contact" className={styles.ctaButton}>
              Book Free Consultation →
            </Link>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryLink}
            >
              <span className={styles.whatsappIcon} aria-hidden="true">
                💬
              </span>
              Or message us on WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
