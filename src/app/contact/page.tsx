import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Nexus Forge. Book a free 30-minute AI automation strategy call or send us a message. We respond within 24 hours.",
  alternates: { canonical: "https://nexusforge.ai/contact" },
};

export default function ContactPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nexus Forge",
    image: "https://nexusforge.ai/og-image.png",
    "@id": "https://nexusforge.ai",
    url: "https://nexusforge.ai",
    telephone: "+91900085135",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Virtual",
      addressLocality: "Global",
      addressRegion: "Worldwide",
      postalCode: "00000",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <section className={`section ${styles.contactSection}`}>
          <div className="container">
            <header className="section-header" style={{ textAlign: "left", margin: "0 0 var(--space-4xl) 0" }}>
              <div className="section-badge">Get In Touch</div>
              <h1 className="section-title">
                Let's Build Something <span className="gradient-text">Intelligent</span>
              </h1>
              <p className="section-subtitle">
                Book a free 30-minute strategy call or send us a message. We respond within 24 hours.
              </p>
            </header>

            <div className={styles.contactLayout}>
              <div className={styles.formCol}>
                <ContactForm />
              </div>

              <div className={styles.infoCol}>
                <div className={`glass-card ${styles.infoCard}`}>
                  <h3>Contact Information</h3>
                  
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>✉️</div>
                    <div>
                      <div className={styles.infoLabel}>Email</div>
                      <a href="mailto:vinnyvvinny8@gmail.com" className={styles.infoValue}>
                        vinnyvvinny8@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>⏱️</div>
                    <div>
                      <div className={styles.infoLabel}>Response Time</div>
                      <div className={styles.infoValue}>Within 24 hours</div>
                    </div>
                  </div>

                  <div className={styles.whatsappBox}>
                    <h4>Prefer to chat?</h4>
                    <p>Message us directly on WhatsApp for a faster response.</p>
                    <a href="https://wa.me/900085135" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      Chat on WhatsApp
                    </a>
                  </div>

                  <div className={styles.socialBox}>
                    <h4>Follow Us</h4>
                    <div className={styles.socialLinks}>
                      <a href="https://x.com/vigneshmokshith" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                      <a href="https://www.linkedin.com/in/vignesh-mokshith-f/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      <a href="https://github.com/Mokshith-11" target="_blank" rel="noopener noreferrer">GitHub</a>
                      <a href="https://instagram.com/vinnyvvinny8" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
