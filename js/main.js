/* ==========================================================================
   Site-wide behaviour: mobile nav, active link, footer year,
   scroll reveal and contact form validation.
   ========================================================================== */

document.documentElement.classList.remove("no-js");

/* ---------- Mobile navigation ---------- */
(() => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close the menu when switching to the desktop layout.
  window.matchMedia("(min-width: 1025px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
})();

/* ---------- Highlight the current page in the nav ---------- */
(() => {
  const page = document.body.dataset.page;
  // Posts, categories and tags belong to the Blog section.
  const section = ["post", "categories", "tags"].includes(page) ? "blog" : page;
  document.querySelectorAll(".site-nav a[data-nav]").forEach((link) => {
    if (link.dataset.nav === section) link.setAttribute("aria-current", "page");
  });
})();

/* ---------- Footer year ---------- */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ---------- Reveal on scroll ---------- */
const observeReveals = (root = document) => {
  const items = root.querySelectorAll(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((el) => observer.observe(el));
};
observeReveals();

/* ---------- Portfolio filter ---------- */
(() => {
  const buttons = document.querySelectorAll(".portfolio-filters [data-filter]");
  if (!buttons.length) return;
  const cards = document.querySelectorAll("#portfolio-grid [data-category]");
  const status = document.getElementById("portfolio-status");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      let shown = 0;
      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.hidden = !match;
        if (match) {
          shown += 1;
          card.classList.add("is-visible");
        }
      });
      if (status) status.textContent = `Showing ${shown} ${shown === 1 ? "project" : "projects"}`;
    });
  });
})();

/* ---------- Forms (contact + audit) ---------- */
document.querySelectorAll("form[data-validate]").forEach((form) => {
  const status = form.querySelector(".form__status");
  const requiredSelector = "input[required], textarea[required]";

  const messages = {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    website: "Please enter your website address, starting with https://",
    message: "Please tell us a little about your project.",
  };

  const validateField = (field) => {
    const error = document.getElementById(`${field.id}-error`);
    const valid = field.checkValidity();
    field.setAttribute("aria-invalid", String(!valid));
    if (error) error.textContent = valid ? "" : messages[field.name] || "This field is required.";
    return valid;
  };

  form.querySelectorAll(requiredSelector).forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll(requiredSelector)];
    const results = fields.map(validateField);
    const firstInvalid = fields[results.indexOf(false)];
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // TODO: connect a form service (e.g. Formspree, Netlify Forms or your own
    // endpoint). Until then forms only confirm locally and send nothing.
    // Example:
    //   await fetch(form.action, { method: "POST", body: new FormData(form),
    //                              headers: { Accept: "application/json" } });

    form.reset();
    fields.forEach((f) => f.removeAttribute("aria-invalid"));
    if (status) {
      status.hidden = false;
      status.focus();
    }
  });
});
