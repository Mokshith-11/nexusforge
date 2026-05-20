'use client';

import { useCallback, useRef } from 'react';
import Link from 'next/link';
import styles from './ServicesGrid.module.css';

interface ServiceCard {
  icon: string;
  title: string;
  desc: string;
  link: string;
}

const services: ServiceCard[] = [
  {
    icon: '⚡',
    title: 'AI Workflow Automation',
    desc: 'Automate repetitive tasks end-to-end with intelligent n8n and Make workflows that run 24/7.',
    link: '/services',
  },
  {
    icon: '🤖',
    title: 'Custom AI Chatbots',
    desc: 'Deploy conversational AI that qualifies leads, answers questions, and books appointments automatically.',
    link: '/services',
  },
  {
    icon: '💬',
    title: 'WhatsApp Automation',
    desc: 'Automate appointment booking, follow-ups, and customer support through WhatsApp Business API.',
    link: '/services',
  },
  {
    icon: '🌐',
    title: 'Website Development',
    desc: 'High-performance, SEO-optimized websites that convert visitors into customers.',
    link: '/services',
  },
  {
    icon: '🔗',
    title: 'CRM & API Integration',
    desc: 'Connect your entire tech stack — HubSpot, Salesforce, Zapier, and custom APIs.',
    link: '/services',
  },
  {
    icon: '🧠',
    title: 'AI Strategy & Consulting',
    desc: 'Expert guidance to identify automation opportunities and plan your AI transformation.',
    link: '/services',
  },
];

function TiltCard({ service }: { service: ServiceCard }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
  }, []);

  return (
    <div className={styles.cardWrapper}>
      <div
        ref={cardRef}
        className={styles.card}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className={styles.icon} role="img" aria-hidden="true">
          {service.icon}
        </span>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardDesc}>{service.desc}</p>
        <Link href={service.link} className={styles.cardLink}>
          Learn more <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  const featured = services.slice(0, 2);
  const rest = services.slice(2);

  return (
    <section className={styles.section} aria-label="Our services">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className="section-badge">Our Services</span>
          <h2 className="section-title">
            Intelligent Solutions for{' '}
            <span className="gradient-text">Modern Business</span>
          </h2>
          <p className={styles.subtitle}>
            Full-service AI automation — from strategy and design to
            development, deployment, and ongoing optimization.
          </p>
        </div>

        {/* Bento Grid */}
        <div className={styles.grid}>
          {/* Top 2 featured cards */}
          {featured.map((service) => (
            <TiltCard key={service.title} service={service} />
          ))}

          {/* Bottom 4 cards in sub-grid */}
          <div className={styles.gridSmall}>
            {rest.map((service) => (
              <TiltCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
