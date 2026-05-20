'use client';

import { useState, useCallback } from 'react';
import styles from './FAQ.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What is AI workflow automation?',
    answer:
      'AI workflow automation uses artificial intelligence to streamline and automate repetitive business processes. Using tools like n8n, Make, and custom AI models, we create systems that handle tasks like data entry, lead qualification, customer follow-ups, and appointment booking — running 24/7 without manual intervention.',
  },
  {
    question: 'How much does it cost to build a custom AI chatbot?',
    answer:
      'Our chatbot solutions start from $2,000 for basic implementations and scale based on complexity, integrations, and AI capabilities. Every project gets a detailed quote after our free discovery call where we understand your specific requirements.',
  },
  {
    question: 'Can you integrate AI with my existing CRM?',
    answer:
      'Absolutely! We specialize in connecting AI systems with popular CRMs like HubSpot, Salesforce, and custom solutions via APIs. Our integrations ensure seamless data flow between your AI automations and existing business tools.',
  },
  {
    question: 'How long does it take to build a WhatsApp automation?',
    answer:
      'Most WhatsApp automation projects take 2-4 weeks from discovery to deployment. Simple booking bots can be ready in 1-2 weeks, while complex multi-flow systems with AI-powered responses may take 4-6 weeks.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      "We serve businesses across all industries including healthcare, real estate, e-commerce, SaaS, financial services, education, and more. Our automation solutions are tailored to each industry's specific workflows and compliance requirements.",
  },
  {
    question: 'Do you offer ongoing support and maintenance?',
    answer:
      'Yes! We offer flexible maintenance plans that include monitoring, optimization, bug fixes, and feature updates. Our team ensures your automations continue running smoothly and evolve with your business needs.',
  },
  {
    question: "What's the typical ROI of AI automation?",
    answer:
      'Most clients see ROI within the first 2-3 months. Common results include 60-90% reduction in manual task time, 3x improvement in lead response times, and significant cost savings from reduced labor requirements.',
  },
  {
    question: 'How do I get started with Nexus Forge?',
    answer:
      "Simply book a free 30-minute strategy call through our contact page. We'll discuss your current workflows, identify automation opportunities, and provide a custom proposal — no commitment required.",
  },
];

// Build JSON-LD FAQPage schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem(index);
      }
    },
    [toggleItem]
  );

  return (
    <section className={styles.section} aria-label="Frequently Asked Questions">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className="section-badge">FAQ</span>
          <h2 className="section-title">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className={styles.list} role="list">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-answer-${index}`;
            const buttonId = `faq-question-${index}`;

            return (
              <div key={index} className={styles.item} role="listitem">
                <button
                  id={buttonId}
                  className={styles.question}
                  onClick={() => toggleItem(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span
                    className={`${styles.questionText} ${
                      isOpen ? styles.questionTextActive : ''
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`${styles.icon} ${
                      isOpen ? styles.iconActive : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`${styles.answer} ${
                    isOpen ? styles.answerOpen : ''
                  }`}
                >
                  <p className={styles.answerContent}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
