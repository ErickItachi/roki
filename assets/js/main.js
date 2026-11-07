/* Roki Contabilidade — interações da landing page (sem dependências) */
(() => {
  'use strict';

  /*
   * CONTATO: preencha com os dados oficiais assim que confirmados.
   * whatsapp: só números, com DDI e DDD (ex.: "5511999999999").
   * Se ambos ficarem vazios, o formulário orienta o visitante a usar o Instagram.
   */
  const CONTACT = {
    whatsapp: '5511963778365', // Roberto Kaoru
    email: 'contato@roki.com.br',
    instagram: 'https://www.instagram.com/rokicontabilidade/',
  };

  const root = document.documentElement;
  root.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Entrada do hero
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-loaded')));

  // Ano no rodapé
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header: estado ao rolar + esconder ao descer ---------- */
  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('.scroll-progress span');
  const manifesto = document.querySelector('[data-manifesto]');
  const steps = document.querySelector('[data-steps]');
  const stepsLine = steps && steps.querySelector('.steps__line span');
  let lastY = window.scrollY;
  let ticking = false;
  let menuOpen = false;

  // Manifesto: quebra o texto em palavras para "acender" conforme a rolagem
  let manifestoWords = [];
  if (manifesto) {
    const words = manifesto.textContent.trim().split(/\s+/);
    manifesto.innerHTML = words.map((w) => `<span class="mw">${w}</span>`).join(' ');
    manifestoWords = [...manifesto.querySelectorAll('.mw')];
  }

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const vh = window.innerHeight;

    header.classList.toggle('is-scrolled', y > 12);
    header.classList.toggle('is-hidden', !menuOpen && y > lastY && y > 400);
    lastY = y;

    if (progress) progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);

    if (manifestoWords.length && !reduceMotion) {
      const r = manifesto.getBoundingClientRect();
      const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35));
      const lit = Math.round(p * manifestoWords.length);
      manifestoWords.forEach((el, i) => el.classList.toggle('is-on', i < lit));
    }

    if (stepsLine) {
      const r = steps.getBoundingClientRect();
      stepsLine.style.setProperty('--sp', clamp((vh * 0.8 - r.top) / (r.height * 0.9)).toFixed(3));
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  function setMenu(open) {
    menuOpen = open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
    root.classList.toggle('menu-open', open);
    if (open) {
      menu.hidden = false;
      header.classList.remove('is-hidden');
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
      setTimeout(() => { const first = menu.querySelector('a'); if (first && menuOpen) first.focus({ preventScroll: true }); }, 400);
    } else {
      menu.classList.remove('is-open');
      setTimeout(() => { if (!menuOpen) menu.hidden = true; }, reduceMotion ? 0 : 700);
    }
  }
  toggle.addEventListener('click', () => setMenu(!menuOpen));
  // fecha e devolve o foco ao botão
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) { setMenu(false); toggle.focus(); } });
  window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => { if (e.matches && menuOpen) setMenu(false); });

  /* ---------- CTA fixo no celular: aparece depois do topo, some no contato ---------- */
  const mobileCta = document.querySelector('[data-mobile-cta]');
  const contact = document.querySelector('#contato');
  const hero = document.querySelector('.hero');
  if (mobileCta && 'IntersectionObserver' in window) {
    let pastHero = false, inContact = false;
    const sync = () => {
      const show = pastHero && !inContact && !menuOpen;
      mobileCta.classList.toggle('is-visible', show);
      mobileCta.setAttribute('aria-hidden', String(!show));
      mobileCta.tabIndex = show ? 0 : -1;
    };
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; sync(); }).observe(hero);
    new IntersectionObserver(([e]) => { inContact = e.isIntersecting; sync(); }, { rootMargin: '0px 0px -20% 0px' }).observe(contact);
    toggle.addEventListener('click', () => setTimeout(sync, 0));
  }

  /* ---------- Revelação ao rolar ---------- */
  const revealTargets = document.querySelectorAll('.reveal, .step, .hero__panel');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Contadores ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion || el.dataset.format === 'plain') { el.textContent = target; return; }
    const dur = 1400;
    const t0 = performance.now();
    const step = (t) => {
      const k = clamp((t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * eased);
      if (k < 1) requestAnimationFrame(step);
    };
    el.textContent = '0';
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  }

  /* ---------- Link ativo no menu ---------- */
  const navLinks = [...document.querySelectorAll('[data-nav] a')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => so.observe(s));
  }

  /* ---------- FAQ: um item aberto por vez ---------- */
  const items = document.querySelectorAll('[data-accordion] details');
  items.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
  }));

  /* ---------- Formulário ---------- */
  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach((input) => {
        const ok = input.value.trim().length > 1;
        input.closest('.field').classList.toggle('is-invalid', !ok);
        if (!ok) valid = false;
      });
      if (!valid) { status.textContent = 'Preencha seu nome e um contato para retornarmos.'; return; }

      const d = Object.fromEntries(new FormData(form));
      const text =
        `Olá, Roki! Meu nome é ${d.nome}${d.empresa ? ` (${d.empresa})` : ''}.\n` +
        `Assunto: ${d.assunto}\n` +
        (d.mensagem ? `${d.mensagem}\n` : '') +
        `Contato: ${d.contato}`;

      if (CONTACT.whatsapp) {
        window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
        status.textContent = 'Abrindo o WhatsApp com a sua mensagem…';
      } else if (CONTACT.email) {
        window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Contato pelo site — ' + d.assunto)}&body=${encodeURIComponent(text)}`;
        status.textContent = 'Abrindo o seu e-mail com a mensagem pronta…';
      } else {
        status.innerHTML = `Por enquanto, fale com a gente pelo <a href="${CONTACT.instagram}" target="_blank" rel="noopener" style="text-decoration:underline">Instagram @rokicontabilidade</a>.`;
      }
    });
    form.addEventListener('input', (e) => {
      const f = e.target.closest('.field');
      if (f) f.classList.remove('is-invalid');
    });
  }
})();
