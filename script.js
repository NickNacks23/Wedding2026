document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const faqItems = document.querySelectorAll(".faq-item");
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector(".site-header");


    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
          const isOpen = mainNav.classList.toggle("is-open");
      
          menuToggle.classList.toggle("is-open", isOpen);
          menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
          menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });
      }




  
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
    const desktopOffsets = {
      home: -50,
      venue: 550,
      story: 30,
      proposal: 90,
      timeline: 30,
      details: 70,
      faq: 15,
      registry: 70,
      contact: 70
    };
    
    const mobileOffsets = {
      home: -50,
      venue: 35,
      story: 30,
      proposal: 170,
      timeline: 30,
      details: 70,
      faq: 15,
      registry: 70,
      contact: 70
    };
    
    function getSectionOffsets() {
      if (window.innerWidth <= 640) {
        return mobileOffsets;
      }
    
      return desktopOffsets;
    }
  
    function getAnchorTarget(section) {
      if (!section) return null;
  
      if (section.id === "home") {
        return section;
      }
      if (section.id === "venue" && window.innerWidth <= 1200) {
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
      const activeOffsets = getSectionOffsets();
      let sectionOffset = activeOffsets[section.id] || 0;
      if (section.id === "venue" && window.innerWidth <= 1200) {
        sectionOffset = 0;
      }
  
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
      // If someone opens a direct section link like #faq or #registry,
      // keep your section-centering behavior exactly as-is.
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
    
        if (target) {
          requestAnimationFrame(() => scrollToSection(target, false));
        }
    
        return;
      }
    
      // This only adjusts the first homepage view on desktop/computer screens.
      // It will not affect phones.
      if (window.innerWidth > 980) {
        const desktopHomeStart = 55;
    
        requestAnimationFrame(() => {
          window.scrollTo({
            top: desktopHomeStart,
            behavior: "auto"
          });
        });
      }
    });
  });
