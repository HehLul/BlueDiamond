// DOM Elements
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const dialog = document.getElementById("bookingDialog");
const dialogContent = document.querySelector(".dialog-content");

// Navbar Scroll Handler
function handleNavbarScroll() {
  const scrollThreshold = window.innerHeight * 0.1;
  navbar.classList.toggle("scrolled", window.scrollY > scrollThreshold);
}

// Active Section Handler
function updateActiveSection() {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    const sectionId = `#${section.getAttribute("id")}`;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === sectionId
        );
      });
    }
  });
}

// Smooth Scroll Handler
function handleSmoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href");
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    const navbarHeight = navbar.offsetHeight;
    const targetPosition = targetElement.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Close mobile menu if open
    if (navMenu.classList.contains("active")) {
      toggleMobileMenu();
    }
  }
}

// Mobile Menu Handlers
function toggleMobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active")
    ? "hidden"
    : "";
}

// Dialog Handlers
function handleDialog(action) {
  dialog.classList.toggle("active", action === "open");
  document.body.style.overflow = action === "open" ? "hidden" : "";
}

function handleDialogClick(e) {
  if (e.target === dialog) {
    handleDialog("close");
  }
}

// Event Listeners
// Scroll Events
document.addEventListener("scroll", () => {
  handleNavbarScroll();
  updateActiveSection();
});

// Navigation Events
navLinks.forEach((link) => {
  link.addEventListener("click", handleSmoothScroll);
});

// Mobile Menu Events
if (hamburger) {
  hamburger.addEventListener("click", toggleMobileMenu);
}

// Dialog Events
window.openDialog = () => handleDialog("open");
window.closeDialog = () => handleDialog("close");

if (dialog) {
  dialog.addEventListener("click", handleDialogClick);
  dialogContent.addEventListener("click", (e) => e.stopPropagation());
}

// Keyboard Events
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (dialog.classList.contains("active")) {
      handleDialog("close");
    }
    if (navMenu.classList.contains("active")) {
      toggleMobileMenu();
    }
  }
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const isClickInsideMenu = navMenu.contains(e.target);
  const isClickOnHamburger = hamburger.contains(e.target);

  if (
    !isClickInsideMenu &&
    !isClickOnHamburger &&
    navMenu.classList.contains("active")
  ) {
    toggleMobileMenu();
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  handleNavbarScroll();
  updateActiveSection();
});

document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".before-after-wrapper");

  sliders.forEach((slider) => {
    const handle = slider.querySelector(".slider-handle");
    const afterImage = slider.querySelector(".after-image");
    let isResizing = false;

    // Mouse events
    handle.addEventListener("mousedown", startResizing);
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);

    // Touch events for mobile
    handle.addEventListener("touchstart", startResizing);
    document.addEventListener("touchmove", resize);
    document.addEventListener("touchend", stopResizing);

    function startResizing(e) {
      isResizing = true;
      e.preventDefault();
    }

    function stopResizing() {
      isResizing = false;
    }

    function resize(e) {
      if (!isResizing) return;

      const sliderRect = slider.getBoundingClientRect();
      let x = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
      x = x - sliderRect.left;
      let position = (x / sliderRect.width) * 100;

      // Constrain position between 0 and 100
      position = Math.max(0, Math.min(position, 100));

      // Update after image width and handle position
      afterImage.style.width = `${position}%`;
      handle.style.left = `${position}%`;
    }
  });
});
