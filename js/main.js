/* Encompass Technology Partners — Main JS */

(function () {
  'use strict';

  /* ── Sticky Nav ── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Nav ── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      navLinks.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Active Nav Link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll Fade-In ── */
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.08 }
  );
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* ── Contact Form ── */
  const form = document.getElementById('contactForm');
  const success = document.querySelector('.form-success');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(this));
      const subject = encodeURIComponent(`Website Inquiry — ${d.name}${d.service ? ' | ' + d.service : ''}`);
      const body = encodeURIComponent(
        `Name: ${d.name || ''}\nCompany: ${d.company || 'N/A'}\nEmail: ${d.email || ''}\nPhone: ${d.phone || 'N/A'}\nService Interest: ${d.service || 'General'}\n\nMessage:\n${d.message || ''}`
      );
      window.location.href = `mailto:info@encompasstp.com?subject=${subject}&body=${body}`;
      this.style.display = 'none';
      if (success) success.classList.add('show');
    });
  }

})();
