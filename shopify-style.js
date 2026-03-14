const forms = document.querySelectorAll("#hero-form, #audit-form");
const statNumbers = document.querySelectorAll(".stat-number");

const formatNumber = (value, { prefix, suffix, decimals, separator }) => {
  const fixedValue = value.toFixed(decimals);
  const parts = fixedValue.split(".");
  const integer = separator
    ? parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : parts[0];
  const decimal = parts[1] ? `.${parts[1]}` : "";
  return `${prefix}${integer}${decimal}${suffix}`;
};

const animateCount = (element) => {
  const target = parseFloat(element.dataset.count || "0");
  const prefix = element.dataset.prefix || "";
  const suffix = element.dataset.suffix || "";
  const decimals = parseInt(element.dataset.decimals || "0", 10);
  const separator = element.dataset.separator || "";

  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    element.textContent = formatNumber(current, {
      prefix,
      suffix,
      decimals,
      separator,
    });
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const setupCountAnimations = () => {
  if (!statNumbers.length) return;

  if (!("IntersectionObserver" in window)) {
    statNumbers.forEach(animateCount);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  statNumbers.forEach((number) => observer.observe(number));
};

const setupCharts = () => {
  if (typeof Chart === "undefined") return;

  const leadCanvas = document.getElementById("lead-chart");
  const growthCanvas = document.getElementById("growth-chart");
  const chartTargets = [leadCanvas, growthCanvas].filter(Boolean);

  const createLeadChart = () => {
    if (!leadCanvas || leadCanvas.dataset.ready) return;
    leadCanvas.dataset.ready = "true";
    new Chart(leadCanvas, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [12, 18, 14, 26, 20, 28, 34],
            borderColor: "#0B3B2F",
            backgroundColor: "rgba(0, 94, 77, 0.12)",
            fill: true,
            tension: 0.45,
            pointRadius: 3.5,
            pointBackgroundColor: "#0B3B2F",
          },
        ],
      },
      options: {
        animation: { duration: 1400 },
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false, grid: { display: false } },
          y: { display: false, grid: { display: false } },
        },
      },
    });
  };

  const createGrowthChart = () => {
    if (!growthCanvas || growthCanvas.dataset.ready) return;
    growthCanvas.dataset.ready = "true";
    new Chart(growthCanvas, {
      type: "bar",
      data: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            data: [18, 24, 32, 46],
            backgroundColor: [
              "rgba(0, 94, 77, 0.2)",
              "rgba(0, 94, 77, 0.35)",
              "rgba(0, 94, 77, 0.5)",
              "rgba(0, 94, 77, 0.7)",
            ],
            borderRadius: 12,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false, grid: { display: false } },
          y: { display: false, grid: { display: false }, beginAtZero: true },
        },
        animation: {
          duration: 1600,
          delay(context) {
            if (context.type !== "data" || context.mode !== "default") {
              return 0;
            }
            return context.dataIndex * 180;
          },
        },
        animations: {
          y: { from: 0 },
        },
      },
    });
  };

  if (!("IntersectionObserver" in window)) {
    createLeadChart();
    createGrowthChart();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === leadCanvas) createLeadChart();
          if (entry.target === growthCanvas) createGrowthChart();
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  chartTargets.forEach((target) => observer.observe(target));
};

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = form.querySelector("input[name='email']");
    if (emailInput) {
      console.info("[placeholder lead]", emailInput.value);
      emailInput.value = "";
    }
    alert("Thanks! This is a placeholder form for now.");
  });
});

setupCountAnimations();
setupCharts();
