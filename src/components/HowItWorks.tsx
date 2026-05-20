'use client';

import { useEffect, useRef } from 'react';
import styles from './HowItWorks.module.css';

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 'Step 01',
    title: 'Discovery',
    description:
      'We audit your current workflows, identify bottlenecks, and map out automation opportunities tailored to your business.',
  },
  {
    number: 'Step 02',
    title: 'Design',
    description:
      'We architect the perfect AI-powered solution with detailed specs, integrations, and a clear implementation roadmap.',
  },
  {
    number: 'Step 03',
    title: 'Build',
    description:
      'Our team builds, integrates, and rigorously tests your custom automation ensuring reliability and performance.',
  },
  {
    number: 'Step 04',
    title: 'Scale',
    description:
      'We deploy, monitor, optimize, and scale your automations as your business grows — with ongoing support.',
  },
];

export default function HowItWorks() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add(styles.stepVisible);
            observer.disconnect();
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section className={styles.section} aria-label="How it works">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className="section-badge">How It Works</span>
          <h2 className="section-title">
            From Idea to Automation in{' '}
            <span className="gradient-text">4 Steps</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={step.number}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={`${styles.step} ${
                  isLeft ? styles.stepLeft : styles.stepRight
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Number circle on the line */}
                <div className={styles.stepCircle} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Step card */}
                <div className={styles.stepCard}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
