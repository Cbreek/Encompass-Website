/* ============================================================
   ENCOMPASS TECHNOLOGY PARTNERS — Main JS
   ============================================================ */

const CDN = 'https://workforce-reimagined.lovable.app/__l5e/assets-v1/';

const HERO_SLIDES = [
  CDN + 'a48aef79-42ab-4e3b-8bce-8222778dcedf/hero-boardroom-dvled.jpg',
  CDN + '181c1ec9-24e5-48d6-97e0-79cb36bdff65/hero-speaker-rig.jpg',
  CDN + 'fec5a66c-6e2e-468c-9b65-644f57a3017d/hero-led-install.jpg',
  CDN + '4d781ae9-6af2-463a-b594-1907165beda9/hero-datacenter-sharp.jpg',
];

// ── Hero Intro ──────────────────────────────────────────────
function runHeroIntro(onDone) {
  const intro  = document.getElementById('hero-intro');
  if (!intro) { onDone(); return; }

  const bg     = intro.querySelector('.intro-bg');
  const center = intro.querySelector('.intro-center');

  if (bg) {
    bg.src = HERO_SLIDES[0];
    bg.onload = () => {};
  }

  requestAnimationFrame(() => {
    setTimeout(() => {
      if (bg)     bg.classList.add('visible');
      if (center) center.classList.add('visible');
    }, 60);
    setTimeout(() => {
      if (center) { center.classList.remove('visible'); center.classList.add('leaving'); }
    }, 2400);
    setTimeout(() => {
      intro.classList.add('leaving');
    }, 2700);
    setTimeout(() => {
      intro.classList.add('gone');
      onDone();
    }, 3600);
  });
}

// ── Hero Rotator ────────────────────────────────────────────
function initHeroRotator() {
  const rotator = document.querySelector('.hero-rotator');
  if (!rotator) return;

  const slides = rotator.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  slides.forEach((slide, i) => {
    if (HERO_SLIDES[i]) slide.src = HERO_SLIDES[i];
  });

  slides[0].classList.add('active');
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 6500);
}

// ── Hero Text Rise ──────────────────────────────────────────
function riseHeroText() {
  ['hero-label', 'hero-headline', 'hero-cta'].forEach(cls => {
    const el = document.querySelector('.' + cls);
    if (el) { el.classList.remove('risen'); void el.offsetWidth; el.classList.add('risen'); }
  });
}

// ── Scroll Reveal ───────────────────────────────────────────
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('revealed'), delay);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ── Mobile Nav ──────────────────────────────────────────────
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ── Smooth Scroll ───────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const navH = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 80;
        const y = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}

// ── Floating Chat ───────────────────────────────────────────
function initChat() {
  const launcher = document.getElementById('chat-launcher');
  const panel    = document.getElementById('chat-panel');
  const form     = document.getElementById('chat-form');
  const input    = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  if (!launcher || !panel) return;

  const iconChat  = launcher.querySelector('.icon-chat');
  const iconClose = launcher.querySelector('.icon-close');

  launcher.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    if (iconChat)  iconChat.style.display  = isOpen ? 'none'  : 'block';
    if (iconClose) iconClose.style.display = isOpen ? 'block' : 'none';
  });

  if (form && input && messages) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      const uBubble = document.createElement('div');
      uBubble.className = 'chat-bubble user';
      uBubble.textContent = text;
      messages.appendChild(uBubble);
      input.value = '';
      messages.scrollTop = messages.scrollHeight;

      setTimeout(() => {
        const bBubble = document.createElement('div');
        bBubble.className = 'chat-bubble bot';
        bBubble.textContent = 'Thanks — a member of our team will follow up shortly. For RFPs, use the GC & Architects portal above.';
        messages.appendChild(bBubble);
        messages.scrollTop = messages.scrollHeight;
      }, 800);
    });
  }
}

// ── Boot ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeroRotator();
  initMobileNav();
  initSmoothScroll();
  initChat();

  runHeroIntro(() => {
    riseHeroText();
    initReveal();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') riseHeroText();
  });
});
