import Link from 'next/link';
import styles from './CaseStudies.module.css';

interface CaseStudyMetrics {
  before: string;
  after: string;
  metric: string;
}

interface CaseStudy {
  industry: string;
  title: string;
  desc: string;
  metrics: CaseStudyMetrics;
}

const caseStudies: CaseStudy[] = [
  {
    industry: 'Medical Aesthetics',
    title: 'WhatsApp Appointment Automation',
    desc: 'Automated the entire booking process for a leading aesthetics clinic via WhatsApp chatbot.',
    metrics: {
      before: '15 min avg booking time',
      after: '90% reduction',
      metric: 'Booking Time',
    },
  },
  {
    industry: 'Real Estate',
    title: 'AI Lead Qualification System',
    desc: 'Built an AI-powered system that qualifies inbound leads automatically and routes to the right agent.',
    metrics: {
      before: '20 qualified leads/month',
      after: '3x increase',
      metric: 'Qualified Leads',
    },
  },
  {
    industry: 'SaaS',
    title: 'Automated Client Onboarding',
    desc: 'Replaced manual onboarding workflows with intelligent automation saving 40+ hours per month.',
    metrics: {
      before: '6 hours per client',
      after: '40+ hours saved/month',
      metric: 'Admin Time',
    },
  },
];

export default function CaseStudies() {
  return (
    <section className={styles.section} aria-label="Case studies">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className="section-badge">Case Studies</span>
          <h2 className="section-title">
            Real Results.{' '}
            <span className="gradient-text">Real Impact.</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          {caseStudies.map((study) => (
            <article key={study.title} className={styles.card}>
              {/* Industry Badge */}
              <span className={styles.badge}>{study.industry}</span>

              {/* Content */}
              <h3 className={styles.cardTitle}>{study.title}</h3>
              <p className={styles.cardDesc}>{study.desc}</p>

              {/* Metrics */}
              <div className={styles.metrics}>
                <div className={styles.metricBefore}>
                  <div className={styles.metricLabel}>Before</div>
                  <div className={styles.metricValue}>
                    {study.metrics.before}
                  </div>
                </div>
                <div className={styles.metricAfter}>
                  <div className={styles.metricLabel}>After</div>
                  <div className={styles.metricValue}>
                    {study.metrics.after}
                  </div>
                </div>
                <div className={styles.metricName}>
                  {study.metrics.metric}
                </div>
              </div>

              {/* Link */}
              <Link href="/case-studies" className={styles.cardLink}>
                Read Case Study <span>→</span>
              </Link>
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className={styles.footer}>
          <Link href="/case-studies" className={styles.footerLink}>
            View All Case Studies <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
