'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './SocialProof.module.css';

interface StatData {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: StatData[] = [
  { value: 50, suffix: '+', label: 'Automations Deployed' },
  { value: 200, suffix: '+', label: 'Hours Saved Monthly' },
  { value: 15, suffix: '+', label: 'Industries Served' },
  { value: 99.9, suffix: '%', label: 'System Uptime', decimals: 1 },
];

function useCountUp(
  target: number,
  isVisible: boolean,
  duration: number = 2000,
  decimals: number = 0
): string {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    let rafId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, target, duration]);

  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();
}

function StatItem({
  data,
  isVisible,
}: {
  data: StatData;
  isVisible: boolean;
}) {
  const displayValue = useCountUp(
    data.value,
    isVisible,
    2000,
    data.decimals ?? 0
  );

  return (
    <div className={styles.statItem}>
      <div className={styles.number} aria-label={`${data.value}${data.suffix}`}>
        {displayValue}
        {data.suffix}
      </div>
      <div className={styles.label}>{data.label}</div>
    </div>
  );
}

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Key statistics"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat) => (
            <StatItem key={stat.label} data={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
