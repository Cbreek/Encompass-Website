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

  /* ── Chat Widget ── */
  const chatWidget  = document.getElementById('chatWidget');
  const chatTrigger = document.getElementById('chatTrigger');
  const chatPanel   = document.getElementById('chatPanel');
  const chatClose   = document.getElementById('chatClose');
  const chatBody    = document.getElementById('chatBody');
  const chatInput   = document.getElementById('chatInput');
  const chatSend    = document.getElementById('chatSend');

  if (chatWidget && chatTrigger) {
    const openChat = () => {
      chatWidget.classList.add('open');
      chatPanel.classList.add('open');
      chatPanel.setAttribute('aria-hidden', 'false');
      if (chatInput) chatInput.focus();
    };
    const closeChat = () => {
      chatWidget.classList.remove('open');
      chatPanel.classList.remove('open');
      chatPanel.setAttribute('aria-hidden', 'true');
    };
    chatTrigger.addEventListener('click', () =>
      chatWidget.classList.contains('open') ? closeChat() : openChat()
    );
    if (chatClose) chatClose.addEventListener('click', closeChat);

    const addBubble = (text, type) => {
      const wrap = document.createElement('div');
      wrap.className = 'chat-bubble chat-bubble-' + type;
      const p = document.createElement('p');
      p.innerHTML = text;
      wrap.appendChild(p);
      chatBody.appendChild(wrap);
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    const botReply = (input) => {
      const msg = input.toLowerCase();
      if (msg.includes('rfi') || msg.includes('rfp') || msg.includes('bid') || msg.includes('submit'))
        return 'Please use our <a href="contact.html#rfi" style="color:var(--accent);font-weight:600;">RFI / RFP intake form</a> and our team will respond within one business day.';
      if (msg.includes('deck') || msg.includes('capabilities') || msg.includes('brochure'))
        return 'We\'d be happy to send our capabilities deck. Email us at <strong>info@encompasstp.com</strong> or call <strong>(714) 920-5462</strong>.';
      if (msg.includes('business development') || msg.includes('speak') || msg.includes('call') || msg.includes('bd'))
        return 'To speak with our business development team, call <strong>(714) 920-5462</strong> or email <strong>info@encompasstp.com</strong>. We respond within one business day.';
      if (msg.includes('license') || msg.includes('licensed'))
        return 'Encompass Technology Partners holds active CA Low Voltage Systems License <strong>#1064391</strong>.';
      if (msg.includes('service') || msg.includes('what do you do'))
        return 'We provide AV integration, conferencing, control systems, structured cabling, WiFi/DAS, physical security, speech privacy, and network infrastructure for commercial clients.';
      if (msg.includes('price') || msg.includes('cost') || msg.includes('quote'))
        return 'Pricing depends on project scope. Submit an <a href="contact.html" style="color:var(--accent);font-weight:600;">RFP via our contact form</a> and we\'ll provide a detailed proposal.';
      return 'Thank you for your message. Please <a href="contact.html" style="color:var(--accent);font-weight:600;">contact us directly</a> or call <strong>(714) 920-5462</strong> and we\'ll respond within one business day.';
    };

    document.querySelectorAll('.chat-qr-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.reply;
        const labels = { rfi: 'Submit an RFI / RFP', deck: 'Request a Capabilities Deck', bd: 'Speak with Business Development' };
        document.getElementById('quickReplies') && (document.getElementById('quickReplies').style.display = 'none');
        addBubble(labels[type] || '', 'user');
        setTimeout(() => addBubble(botReply(labels[type] || ''), 'bot'), 500);
      });
    });

    const sendMessage = () => {
      const val = chatInput.value.trim();
      if (!val) return;
      addBubble(val, 'user');
      chatInput.value = '';
      document.getElementById('quickReplies') && (document.getElementById('quickReplies').style.display = 'none');
      setTimeout(() => addBubble(botReply(val), 'bot'), 500);
    };

    if (chatSend) chatSend.addEventListener('click', sendMessage);
    if (chatInput) chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
  }

})();
