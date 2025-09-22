// script.js - GreenEarth

// Helper: safe query
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Mobile nav toggle
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    mainNav.classList.toggle("show");
  });
}

// Update footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Lightbox for gallery
const galleryGrid = document.getElementById("gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lbClose = document.getElementById("lightbox-close");

if (galleryGrid && lightbox) {
  galleryGrid.addEventListener("click", (e) => {
    const img = e.target.closest(".gallery-item");
    if (!img) return;
    openLightbox(img.src, img.alt || "");
  });

  // keyboard support
  galleryGrid.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const img = e.target.closest(".gallery-item");
      if (img) openLightbox(img.src, img.alt || "");
    }
  });

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

// Accordion
const accordions = $$("#accordion .accordion-item");
accordions.forEach((item) => {
  const btn = item.querySelector(".accordion-toggle");
  const content = item.querySelector(".accordion-content");
  btn.addEventListener("click", () => {
    const isOpen = content.classList.contains("show");
    // close all
    accordions.forEach((i) =>
      i.querySelector(".accordion-content").classList.remove("show")
    );
    // toggle current
    if (!isOpen) content.classList.add("show");
  });
});

// Contact form validation (client-side only)
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();
    const msgEl = $("#form-msg");

    if (!name || !email || !message) {
      msgEl.textContent = "Please fill all fields.";
      msgEl.style.color = "red";
      return;
    }
    // simple email check
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      msgEl.textContent = "Please enter a valid email address.";
      msgEl.style.color = "red";
      return;
    }
    // fake success (no backend)
    msgEl.textContent = "Thanks — your message was sent (simulated).";
    msgEl.style.color = "green";
    contactForm.reset();
  });
}