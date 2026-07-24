document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('done'), 600);
    });
    setTimeout(() => loader.classList.add('done'), 2200);
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
  });

  /* ---------- NAVBAR SCROLLED STATE ---------- */
  const navbar = document.getElementById('navbar');
  const toTop = document.getElementById('toTop');
  if (navbar && toTop) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 60;
      navbar.classList.toggle('scrolled', scrolled);
      toTop.classList.toggle('show', window.scrollY > 500);
    });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- MOBILE MENU ---------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-scale');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // Safety net: some browsers delay/skip IntersectionObserver callbacks
  // (e.g. backgrounded tabs). Never leave content permanently invisible.
  setTimeout(() => {
    revealEls.forEach(el => el.classList.add('in-view'));
  }, 2000);

  /* ---------- ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('sr-RS');
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString('sr-RS') + '+';
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---------- TESTIMONIAL DOTS ---------- */
  const track = document.getElementById('testiTrack');
  const dotsWrap = document.getElementById('testiDots');
  if (track && dotsWrap) {
    const cards = track.querySelectorAll('.testi-card');

    cards.forEach((_, i) => {
      const d = document.createElement('span');
      if (i === 0) d.classList.add('active');
      d.addEventListener('click', () => {
        cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      });
      dotsWrap.appendChild(d);
    });

    track.addEventListener('scroll', () => {
      const index = Math.round(track.scrollLeft / cards[0].offsetWidth);
      [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === index));
    }, { passive: true });
  }

  /* ---------- LIGHTBOX ---------- */
  const galleryImgs = document.querySelectorAll('.gallery-item img');
  if (galleryImgs.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Zatvori">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Prethodna">&#8249;</button>
      <img src="" alt="">
      <button class="lightbox-nav lightbox-next" aria-label="Sledeća">&#8250;</button>
    `;
    document.body.appendChild(lightbox);
    const lbImg = lightbox.querySelector('img');
    const items = [...galleryImgs];
    let current = 0;

    const showLightbox = (i) => {
      current = (i + items.length) % items.length;
      lbImg.src = items[current].src;
      lbImg.alt = items[current].alt;
      lightbox.classList.add('open');
    };
    const closeLightbox = () => lightbox.classList.remove('open');

    items.forEach((img, i) => img.addEventListener('click', () => showLightbox(i)));
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showLightbox(current - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => showLightbox(current + 1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightbox(current - 1);
      if (e.key === 'ArrowRight') showLightbox(current + 1);
    });
  }

  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
