const WHATSAPP_NUMBER = "524423058052";

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Mobile nav ---------- */

const navToggle = document.getElementById("menu-toggle");
const siteHeader = document.getElementById("site-header");
const primaryNav = document.getElementById("primary-nav");

function setNav(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  siteHeader.classList.toggle("nav-open", open);
}

function closeNav(restoreFocus) {
  if (!siteHeader.classList.contains("nav-open")) return;
  setNav(false);
  if (restoreFocus) navToggle.focus();
}

navToggle.addEventListener("click", () => {
  const isOpen = siteHeader.classList.contains("nav-open");
  setNav(!isOpen);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeNav(true);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav(true);
});

document.addEventListener("click", (event) => {
  if (
    siteHeader.classList.contains("nav-open") &&
    !event.target.closest(".site-header")
  ) {
    closeNav(false);
  }
});

/* ---------- Store filters ---------- */

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const emptyState = document.getElementById("empty-state");

function applyFilter(filter) {
  let visibleCount = 0;

  productCards.forEach((card) => {
    const category = card.dataset.category;
    const show = filter === "todo" || category === filter;
    card.hidden = !show;
    if (show) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
    applyFilter(button.dataset.filter);
  });
});

/* ---------- Product WhatsApp buttons ---------- */

document.querySelectorAll(".product-wa").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.productName || button.closest(".product-card")?.dataset.name;
    const message = `Hola Kroket K, me interesa el producto: ${name}`;
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  });
});

/* ---------- Scroll reveal ---------- */

const revealEls = document.querySelectorAll("[data-reveal]");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
}
