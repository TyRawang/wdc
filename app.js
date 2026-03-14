const header = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".nav a");
const heroCard = document.querySelector(".hero-card");
const hero = document.querySelector(".hero");

const setActiveLink = () => {
  const scrollY = window.scrollY;
  const sections = Array.from(document.querySelectorAll("main section"));

  let currentId = "";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop - 120) {
      currentId = section.getAttribute("id") || "";
    }
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute("href").replace("#", "");
    if (target && target === currentId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

const animateCard = () => {
  if (!heroCard) return;
  heroCard.animate(
    [
      { transform: "translateY(0px)" },
      { transform: "translateY(-6px)" },
      { transform: "translateY(0px)" },
    ],
    {
      duration: 4000,
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );
};

const setupReveal = () => {
  const targets = document.querySelectorAll(
    ".hero, .section, .cta, .site-footer"
  );

  targets.forEach((target) => target.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach((target) => observer.observe(target));
};

const setupHeroTilt = () => {
  if (!hero || !heroCard) return;

  const animations = heroCard.getAnimations();

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    animations.forEach((animation) => animation.pause());
    heroCard.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(
      2
    )}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  });

  hero.addEventListener("mouseleave", () => {
    heroCard.style.transform = "";
    animations.forEach((animation) => animation.play());
  });
};

// Placeholder hook for form handling or analytics
window.WebDesignCalgary = {
  logEvent: (name, payload = {}) => {
    console.info("[placeholder event]", name, payload);
  },
};

const leadForm = document.querySelector("#lead-form");
if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    window.WebDesignCalgary.logEvent("lead_form_submit", {
      name: leadForm.name.value,
      email: leadForm.email.value,
      website: leadForm.website.value,
      goal: leadForm.goal.value,
    });
    leadForm.reset();
    alert("Thanks! This is a placeholder form for now.");
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", () => {
  setActiveLink();
  animateCard();
  setupReveal();
  setupHeroTilt();
});
