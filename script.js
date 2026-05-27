document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector(".site-header");
  
    // Keeps only one FAQ dropdown open at a time
    faqItems.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
  
        faqItems.forEach((other) => {
          if (other !== item) {
            other.open = false;
          }
        });
      });
    });
  
    // Adjust these numbers if each menu link lands too high or too low.
    // Bigger number = section lands lower.
    // Smaller number = section lands higher.
    const sectionOffsets = {
      home: -50,
      venue: 540,
      story: 30,
      timeline: 30,
      details: 70,
      faq: 15,
      registry: 70,
      contact: 70
    };
  
    function getAnchorTarget(section) {
      if (!section) return null;
  
      if (section.id === "home") {
        return section;
      }
  
      return (
        section.querySelector(
          ".section-heading, .story-copy, .venue-overlay, .timeline, .detail-cards, .faq-layout, .registry-buttons, .contact-grid"
        ) || section
      );
    }
  
    function scrollToSection(section, smooth = true) {
      const anchorTarget = getAnchorTarget(section);
      if (!anchorTarget) return;
  
      const headerHeight = header ? header.offsetHeight : 0;
      const sectionOffset = sectionOffsets[section.id] || 0;
  
      const targetTop = anchorTarget.getBoundingClientRect().top + window.scrollY;
      const desiredTop = Math.max(0, targetTop - headerHeight - sectionOffset);
  
      window.scrollTo({
        top: desiredTop,
        behavior: smooth ? "smooth" : "auto"
      });
    }
  
    internalLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const hash = link.getAttribute("href");
  
        if (!hash || hash === "#") return;
  
        const target = document.querySelector(hash);
        if (!target) return;
  
        event.preventDefault();
        history.replaceState(null, "", hash);
        scrollToSection(target, true);
      });
    });
  
    window.addEventListener("load", () => {
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
  
        if (target) {
          requestAnimationFrame(() => scrollToSection(target, false));
        }
      }
    });
  });