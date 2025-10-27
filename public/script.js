// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80, // offset for fixed nav
      behavior: "smooth",
    });
  }
}

// Handle nav and hero button clicks
document.querySelectorAll("[data-section]").forEach((link) => {
  link.addEventListener("click", () => {
    const sectionId = link.getAttribute("data-section");
    scrollToSection(sectionId);

    // Close mobile menu if open
    mobileMenu.classList.remove("open");
    mobileMenuBtn.classList.remove("active");

    // Update active desktop nav link
    document
      .querySelectorAll(".nav-link.active")
      .forEach((el) => el.classList.remove("active"));
    const desktopLink = document.querySelector(
      `.nav-link[data-section="${sectionId}"]`
    );
    if (desktopLink) desktopLink.classList.add("active");
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  mobileMenuBtn.classList.toggle("active", isOpen);
});

// Highlight active section while scrolling
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  document
    .querySelectorAll(".nav-link")
    .forEach((link) => link.classList.remove("active"));
  const activeLink = document.querySelector(
    `.nav-link[data-section="${currentSection}"]`
  );
  if (activeLink) activeLink.classList.add("active");
});

// Handle join form submission
const joinForm = document.getElementById("joinForm");
if (joinForm) {
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks for joining! We'll reach out soon 🌵");
    joinForm.reset();
  });
}

// Animate elements on scroll (fade-up effect)
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".card, .program-card, .event-card, .hero-card"
  );

  animatedElements.forEach((el) => observer.observe(el));

  // Parallax effect for hero visuals
  const heroCards = document.querySelectorAll(".hero-card");
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    heroCards.forEach((card, index) => {
      const speed = 0.05 * (index + 1);
      card.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
});
