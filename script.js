// ============================================================
// Ajinkya Purani — Portfolio interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Theme toggle (persisted) ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('aj-theme') || 'dark';
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('aj-theme', next);
  });

  function applyTheme(theme){
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      root.removeAttribute('data-theme');
      themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  /* ---------- Mobile nav ---------- */
  const menuBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );

  /* ---------- Typewriter effect ---------- */
  const roles = [
    'CSCP® | Replenishment Support Analyst II',
    'Sourcing & Inventory Planning Specialist',
    'Process Improvement | Lean Six Sigma Green Belt',
    'Supply Chain Engineer & Volunteer'
  ];
  const tw = document.getElementById('typewriter');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop(){
    const current = roles[roleIndex];
    if (!deleting){
      tw.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length){ deleting = true; setTimeout(typeLoop, 1600); return; }
    } else {
      tw.textContent = current.slice(0, --charIndex);
      if (charIndex === 0){ deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    }
    setTimeout(typeLoop, deleting ? 40 : 65);
  }
  if (tw) typeLoop();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Animated counters (supports suffix like M+, +) ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCounter(entry.target);
        counterIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterIO.observe(c));

  function animateCounter(el){
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target){ current = target; clearInterval(timer); }
      el.textContent = (target >= 1000 ? current.toLocaleString() : current) + (current === target ? suffix : '');
    }, 30);
  }

  /* ---------- 3D Tilt Cards (mouse-follow, no external libs) ---------- */
  const tiltCards = document.querySelectorAll('.tilt-card');
  const MAX_TILT = 8; // degrees

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;

      const rotateY = (px - 0.5) * MAX_TILT * 2;
      const rotateX = (0.5 - py) * MAX_TILT * 2;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
      card.style.setProperty('--gx', `${px * 100}%`);
      card.style.setProperty('--gy', `${py * 100}%`);
      card.classList.add('is-tilting');
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      card.classList.remove('is-tilting');
    });
  });

  /* ---------- Hero background subtle parallax ---------- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg){
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      if (offset < window.innerHeight){
        heroBg.style.transform = `scale(1.05) translateY(${offset * 0.15}px)`;
      }
    }, { passive: true });
  }

  /* ---------- Navbar shadow on scroll ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20 ? '0 6px 24px rgba(0,0,0,0.25)' : 'none';
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Contact form (demo submit) ---------- */
  const form = document.querySelector('.contact-form');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Noted!';
      btn.style.opacity = '0.85';
      setTimeout(() => { btn.innerHTML = original; btn.style.opacity = '1'; form.reset(); }, 2200);
    });
  }

});
