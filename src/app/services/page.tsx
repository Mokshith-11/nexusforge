import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "AI Automation Services",
  description:
    "Explore our full range of AI automation services: workflow automation, custom chatbots, WhatsApp automation, web development, CRM integration, and AI consulting.",
  alternates: { canonical: "https://nexusforge.ai/services" },
};

export default function ServicesPage() {
  const services = [
    {
      id: "ai-automation",
      title: "AI Workflow Automation",
      icon: "⚡",
      description:
        "End-to-end process automation using intelligent n8n and Make workflows that run 24/7 without manual intervention.",
      features: [
        "End-to-end process automation",
        "n8n & Make expert workflows",
        "Custom trigger-action chains",
        "Error handling & monitoring",
        "Scalable architecture",
      ],
    },
    {
      id: "chatbots",
      title: "Custom AI Chatbots",
      icon: "🤖",
      description:
        "Deploy conversational AI that qualifies leads, answers questions, and books appointments automatically across multiple platforms.",
      features: [
        "GPT-powered conversations",
        "Lead qualification bots",
        "Customer support automation",
        "Multi-platform deployment",
        "Natural language understanding",
      ],
    },
    {
      id: "whatsapp",
      title: "WhatsApp Automation",
      icon: "💬",
      description:
        "Automate appointment booking, follow-ups, and customer support through the WhatsApp Business API.",
      features: [
        "Appointment booking bots",
        "Automated follow-ups & reminders",
        "Broadcasting & bulk messaging",
        "Payment integration",
        "Multi-language support",
      ],
    },
    {
      id: "web-dev",
      title: "Website Development",
      icon: "🌐",
      description:
        "High-performance, SEO-optimized websites that convert visitors into customers, built with modern frameworks.",
      features: [
        "Next.js & React development",
        "SEO-optimized architecture",
        "Responsive & mobile-first",
        "Performance optimization",
        "CMS integration",
      ],
    },
    {
      id: "crm-api",
      title: "CRM & API Integration",
      icon: "🔗",
      description:
        "Connect your entire tech stack — HubSpot, Salesforce, Zapier, and custom APIs — for seamless data flow.",
      features: [
        "HubSpot & Salesforce integration",
        "Custom API development",
        "Data synchronization",
        "Webhook automation",
        "Third-party connectors",
      ],
    },
    {
      id: "consulting",
      title: "AI Strategy & Consulting",
      icon: "🧠",
      description:
        "Expert guidance to identify automation opportunities and plan your AI transformation for maximum ROI.",
      features: [
        "Workflow audit & analysis",
        "AI readiness assessment",
        "Implementation roadmap",
        "ROI forecasting",
        "Team training & onboarding",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={`section ${styles.heroSection}`}>
          <div className="container">
            <header className="section-header">
              <div className="section-badge">Our Expertise</div>
              <h1 className="section-title">
                <span className="gradient-text">Intelligent Solutions</span> for Modern Business
              </h1>
              <p className="section-subtitle">
                From simple data entry to complex decision-making systems, we build automations that
                scale your operations and free your team to focus on growth.
              </p>
            </header>
          </div>
        </section>

        <section className={styles.servicesList}>
          <div className="container">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`${styles.serviceItem} ${
                  index % 2 !== 0 ? styles.serviceItemReverse : ""
                }`}
              >
                <div className={styles.serviceContent}>
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <ul className={styles.featureList}>
                    {service.features.map((feature, i) => (
                      <li key={i}>
                        <span className={styles.checkIcon}>✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn btn-primary">
                    Discuss this service →
                  </Link>
                </div>
                <div className={styles.serviceVisual}>
                  <div className="glass-card" style={{ width: "100%", height: "100%", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
                    {service.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`section ${styles.ctaSection}`}>
          <div className="container text-center">
            <h2 className="section-title">Ready to Get Started?</h2>
            <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
              Book a free strategy call to discuss your automation needs.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Book Free Consultation →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
