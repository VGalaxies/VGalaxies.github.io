const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------------------
 * Starfield — a living constellation behind everything.
 * Three parallax depth layers of drifting stars; lines stitch the nearest
 * stars to the cursor so the "star-map" theme becomes literal and reactive.
 * ------------------------------------------------------------------------- */
function initStarfield() {
  const canvas = document.querySelector(".vr-starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const LAYERS = [
    { count: 0, speed: 0.012, size: [0.4, 0.9], alpha: 0.35, depth: 6 },
    { count: 0, speed: 0.024, size: [0.6, 1.3], alpha: 0.55, depth: 14 },
    { count: 0, speed: 0.05, size: [0.8, 1.8], alpha: 0.85, depth: 28 },
  ];
  const INK = "236, 232, 220";
  const ACCENT = "242, 174, 73";

  let w = 0;
  let h = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let stars = [];
  const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
  const par = { x: 0, y: 0, tx: 0, ty: 0 };

  const rand = (min, max) => min + Math.random() * (max - min);

  function build() {
    const area = w * h;
    stars = [];
    LAYERS.forEach((layer, li) => {
      layer.count = Math.round((area / 26000) * (li === 2 ? 0.7 : 1));
      for (let i = 0; i < layer.count; i += 1) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: rand(layer.size[0], layer.size[1]),
          a: rand(layer.alpha * 0.5, layer.alpha),
          tw: rand(0, Math.PI * 2),
          tws: rand(0.6, 1.8),
          vx: rand(-1, 1) * layer.speed,
          vy: rand(-1, 1) * layer.speed,
          li,
          accent: Math.random() > 0.92,
        });
      }
    });
  }

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  let t = 0;
  function frame() {
    t += 0.016;
    par.x += (par.tx - par.x) * 0.06;
    par.y += (par.ty - par.y) * 0.06;
    pointer.x += (pointer.tx - pointer.x) * 0.12;
    pointer.y += (pointer.ty - pointer.y) * 0.12;
    ctx.clearRect(0, 0, w, h);

    const near = [];
    for (let i = 0; i < stars.length; i += 1) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < -4) s.x = w + 4;
      else if (s.x > w + 4) s.x = -4;
      if (s.y < -4) s.y = h + 4;
      else if (s.y > h + 4) s.y = -4;

      const layer = LAYERS[s.li];
      const px = s.x + par.x * layer.depth;
      const py = s.y + par.y * layer.depth;
      const twinkle = 0.55 + 0.45 * Math.sin(t * s.tws + s.tw);
      const alpha = s.a * twinkle;
      const color = s.accent ? ACCENT : INK;

      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.fill();

      if (pointer.active && s.li === 2) {
        const dx = px - pointer.x;
        const dy = py - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150) near.push({ px, py, d: Math.sqrt(d2) });
      }
    }

    if (pointer.active && near.length) {
      near.sort((a, b) => a.d - b.d);
      const top = near.slice(0, 6);
      for (let i = 0; i < top.length; i += 1) {
        const a = top[i];
        const lineA = (1 - a.d / 150) * 0.4;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(a.px, a.py);
        ctx.strokeStyle = `rgba(${ACCENT}, ${lineA})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }

    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.active = true;
      par.tx = (e.clientX / w - 0.5) * -1;
      par.ty = (e.clientY / h - 0.5) * -1;
    },
    { passive: true }
  );
  window.addEventListener("pointerleave", () => {
    pointer.active = false;
    pointer.tx = -9999;
    pointer.ty = -9999;
  });

  if (reduceMotion) {
    // Draw a single static frame, no animation loop.
    ctx.clearRect(0, 0, w, h);
    stars.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.accent ? ACCENT : INK}, ${s.a})`;
      ctx.fill();
    });
    return;
  }
  requestAnimationFrame(frame);
}

/* ---------------------------------------------------------------------------
 * Home title — decode/reveal entrance for VISUAL READING.
 * ------------------------------------------------------------------------- */
function initTitleReveal() {
  const title = document.querySelector(".vr-home-title");
  if (!title || reduceMotion || typeof gsap === "undefined") return;

  // Wrap each line's text in an inner element that slides up inside the
  // overflow-hidden line, producing a clean mask reveal.
  const lines = [...title.querySelectorAll("span")];
  const inners = lines.map((line) => {
    const inner = document.createElement("span");
    inner.className = "vr-line-inner";
    while (line.firstChild) inner.appendChild(line.firstChild);
    line.appendChild(inner);
    return inner;
  });

  title.classList.add("vr-will-reveal");
  gsap.set(inners, { yPercent: 118 });
  gsap.set(title, { visibility: "visible" });
  gsap.to(inners, {
    yPercent: 0,
    duration: 1.15,
    ease: "expo.out",
    stagger: 0.11,
    delay: 0.12,
  });
}

/* ---------------------------------------------------------------------------
 * Animated counts via NumberFlow (odometer digit-roll). Enhances any element
 * marked [data-count-to]; degrades to the plain number if the module or
 * custom-element support is unavailable, or motion is reduced.
 * ------------------------------------------------------------------------- */
function initCounts() {
  const targets = [...document.querySelectorAll("[data-count-to]")];
  if (!targets.length) return;

  const setPlain = (el) => {
    el.textContent = el.dataset.countTo;
  };

  if (reduceMotion || !("customElements" in window)) {
    targets.forEach(setPlain);
    return;
  }

  import("https://esm.sh/number-flow@0.6.1")
    .then(() => customElements.whenDefined("number-flow"))
    .then(() => {
      targets.forEach((el) => {
        const value = parseInt(el.dataset.countTo, 10);
        if (!Number.isFinite(value)) return setPlain(el);
        const flow = document.createElement("number-flow");
        flow.setAttribute("aria-hidden", "true");
        el.textContent = "";
        el.appendChild(flow);
        // First .update() sets the baseline; a rAF-deferred second call rolls
        // the digits up from zero for the entrance.
        flow.update(0);
        requestAnimationFrame(() => flow.update(value));
      });
    })
    .catch(() => targets.forEach(setPlain));
}

/* ---------------------------------------------------------------------------
 * Scroll-triggered reveals for feed rows, sections, and catalog entries.
 * ------------------------------------------------------------------------- */
function initScrollReveals() {
  if (reduceMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  const groups = [
    ".vr-home-feed li",
    ".vr-home-manifesto > *",
    ".vr-catalog-hero > *",
    ".vr-filter-panel",
  ];
  groups.forEach((sel) => {
    const items = gsap.utils.toArray(sel);
    if (!items.length) return;
    gsap.from(items, {
      y: 26,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: items[0], start: "top 88%" },
    });
  });
}

/* ---------------------------------------------------------------------------
 * Catalog filtering — smooth reflow, live count, tag deep-links.
 * ------------------------------------------------------------------------- */
function initCatalog() {
  const entries = [...document.querySelectorAll(".vr-entry")];
  const filters = [...document.querySelectorAll(".vr-filter")];
  const count = document.querySelector("[data-visible-count]");
  const empty = document.querySelector("[data-empty]");
  if (!entries.length) return;

  const hasGsap = typeof gsap !== "undefined" && !reduceMotion;

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
      if (matches) {
        visible += 1;
        if (hasGsap) {
          gsap.fromTo(
            entry,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: true }
          );
        }
      }
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
}

/* ---------------------------------------------------------------------------
 * Home orbit — pointer parallax (rotation/travel handled in CSS).
 * ------------------------------------------------------------------------- */
function initOrbit() {
  const orbit = document.querySelector(".vr-orbit");
  if (!orbit || reduceMotion) return;
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 16;
      const y = (event.clientY / window.innerHeight - 0.5) * 16;
      orbit.style.setProperty("--orbit-x", `${x}px`);
      orbit.style.setProperty("--orbit-y", `${y}px`);
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  initStarfield();
  initCatalog();
  initOrbit();
  initTitleReveal();
  initCounts();
  initScrollReveals();
});
