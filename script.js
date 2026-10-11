/**
 * Portofolio Digital - Muhammad Labiq Jazli
 * Vanilla JavaScript (Interaktivitas, Menu Mobile, Smooth Scrolling, & Active Nav)
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const closeDrawerBtn = document.getElementById("closeDrawerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link, .mobile-cta-btn");

  const openDrawer = () => {
    hamburgerBtn.classList.add("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    mobileDrawer.classList.add("is-open");
    mobileDrawer.setAttribute("aria-hidden", "false");
    drawerBackdrop.classList.add("is-open");
    document.body.classList.add("no-scroll");
  };

  const closeDrawer = () => {
    hamburgerBtn.classList.remove("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    mobileDrawer.classList.remove("is-open");
    mobileDrawer.setAttribute("aria-hidden", "true");
    drawerBackdrop.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.contains("is-open");
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener("click", closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", closeDrawer);
  }

  // Close drawer on clicking any navigation link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  // Close drawer on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });

  // --------------------------------------------------------------------------
  // 2. Active Link Highlighting on Scroll (IntersectionObserver)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");
  const desktopLinks = document.querySelectorAll(".desktop-nav .nav-link");
  const mobileLinks = document.querySelectorAll(".mobile-nav-links .mobile-nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        // Update Desktop Nav
        desktopLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });

        // Update Mobile Nav
        mobileLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // --------------------------------------------------------------------------
  // 3. Header Scrolled Styling
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById("header");
  const handleScroll = () => {
    if (window.scrollY > 30) {
      siteHeader.style.borderBottomColor = "#3A3A40";
      siteHeader.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4)";
    } else {
      siteHeader.style.borderBottomColor = "var(--border-color)";
      siteHeader.style.boxShadow = "none";
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Animated Background (Mengikuti Kursor)
  // --------------------------------------------------------------------------
  const bgFx = document.getElementById("bgFx");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (bgFx) {
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.35 };
    const current = { ...target };
    let rafId = null;

    const render = () => {
      // Gerak halus (lerp) agar efek terasa mengalir di belakang kursor
      const ease = reduceMotion ? 1 : 0.08;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;

      bgFx.style.setProperty("--mx", `${current.x}px`);
      bgFx.style.setProperty("--my", `${current.y}px`);
      bgFx.style.setProperty("--px", ((current.x / window.innerWidth) - 0.5).toFixed(3));
      bgFx.style.setProperty("--py", ((current.y / window.innerHeight) - 0.5).toFixed(3));

      const settled = Math.abs(target.x - current.x) < 0.5 && Math.abs(target.y - current.y) < 0.5;
      rafId = settled ? null : requestAnimationFrame(render);
    };

    const moveTo = (x, y) => {
      target.x = x;
      target.y = y;
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", (e) => moveTo(e.clientX, e.clientY), { passive: true });
    window.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      if (touch) moveTo(touch.clientX, touch.clientY);
    }, { passive: true });

    render();
  }
});
