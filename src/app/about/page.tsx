import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Nexus Forge — an AI automation agency on a mission to make intelligent automation accessible to every business. Meet our team and story.",
  alternates: { canonical: "https://nexusforge.ai/about" },
};

export default function AboutPage() {
  const values = [
    {
      title: "Innovation First",
      description: "We constantly explore the bleeding edge of AI to bring you the best solutions.",
    },
    {
      title: "Client-Centric",
      description: "Your success is our success. We build systems tailored to your unique goals.",
    },
    {
      title: "Transparency",
      description: "Clear communication, honest timelines, and straightforward pricing.",
    },
    {
      title: "Continuous Improvement",
      description: "We don't just build and leave; we optimize and scale as you grow.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={`section ${styles.heroSection} bg-radial-glow`}>
          <div className="container">
            <header className="section-header">
              <div className="section-badge">Our Story</div>
              <h1 className="section-title">
                We're on a Mission to <span className="gradient-text">Automate the Future</span>
              </h1>
            </header>
          </div>
        </section>

        <section className={`section ${styles.missionSection}`}>
          <div className="container">
            <div className={styles.missionGrid}>
              <div className="glass-card" style={{ padding: "var(--space-2xl)" }}>
                <h2 style={{ marginBottom: "1rem", color: "var(--primary)" }}>Our Mission</h2>
                <p style={{ fontSize: "var(--text-lg)" }}>
                  To make intelligent automation accessible to every business, regardless of size or
                  industry. We believe technology should work for you, not the other way around.
                </p>
              </div>
              <div className="glass-card" style={{ padding: "var(--space-2xl)" }}>
                <h2 style={{ marginBottom: "1rem", color: "var(--accent)" }}>Our Vision</h2>
                <p style={{ fontSize: "var(--text-lg)" }}>
                  A world where businesses focus on what matters most — strategy, creativity, and
                  relationships — while AI handles the repetitive execution perfectly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.storySection}`}>
          <div className="container">
            <div className={styles.storyContent}>
              <h2 className="section-title">Founded by Builders</h2>
              <p className="section-subtitle">
                Founded by automation enthusiasts with 20+ years of combined experience in AI, web
                development, and business process optimization. We've seen firsthand how businesses
                waste thousands of hours on tasks that machines can do better, faster, and more
                accurately.
              </p>
              <p className="section-subtitle">
                Nexus Forge was born to bridge the gap between cutting-edge AI technology and real-world
                business operations. We forge systems that run quietly in the background, driving your
                growth forward 24/7.
              </p>
            </div>
          </div>
        </section>

        <section className={`section ${styles.valuesSection}`}>
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">Our Core Values</h2>
            </header>
            <div className={styles.valuesGrid}>
              {values.map((value, i) => (
                <div key={i} className={`glass-card ${styles.valueCard}`}>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${styles.ctaSection}`}>
          <div className="container text-center">
            <h2 className="section-title">Ready to Transform Your Business?</h2>
            <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
              Let's build something incredible together.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Book a Strategy Call →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
