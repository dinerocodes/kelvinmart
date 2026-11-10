document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mainNavigation");

  if (!toggle || !menu) {
    console.error("Mobile menu elements not found.");
    return;
  }

  let overlay = document.querySelector(".mobile-nav-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "mobile-nav-overlay";
    document.body.appendChild(overlay);
  }

  function openMenu() {
    menu.classList.add("is-open");
    toggle.classList.add("active");
    overlay.classList.add("show");

    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation");

    document.body.classList.add("mobile-nav-open");
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.classList.remove("active");
    overlay.classList.remove("show");

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");

    document.body.classList.remove("mobile-nav-open");
  }

  // Open and close hamburger menu
  toggle.addEventListener("click", function (event) {
    event.preventDefault();

    if (menu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when overlay is clicked
  overlay.addEventListener("click", closeMenu);

  // Close with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Close after clicking a normal navigation link
  menu
    .querySelectorAll(".nav-links > li:not(.has-dropdown) > a")
    .forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

  // Mobile dropdown functionality
  menu
    .querySelectorAll(".has-dropdown > .dropdown-toggle-link")
    .forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (window.innerWidth <= 991) {
          event.preventDefault();
          link.parentElement.classList.toggle("dropdown-open");
        }
      });
    });

  // Close menu when switching to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 991) {
      closeMenu();
    }
  });
});
