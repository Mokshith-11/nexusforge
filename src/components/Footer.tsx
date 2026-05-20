import Link from 'next/link';
import styles from './Footer.module.css';
import BackToTopButton from './BackToTopButton';

/* ────────────────────────────────────────────── */
/*  Data                                          */
/* ────────────────────────────────────────────── */

const SERVICE_LINKS = [
  { label: 'AI Automation', href: '/services#ai-automation' },
  { label: 'Chatbots', href: '/services#chatbots' },
  { label: 'WhatsApp Automation', href: '/services#whatsapp-automation' },
  { label: 'Web Development', href: '/services#web-development' },
  { label: 'CRM Integration', href: '/services#crm-integration' },
  { label: 'AI Consulting', href: '/services#ai-consulting' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const SOCIAL_LINKS = [
  {
    label: 'Twitter / X',
    href: 'https://x.com/vigneshmokshith',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vignesh-mokshith-f/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Mokshith-11',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/vinnyvvinny8',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

/* ────────────────────────────────────────────── */
/*  Component                                     */
/* ────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* ---- 4-Column Grid ---- */}
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="Nexus Forge – Home">
              <span className={styles.logoIcon} aria-hidden="true">
                N
              </span>
              <span className={styles.logoText}>NEXUS FORGE</span>
            </Link>

            <p className={styles.brandDescription}>
              We build intelligent automation systems that transform how businesses operate.
              From AI-powered chatbots to end-to-end workflow automation — we forge the future.
            </p>

            <div className={styles.socialRow}>
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Services</h3>
            <ul className={styles.columnLinks} role="list">
              {SERVICE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={styles.columnLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.columnLinks} role="list">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={styles.columnLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Connect</h3>

            <div className={styles.columnLinks}>
              <a href="mailto:vinnyvvinny8@gmail.com" className={styles.emailLink}>
                <span className={styles.emailIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                vinnyvvinny8@gmail.com
              </a>

              <div className={styles.badge}>
                <span className={styles.badgeDot} aria-hidden="true" />
                Available for projects
              </div>
            </div>
          </div>
        </div>

        {/* ---- Bottom Bar ---- */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 Nexus Forge. All Rights Reserved.
          </p>

          <div className={styles.bottomRight}>
            <Link href="/privacy" className={styles.bottomLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.bottomLink}>
              Terms of Service
            </Link>
            <BackToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
