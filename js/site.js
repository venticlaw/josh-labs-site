const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-site-nav]");

if (navToggle && siteNav) {
  const setOpen = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    siteNav.dataset.open = String(open);
  };

  navToggle.addEventListener("click", () => {
    setOpen(navToggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      navToggle.focus();
    }
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });
}

// Mark the current page in the site nav (skips links with in-page anchors).
if (siteNav) {
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  siteNav.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.includes("#") || link.hasAttribute("aria-current")) {
      return;
    }
    if (href.split("/").pop().toLowerCase() === here) {
      link.setAttribute("aria-current", "page");
    }
  });
}
