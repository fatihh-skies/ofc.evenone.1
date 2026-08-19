document.addEventListener("DOMContentLoaded", () => {
  // 1. HAMBURGER MENU TOGGLE
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navLinks = document.querySelector(".nav-links");

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburgerBtn.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburgerBtn.classList.remove("active");
      });
    });
  }

  // 2. HIGHLIGHT MENU NAVBAR AKTIF SAAT SCROLL
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active-link");
      if (item.getAttribute("href") === `#${currentSection}`) {
        item.classList.add("active-link");
      }
    });
  });

  // 3. OBSERVER ANIMASI SCROLL (MELEPAS KUNCIAN TRANSFORM SETELAH MUNCUL)
  const observerOptions = {
    root: null,
    threshold: 0.1,
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("show-reveal");

        // Trik Maut: Hapus kelas reveal setelah animasi scroll selesai
        // Supaya tidak bentrok sama transisi :hover CSS!
        const handleTransitionEnd = () => {
          el.classList.remove("reveal-element", "show-reveal");
          el.removeEventListener("transitionend", handleTransitionEnd);
        };

        el.addEventListener("transitionend", handleTransitionEnd);
        observer.unobserve(el); // Berhenti mengawasi elemen yang sudah muncul
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(
    ".section-title, .wali-card, .org-card, .jadwal-card, .galeri-item, .footer-col"
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal-element");
    scrollObserver.observe(el);
  });
});