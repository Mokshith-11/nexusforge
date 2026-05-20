import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusforge.ai"),
  title: {
    default: "Nexus Forge — AI Automation Agency | Custom AI Solutions & Workflow Automation",
    template: "%s | Nexus Forge — AI Automation Agency",
  },
  description:
    "Nexus Forge builds custom AI automations, chatbots, and workflow systems that save time and scale your business. From n8n workflows to WhatsApp automation — we forge intelligent solutions. Book a free strategy call today.",
  keywords: [
    "AI automation agency",
    "AI workflow automation",
    "custom AI chatbot development",
    "WhatsApp automation for business",
    "n8n automation expert",
    "business process automation",
    "AI solutions for small business",
    "CRM integration",
    "AI consulting",
    "website development",
  ],
  authors: [{ name: "Nexus Forge", url: "https://nexusforge.ai" }],
  creator: "Nexus Forge",
  publisher: "Nexus Forge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexusforge.ai",
    siteName: "Nexus Forge",
    title: "Nexus Forge — AI Automation Agency | Custom AI Solutions & Workflow Automation",
    description:
      "We build custom AI automations, chatbots, and workflow systems that save time and scale your business. Book a free strategy call today.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexus Forge — Forging Intelligence. Automating Tomorrow.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Forge — AI Automation Agency",
    description:
      "Custom AI automations, chatbots & workflow systems that scale your business. Book a free strategy call.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nexusforge.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nexus Forge",
    url: "https://nexusforge.ai",
    logo: "https://nexusforge.ai/logo.png",
    description:
      "Nexus Forge is a full-service AI automation agency that builds custom chatbots, workflow automations, and intelligent business systems.",
    sameAs: [
      "https://x.com/vigneshmokshith",
      "https://www.linkedin.com/in/vignesh-mokshith-f/",
      "https://github.com/Mokshith-11",
      "https://instagram.com/vinnyvvinny8",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "vinnyvvinny8@gmail.com",
      availableLanguage: ["English"],
    },
    service: [
      {
        "@type": "Service",
        name: "AI Workflow Automation",
        description:
          "End-to-end workflow automation using n8n, Make, and custom AI integrations.",
      },
      {
        "@type": "Service",
        name: "Custom AI Chatbot Development",
        description:
          "Intelligent chatbots for lead qualification, customer support, and appointment booking.",
      },
      {
        "@type": "Service",
        name: "WhatsApp Business Automation",
        description:
          "Automated booking, follow-ups, and customer support via WhatsApp Business API.",
      },
      {
        "@type": "Service",
        name: "Website Development",
        description:
          "High-performance, SEO-optimized websites built with modern frameworks.",
      },
      {
        "@type": "Service",
        name: "CRM & API Integration",
        description:
          "Seamless integration with HubSpot, Salesforce, and custom APIs.",
      },
      {
        "@type": "Service",
        name: "AI Strategy & Consulting",
        description:
          "Expert guidance for AI transformation and automation roadmaps.",
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nexus Forge",
    url: "https://nexusforge.ai",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://nexusforge.ai/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0C1120" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
