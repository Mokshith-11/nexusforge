'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Testimonials.module.css';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Nexus Forge completely transformed our booking process. Our WhatsApp automation handles 80% of appointments without any manual intervention. Game changer!',
    name: 'Dr. Sarah Mitchell',
    title: 'Founder',
    company: 'Nuri Aesthetics Clinic',
    rating: 5,
  },
  {
    quote:
      'The AI lead qualification system they built pays for itself every month. We went from drowning in unqualified leads to focusing only on serious buyers.',
    name: 'James Rodriguez',
    title: 'Sales Director',
    company: 'Horizon Properties',
    rating: 5,
  },
  {
    quote:
      'Their n8n automation expertise is unmatched. They connected our entire tech stack and saved us 40+ hours a month on repetitive tasks.',
    name: 'Priya Sharma',
    title: 'COO',
    company: 'ScaleUp SaaS',
    rating: 5,
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Auto-rotation with cleanup
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className={styles.section}
      aria-label="Client Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">
            Trusted by{' '}
            <span className="gradient-text">Businesses Worldwide</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Testimonials">
          <div className={styles.slideContainer}>
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className={`${styles.card} ${
                  index === activeIndex ? styles.cardActive : ''
                }`}
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                aria-hidden={index !== activeIndex}
              >
                {/* Quote Icon */}
                <div className={styles.quoteIcon} aria-hidden="true">
                  &#8220;
                </div>

                {/* Quote Text */}
                <blockquote className={styles.quoteText}>
                  {testimonial.quote}
                </blockquote>

                {/* Star Rating */}
                <div className={styles.stars} aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i} className={styles.star} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>

                {/* Author */}
                <div className={styles.author}>
                  <div className={styles.authorAvatar} aria-hidden="true">
                    {getInitials(testimonial.name)}
                  </div>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>
                      {testimonial.name}
                    </span>
                    <span className={styles.authorRole}>
                      {testimonial.title},{' '}
                      <span className={styles.authorCompany}>
                        {testimonial.company}
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className={styles.dots} role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === activeIndex ? styles.dotActive : ''
                }`}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
