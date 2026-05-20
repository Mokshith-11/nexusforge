import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Case Studies",
  description:
    "See how Nexus Forge has helped businesses automate workflows, increase leads, and save time with custom AI solutions. Real results from real clients.",
  alternates: { canonical: "https://nexusforge.ai/case-studies" },
};

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      industry: "Medical Aesthetics",
      title: "WhatsApp Appointment Automation",
      description: "Automated the entire booking process for a leading aesthetics clinic via WhatsApp chatbot.",
      metricValue: "90%",
      metricLabel: "reduction in booking time",
    },
    {
      industry: "Real Estate",
      title: "AI Lead Qualification System",
      description: "Built an AI-powered system that qualifies inbound leads automatically and routes to the right agent.",
      metricValue: "3x",
      metricLabel: "more qualified leads",
    },
    {
      industry: "SaaS",
      title: "Automated Client Onboarding",
      description: "Replaced manual onboarding workflows with intelligent automation saving 40+ hours per month.",
      metricValue: "40+",
      metricLabel: "hours saved monthly",
    },
    {
      industry: "E-commerce",
      title: "Inventory & Order Automation",
      description: "Implemented an end-to-end order processing and inventory sync system using n8n.",
      metricValue: "99.9%",
      metricLabel: "order accuracy",
    },
    {
      industry: "Healthcare",
      title: "Patient Follow-up Automation",
      description: "Deployed a customized CRM integration that automatically sends post-visit care instructions and checks.",
      metricValue: "75%",
      metricLabel: "reduction in no-shows",
    },
    {
      industry: "Financial Services",
      title: "Document Processing AI",
      description: "Created an AI vision workflow that extracts structured data from KYC documents instantly.",
      metricValue: "80%",
      metricLabel: "faster processing",
    },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={`section ${styles.heroSection} bg-radial-glow`}>
          <div className="container">
            <header className="section-header">
              <div className="section-badge">Case Studies</div>
              <h1 className="section-title">
                <span className="gradient-text">Real Results.</span> Real Impact.
              </h1>
              <p className="section-subtitle">
                Discover how we've transformed operations for businesses across multiple industries.
              </p>
            </header>
          </div>
        </section>

        <section className={`section ${styles.gridSection}`}>
          <div className="container">
            <div className={styles.filterTabs}>
              <button className={`${styles.filterTab} ${styles.activeTab}`}>All</button>
              <button className={styles.filterTab}>Healthcare</button>
              <button className={styles.filterTab}>Real Estate</button>
              <button className={styles.filterTab}>SaaS</button>
              <button className={styles.filterTab}>E-commerce</button>
            </div>

            <div className={styles.caseGrid}>
              {caseStudies.map((study, i) => (
                <div key={i} className={`glass-card ${styles.caseCard}`}>
                  <div className={styles.industryBadge}>{study.industry}</div>
                  <h2 className={styles.caseTitle}>{study.title}</h2>
                  <p className={styles.caseDescription}>{study.description}</p>
                  <div className={styles.metricBox}>
                    <div className={styles.metricValue}>{study.metricValue}</div>
                    <div className={styles.metricLabel}>{study.metricLabel}</div>
                  </div>
                  <Link href="/contact" className={styles.readMore}>
                    Read Case Study →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
