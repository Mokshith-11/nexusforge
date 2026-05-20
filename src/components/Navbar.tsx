'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ---- Scroll detection ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll(); // check initial position
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- Lock body scroll when drawer is open ---- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* ---- Close drawer on route change ---- */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <nav className={styles.nav} aria-label="Main navigation">
        {/* ---- Logo ---- */}
        <Link href="/" className={styles.logo} aria-label="Nexus Forge – Home">
          <span className={styles.logoIcon} aria-hidden="true">
            N
          </span>
          <span className={styles.logoText}>NEXUS FORGE</span>
        </Link>

        {/* ---- Desktop Links ---- */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${isActive(href) ? styles.linkActive : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ---- Desktop CTA ---- */}
        <Link href="/contact" className={styles.cta}>
          Start Your Project
          <span className={styles.ctaArrow} aria-hidden="true">
            →
          </span>
        </Link>

        {/* ---- Hamburger ---- */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMobile}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
          type="button"
        >
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
      </nav>

      {/* ---- Mobile Overlay ---- */}
      <div
        className={`${styles.overlay} ${mobileOpen ? styles.overlayVisible : ''}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ---- Mobile Drawer ---- */}
      <aside
        id="mobile-drawer"
        className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ''}`}
        aria-label="Mobile navigation"
      >
        <ul className={styles.drawerLinks} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.drawerLink} ${isActive(href) ? styles.drawerLinkActive : ''}`}
                onClick={closeMobile}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.drawerDivider} />

        <Link href="/contact" className={styles.drawerCta} onClick={closeMobile}>
          Start Your Project →
        </Link>
      </aside>
    </header>
  );
}
