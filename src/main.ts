import './style.css';

// ===================================================
// NexusForge — Main Application Logic
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initStatCounters();
  initPortfolioFilters();
  initTestimonialCarousel();
  initBackToTop();
  initContactForm();
  initNewsletterForm();
  initActiveNavTracking();
  initFAQ();
  initLegalModals();
});

// -------- Particle Background --------
function initParticles(): void {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 40;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${6 + Math.random() * 6}s`;
    particle.style.width = `${2 + Math.random() * 4}px`;
    particle.style.height = particle.style.width;

    // Randomize color between accent shades
    const colors = ['#6366f1', '#818cf8', '#ec4899', '#22d3ee', '#8b5cf6'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
  }
}

// -------- Sticky Navbar --------
function initNavbar(): void {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// -------- Mobile Menu --------
function initMobileMenu(): void {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// -------- Scroll Reveal Animations --------
function initScrollReveal(): void {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation delay for successive elements
        const el = entry.target as HTMLElement;
        const delay = index * 80;
        setTimeout(() => {
          el.classList.add('active');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// -------- Stat Counter Animation --------
function initStatCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('.hero__stat-number, .dash-card__number[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const target = parseFloat(el.getAttribute('data-count') || '0');
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element: HTMLElement, target: number): void {
  const duration = 2000;
  const start = performance.now();

  function update(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = eased * target;
    const isDecimal = target % 1 !== 0;
    element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = isDecimal ? target.toFixed(1) : target.toString();
    }
  }

  requestAnimationFrame(update);
}

// -------- Portfolio Filters --------
function initPortfolioFilters(): void {
  const filters = document.querySelectorAll<HTMLButtonElement>('.portfolio__filter');
  const items = document.querySelectorAll<HTMLElement>('.portfolio__item');

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Update active filter
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      const category = filter.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeInScale 0.4s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}

// -------- Testimonial Carousel --------
function initTestimonialCarousel(): void {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (!track || !dotsContainer || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let current = 0;
  let autoPlayInterval: ReturnType<typeof setInterval>;

  // Create dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function goTo(index: number): void {
    current = ((index % total) + total) % total;
    track!.style.transform = `translateX(-${current * 100}%)`;

    // Update dots
    dotsContainer!.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => {
    goTo(current - 1);
    resetAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    goTo(current + 1);
    resetAutoPlay();
  });

  function startAutoPlay(): void {
    autoPlayInterval = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAutoPlay(): void {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  startAutoPlay();
}

// -------- Back to Top --------
function initBackToTop(): void {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// -------- Active Nav Tracking --------
function initActiveNavTracking(): void {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// -------- Contact Form --------
function initContactForm(): void {
  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (form.querySelector('#name') as HTMLInputElement).value.trim();
    const email = (form.querySelector('#email') as HTMLInputElement).value.trim();
    const message = (form.querySelector('#message') as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all required fields.';
      status.className = 'form__status error';
      return;
    }

    if (!isValidEmail(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.className = 'form__status error';
      return;
    }

    // Actual form submission using Formspree
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

    // IMPORTANT: Replace the URL below with your actual Formspree endpoint URL
    // e.g. 'https://formspree.io/f/your_form_id'
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnjolblk';

    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    })
    .then(response => {
      if (response.ok) {
        status.textContent = '✓ Message sent successfully! We\'ll get back to you within 24 hours.';
        status.className = 'form__status success';
        form.reset();
      } else {
        status.textContent = 'Oops! There was a problem submitting your form.';
        status.className = 'form__status error';
      }
    })
    .catch(() => {
      status.textContent = 'Oops! There was a problem connecting to the server.';
      status.className = 'form__status error';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
    });
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// -------- Newsletter Form --------
function initNewsletterForm(): void {
  const form = document.getElementById('newsletterForm') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input') as HTMLInputElement;
    if (input && input.value.trim()) {
      alert('Thank you for subscribing! 🎉');
      input.value = '';
    }
  });
}

// -------- FAQ Accordion --------
function initFAQ(): void {
  const faqItems = document.querySelectorAll('.faq__item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    if (!question) return;
    
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

// -------- Legal Modals --------
function initLegalModals(): void {
  const privacyLink = document.getElementById('privacyLink');
  const termsLink = document.getElementById('termsLink');
  const overlay = document.getElementById('legalModalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  if (!privacyLink || !termsLink || !overlay || !closeBtn || !title || !body) return;

  const content: Record<string, { title: string, html: string }> = {
    privacy: {
      title: 'Privacy Policy',
      html: `
        <p>Last updated: April 2026</p>
        <p>At NexusForge, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information.</p>
        <h4>1. Information We Collect</h4>
        <p>We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us.</p>
        <h4>2. How We Use Your Information</h4>
        <p>We use the information we collect to provide, maintain, and improve our services, respond to your comments and questions, and provide customer service.</p>
        <h4>3. Information Sharing</h4>
        <p>We do not share your personal information with third parties except as described in this privacy policy or with your consent.</p>
        <h4>4. Contact Us</h4>
        <p>If you have any questions about this Privacy Policy, please contact us at vinnyvvinny8@gmail.com.</p>
      `
    },
    terms: {
      title: 'Terms of Service',
      html: `
        <p>Last updated: April 2026</p>
        <p>Please read these Terms of Service carefully before using our website and services operated by NexusForge.</p>
        <h4>1. Acceptance of Terms</h4>
        <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>
        <h4>2. Intellectual Property</h4>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of NexusForge and its licensors.</p>
        <h4>3. Limitation of Liability</h4>
        <p>In no event shall NexusForge, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>
        <h4>4. Changes</h4>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice before new terms take effect.</p>
      `
    }
  };

  function openModal(type: 'privacy' | 'terms', e: Event): void {
    e.preventDefault();
    title!.textContent = content[type].title;
    body!.innerHTML = content[type].html;
    overlay!.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(): void {
    overlay!.classList.remove('active');
    document.body.style.overflow = '';
  }

  privacyLink.addEventListener('click', (e) => openModal('privacy', e));
  termsLink.addEventListener('click', (e) => openModal('terms', e));
  
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}
