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
    'Certified Supply Chain Professional (CSCP)',
    'Replenishment Analyst',
    'Data Analytics & Power BI Enthusiast',
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
  typeLoop();

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

  /* ---------- Animated counters (supports suffix like M, +) ---------- */
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

  /* ---------- Navbar shadow on scroll ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20 ? '0 6px 24px rgba(0,0,0,0.25)' : 'none';
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

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
