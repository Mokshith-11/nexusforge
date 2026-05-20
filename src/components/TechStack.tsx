import styles from './TechStack.module.css';

interface TechBadge {
  name: string;
  color: string;
}

const techStack: TechBadge[] = [
  { name: 'n8n', color: '#EA4B71' },
  { name: 'Make', color: '#6D00CC' },
  { name: 'Zapier', color: '#FF4A00' },
  { name: 'OpenAI', color: '#10A37F' },
  { name: 'Anthropic', color: '#D4A574' },
  { name: 'Meta API', color: '#0081FB' },
  { name: 'Next.js', color: '#FFFFFF' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Node.js', color: '#5FA04E' },
  { name: 'Python', color: '#3776AB' },
  { name: 'HubSpot', color: '#FF7A59' },
  { name: 'Salesforce', color: '#00A1E0' },
];

export default function TechStack() {
  return (
    <section className={styles.section} aria-label="Technology Stack">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className="section-badge">Our Tech Stack</span>
          <h2 className="section-title">
            Built With{' '}
            <span className="gradient-text">Industry-Leading Tools</span>
          </h2>
        </div>

        {/* Glass Container with Grid */}
        <div className={styles.glassWrapper}>
          <div className={styles.grid}>
            {techStack.map((tech) => (
              <div key={tech.name} className={styles.badge}>
                <span
                  className={styles.indicator}
                  style={{ backgroundColor: tech.color }}
                  aria-hidden="true"
                />
                <span className={styles.badgeName}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
