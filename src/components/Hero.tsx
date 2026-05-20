'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from './Hero.module.css';

/* SSR-safe: ForgeScene relies on browser-only APIs (WebGL, window) */
const ForgeScene = dynamic(() => import('./ForgeScene'), {
  ssr: false,
});

const TECH_BADGES = ['n8n', 'OpenAI', 'Make', 'WhatsApp', 'React', 'Python'] as const;

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* 3D Background */}
      <div className={styles.sceneWrapper}>
        <ForgeScene />
      </div>

      {/* Foreground Content */}
      <div className={styles.content}>
        <h1 className={styles.headline}>
          We Build AI Systems That Work While You Sleep
        </h1>

        <p className={styles.subtitle}>
          From intelligent chatbots to end-to-end workflow automation — Nexus
          Forge transforms your business with custom AI solutions that save
          time, cut costs, and scale effortlessly.
        </p>

        {/* CTA Buttons */}
        <div className={styles.ctaRow}>
          <Link href="/contact" className={styles.ctaPrimary}>
            Start Your Project →
          </Link>
          <Link href="/case-studies" className={styles.ctaSecondary}>
            See Our Work
          </Link>
        </div>

        {/* Tech Badges */}
        <div className={styles.badges} aria-label="Technologies we use">
          {TECH_BADGES.map((name) => (
            <span key={name} className={styles.badge}>
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade for seamless transition to next section */}
      <div className={styles.bottomFade} />
    </section>
  );
}
