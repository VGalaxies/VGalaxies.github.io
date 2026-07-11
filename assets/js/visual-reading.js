document.addEventListener("DOMContentLoaded", () => {
  const entries = [...document.querySelectorAll(".vr-entry")];
  const filters = [...document.querySelectorAll(".vr-filter")];
  const count = document.querySelector("[data-visible-count]");
  const empty = document.querySelector("[data-empty]");

  const revealEntries = () => {
    entries.forEach((entry, index) => {
      window.setTimeout(() => entry.classList.add("is-visible"), Math.min(index, 9) * 45);
    });
  };

  const applyFilter = (filter) => {
    let visible = 0;
    entries.forEach((entry) => {
      const tags = (entry.dataset.tags || "").split("|");
      const matches = filter === "all" || tags.includes(filter);
      entry.hidden = !matches;
      entry.classList.toggle("is-visible", matches);
      if (matches) visible += 1;
    });

    filters.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (count) count.textContent = String(visible);
    if (empty) empty.hidden = visible !== 0;
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter || "all"));
  });

  document.querySelectorAll("[data-filter-tag]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filterTag;
      applyFilter(filter);
      document.querySelector(".vr-filter-panel")?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  });

  document.documentElement.classList.add("vr-js");
  revealEntries();

  const orbit = document.querySelector(".vr-orbit");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (orbit && !reduceMotion) {
    window.addEventListener("pointermove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 14;
      const y = (event.clientY / window.innerHeight - 0.5) * 14;
      orbit.style.setProperty("--orbit-x", `${x}px`);
      orbit.style.setProperty("--orbit-y", `${y}px`);
    }, { passive: true });
  }
});
