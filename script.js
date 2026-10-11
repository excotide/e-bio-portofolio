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
});
