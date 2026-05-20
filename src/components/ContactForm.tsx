"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className={`glass-card ${styles.successState}`}>
        <div className={styles.successIcon}>✓</div>
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
        <button className="btn btn-secondary" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={`glass-card ${styles.form}`} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" required placeholder="John Doe" className={styles.input} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" required placeholder="john@example.com" className={styles.input} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="company">Company</label>
        <input type="text" id="company" placeholder="Acme Corp" className={styles.input} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="service">Service Interest</label>
        <select id="service" required className={styles.input}>
          <option value="">Select a service...</option>
          <option value="AI Automation">AI Workflow Automation</option>
          <option value="Chatbot">Custom AI Chatbots</option>
          <option value="WhatsApp">WhatsApp Automation</option>
          <option value="Web Dev">Website Development</option>
          <option value="CRM">CRM & API Integration</option>
          <option value="Consulting">AI Strategy & Consulting</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          required
          rows={4}
          placeholder="Tell us about your project..."
          className={styles.input}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
