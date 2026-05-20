import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Blog",
  description:
    "Insights, tutorials, and strategies on AI automation, workflow optimization, and business growth from the Nexus Forge team.",
  alternates: { canonical: "https://nexusforge.ai/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={`section ${styles.heroSection} bg-radial-glow`}>
          <div className="container">
            <header className="section-header">
              <div className="section-badge">Blog</div>
              <h1 className="section-title">
                <span className="gradient-text">Insights</span> & Resources
              </h1>
              <p className="section-subtitle">
                Expert articles on AI automation, workflow optimization, and scaling your business
                with intelligent technology.
              </p>
            </header>

            <div className={`glass-card ${styles.comingSoonCard}`}>
              <h2>Our blog is launching soon!</h2>
              <p>
                Subscribe to get notified when we publish our first articles on AI automation
                strategies and tutorials.
              </p>
              
              <form className={styles.subscribeForm}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required 
                  className={styles.subscribeInput}
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
