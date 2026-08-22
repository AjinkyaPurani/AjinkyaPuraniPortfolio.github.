/* ============================================================
   AJINKYA PURANI — PREMIUM PORTFOLIO INTERACTIONS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const root = document.documentElement;

  /* ==========================================================
     THEME
     ========================================================== */

  const themeBtn = document.getElementById("themeToggle");

  const savedTheme = localStorage.getItem("aj-theme") || "dark";

  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {

      const current =
        root.getAttribute("data-theme") === "light"
          ? "light"
          : "dark";

      const next = current === "light" ? "dark" : "light";

      applyTheme(next);

      localStorage.setItem("aj-theme", next);
    });
  }

  function applyTheme(theme) {

    if (theme === "light") {

      root.setAttribute("data-theme", "light");

      if (themeBtn) {
        themeBtn.innerHTML =
          '<i class="fa-solid fa-sun"></i>';
      }

    } else {

      root.removeAttribute("data-theme");

      if (themeBtn) {
        themeBtn.innerHTML =
          '<i class="fa-solid fa-moon"></i>';
      }
    }
  }


  /* ==========================================================
     MOBILE NAVIGATION
     ========================================================== */

  const menuBtn = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      const isOpen =
        navLinks.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

        menuBtn.innerHTML =
          '<i class="fa-solid fa-bars"></i>';
      });
    });

    document.addEventListener("click", event => {

      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {

        navLinks.classList.remove("open");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

        menuBtn.innerHTML =
          '<i class="fa-solid fa-bars"></i>';
      }
    });
  }


  /* ==========================================================
     TYPEWRITER
     ========================================================== */

  const roles = [
    "CSCP® | Replenishment Support Analyst II",
    "Supply Chain Analytics Specialist",
    "Inventory Optimization | Process Improvement",
    "Supply Chain Engineer | Lean Six Sigma Green Belt"
  ];

  const tw = document.getElementById("typewriter");

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {

    if (!tw) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

      charIndex++;

      tw.textContent =
        currentRole.slice(0, charIndex);

      if (charIndex >= currentRole.length) {

        deleting = true;

        setTimeout(typeLoop, 1900);

        return;
      }

    } else {

      charIndex--;

      tw.textContent =
        currentRole.slice(0, charIndex);

      if (charIndex <= 0) {

        deleting = false;

        roleIndex =
          (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(
      typeLoop,
      deleting ? 28 : 58
    );
  }

  if (
    tw &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    typeLoop();
  } else if (tw) {
    tw.textContent = roles[0];
  }


  /* ==========================================================
     SCROLL REVEAL
     ========================================================== */

  const revealEls =
    document.querySelectorAll(".reveal");

  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("in");

              revealObserver.unobserve(
                entry.target
              );
            }
          });

        },
        {
          threshold:0.10,
          rootMargin:"0px 0px -40px 0px"
        }
      );

    revealEls.forEach((element, index) => {

      /*
       * Small stagger for elements appearing
       * in the same section.
       */

      element.style.transitionDelay =
        `${Math.min(index % 5, 4) * 70}ms`;

      revealObserver.observe(element);
    });

  } else {

    revealEls.forEach(element => {
      element.classList.add("in");
    });
  }


  /* ==========================================================
     ANIMATED STAT COUNTERS
     ========================================================== */

  const counters =
    document.querySelectorAll(".stat-num");

  if (
    "IntersectionObserver" in window &&
    counters.length
  ) {

    const counterObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            animateCounter(entry.target);

            counterObserver.unobserve(
              entry.target
            );
          });

        },
        {
          threshold:.65
        }
      );

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }


  function animateCounter(element) {

    const target =
      parseInt(
        element.dataset.count || "0",
        10
      );

    const suffix =
      element.dataset.suffix || "";

    const duration = 1400;

    const startTime = performance.now();

    function update(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);

      /*
       * Smooth ease-out curve.
       */

      const eased =
        1 - Math.pow(1 - progress, 3);

      const value =
        Math.floor(target * eased);

      element.textContent =
        target >= 1000
          ? value.toLocaleString()
          : value;

      if (progress < 1) {

        requestAnimationFrame(update);

      } else {

        element.textContent =
          target >= 1000
            ? target.toLocaleString() + suffix
            : target + suffix;
      }
    }

    requestAnimationFrame(update);
  }


  /* ==========================================================
     PREMIUM 3D TILT
     Desktop / pointer devices only
     ========================================================== */

  const canHover =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (canHover && !reducedMotion) {

    const tiltCards =
      document.querySelectorAll(".tilt-card");

    const MAX_TILT = 5;

    tiltCards.forEach(card => {

      let frame = null;

      card.addEventListener("mousemove", event => {

        if (frame) {
          cancelAnimationFrame(frame);
        }

        frame = requestAnimationFrame(() => {

          const rect =
            card.getBoundingClientRect();

          const px =
            (event.clientX - rect.left) /
            rect.width;

          const py =
            (event.clientY - rect.top) /
            rect.height;

          const rotateY =
            (px - 0.5) *
            MAX_TILT *
            2;

          const rotateX =
            (0.5 - py) *
            MAX_TILT *
            2;

          card.style.transform =
            `perspective(1200px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale3d(1.015,1.015,1.015)`;

          card.style.setProperty(
            "--gx",
            `${px * 100}%`
          );

          card.style.setProperty(
            "--gy",
            `${py * 100}%`
          );

          card.classList.add(
            "is-tilting"
          );
        });
      });

      card.addEventListener("mouseleave", () => {

        if (frame) {
          cancelAnimationFrame(frame);
        }

        card.style.transform =
          "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";

        card.classList.remove(
          "is-tilting"
        );
      });
    });
  }


  /* ==========================================================
     HERO PARALLAX
     ========================================================== */

  const heroBg =
    document.querySelector(".hero-bg");

  if (
    heroBg &&
    !reducedMotion &&
    window.matchMedia(
      "(min-width: 768px)"
    ).matches
  ) {

    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(() => {

          const scrollY =
            window.scrollY;

          if (
            scrollY <
            window.innerHeight
          ) {

            heroBg.style.transform =
              `scale(1.05)
               translateY(${scrollY * .10}px)`;
          }

          ticking = false;
        });

      },
      {
        passive:true
      }
    );
  }


  /* ==========================================================
     NAVBAR SCROLL STATE
     ========================================================== */

  const navbar =
    document.getElementById("navbar");

  function updateNavbar() {

    if (!navbar) return;

    navbar.classList.toggle(
      "scrolled",
      window.scrollY > 25
    );
  }

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    {
      passive:true
    }
  );


  /* ==========================================================
     ACTIVE NAVIGATION
     ========================================================== */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const navAnchors =
    document.querySelectorAll(
      ".nav-links a"
    );

  if (
    sections.length &&
    navAnchors.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            const id =
              entry.target.id;

            navAnchors.forEach(anchor => {

              const isActive =
                anchor.getAttribute("href") ===
                `#${id}`;

              anchor.classList.toggle(
                "active",
                isActive
              );
            });

          });

        },
        {
          rootMargin:"-30% 0px -60% 0px"
        }
      );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }


  /* ==========================================================
     SMOOTH ANCHOR FALLBACK
     ========================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener("click", event => {

        const targetId =
          anchor.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior:
            reducedMotion
              ? "auto"
              : "smooth"
        });
      });
    });


  /* ==========================================================
     CONTACT FORM
     ========================================================== */

  const form =
    document.querySelector(".contact-form");

  if (form) {

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const button =
          form.querySelector(
            'button[type="submit"]'
          );

        if (!button) return;

        const originalHTML =
          button.innerHTML;

        button.disabled = true;

        button.innerHTML =
          '<i class="fa-solid fa-check"></i> Message Ready';

        setTimeout(() => {

          button.innerHTML =
            originalHTML;

          button.disabled = false;

        }, 2500);
      }
    );
  }


  /* ==========================================================
     FOOTER YEAR
     ========================================================== */

  const year =
    document.getElementById("year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* ==========================================================
     KEYBOARD ACCESSIBILITY
     ========================================================== */

  if (menuBtn && navLinks) {

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape" &&
          navLinks.classList.contains("open")
        ) {

          navLinks.classList.remove(
            "open"
          );

          menuBtn.setAttribute(
            "aria-expanded",
            "false"
          );

          menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

          menuBtn.focus();
        }
      }
    );
  }


  /* ==========================================================
     IMAGE FALLBACK
     ========================================================== */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.style.background =
            "linear-gradient(135deg,#101827,#172238)";

          image.style.objectFit =
            "contain";

          image.style.padding =
            "30px";
        }
      );
    });

});
