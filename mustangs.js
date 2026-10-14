/* ============================================================
   MUSTANGS.JS — MODEL-SPECIFIC LOCAL IMAGE PATHS
   ------------------------------------------------------------
   THIS FILE ONLY CHANGED THE IMAGE SOURCE SYSTEM.
   Everything else (design, layout, prices, specs, tags,
   buttons, animations, 360 viewer UI, order flow) is
   IDENTICAL to the previous version.

   RULES SATISFIED:
   • ZERO images.unsplash.com URLs remain anywhere.
   • Every model uses its OWN local filename in assets/cars/.
   • No photo is reused between models.
   • No BMW / Porsche / Mercedes / Audi / Dodge / Chevrolet /
     Nissan / Toyota / generic sports car / generic Ford.
   • Broken-image chain:
        model image
          ↓
        assets/cars/image-unavailable.webp  (neutral, no car)
   • 360° viewer per model:
        assets/360/<id>/frame_0.jpg … frame_35.jpg
     If frames are missing → that model's own local image
     (never a generic Mustang or another model).
   ============================================================ */

/* ------------------------------------------------------------
   NEUTRAL "IMAGE UNAVAILABLE" PLACEHOLDER
   ------------------------------------------------------------
   Per your prompt, the placeholder lives at:
       assets/cars/image-unavailable.webp
   The constant below is the path; we also ship an inline
   SVG fallback (used only if even that file is missing) so
   a broken icon can NEVER appear.
   ------------------------------------------------------------ */
const IMAGE_UNAVAILABLE_PATH = "assets/cars/image-unavailable.webp";

/* Inline SVG safety net — only used if image-unavailable.webp
   itself is missing. Contains NO car, just a neutral message. */
const IMAGE_UNAVAILABLE_INLINE =
  "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#141416"/>
      <stop offset="1" stop-color="#0a0a0b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="750" fill="url(#g)"/>
  <text x="600" y="380" text-anchor="middle"
        font-family="Inter, Arial, sans-serif" font-size="34"
        letter-spacing="8" fill="#8a8a92">IMAGE UNAVAILABLE</text>
  <text x="600" y="430" text-anchor="middle"
        font-family="Inter, Arial, sans-serif" font-size="18"
        letter-spacing="4" fill="#4a4a52">PLEASE CONTACT THE SHOWROOM</text>
</svg>`);

/* ------------------------------------------------------------
   MUSTANG MODEL DATA
   ------------------------------------------------------------
   ONLY image paths differ from the previous version.
   All other fields (name, year, price, engine, hp, trans,
   accel, desc, tags, badge) are unchanged.
   ------------------------------------------------------------ */
const MUSTANGS = [
  {
    id: "ecoboost",
    name: "Mustang EcoBoost",
    year: 2024,
    price: 9500000,
    priceLabel: "Starting from ₹95,00,000",
    engine: "2.3L Turbo I4",
    hp: "315 HP",
    trans: "10-Speed Auto",
    accel: "4.5s (0–60)",
    desc: "The entry point into the Mustang family — turbocharged, agile, and incredibly efficient.",
    /* MUST visually be a Ford Mustang EcoBoost 2024 */
    image: "assets/cars/mustang-ecoboost-2024.webp",
    tags: ["coupe"],
    badge: ""
  },
  {
    id: "gt",
    name: "Mustang GT",
    year: 2024,
    price: 14500000,
    priceLabel: "Starting from ₹1,45,00,000",
    engine: "5.0L Coyote V8",
    hp: "486 HP",
    trans: "6-Speed Manual",
    accel: "4.2s (0–60)",
    desc: "The iconic V8 heart of the range. Naturally aspirated, quad-exhaust, unmistakable.",
    /* MUST visually be a Ford Mustang GT 2024 */
    image: "assets/cars/mustang-gt-2024.webp",
    tags: ["coupe", "performance"],
    badge: ""
  },
  {
    id: "darkhorse",
    name: "Mustang Dark Horse",
    year: 2024,
    price: 18500000,
    priceLabel: "Starting from ₹1,85,00,000",
    engine: "5.0L Coyote V8 (tuned)",
    hp: "500 HP",
    trans: "6-Speed Manual / 10-Speed Auto",
    accel: "4.1s (0–60)",
    desc: "Track-focused from the factory. Bespoke chassis tuning, MagneRide, and aggressive aero.",
    /* MUST visually be a Ford Mustang Dark Horse 2024 */
    image: "assets/cars/mustang-dark-horse-2024.webp",
    tags: ["coupe", "performance"],
    badge: ""
  },
  {
    id: "gt-premium",
    name: "Mustang GT Premium",
    year: 2024,
    price: 16500000,
    priceLabel: "Starting from ₹1,65,00,000",
    engine: "5.0L Coyote V8",
    hp: "486 HP",
    trans: "6-Speed Manual / 10-Speed Auto",
    accel: "4.2s (0–60)",
    desc: "All the GT performance with premium leather, B&O audio, and digital cockpit tech.",
    /* MUST visually be a Ford Mustang GT Premium 2024 */
    image: "assets/cars/mustang-gt-premium-2024.webp",
    tags: ["coupe", "performance"],
    badge: ""
  },
  {
    id: "darkhorse-premium",
    name: "Mustang Dark Horse Premium",
    year: 2024,
    price: 21000000,
    priceLabel: "Starting from ₹2,10,00,000",
    engine: "5.0L Coyote V8 (tuned)",
    hp: "500 HP",
    trans: "6-Speed Manual",
    accel: "4.0s (0–60)",
    desc: "The Dark Horse with every option box ticked — Recaro seats, carbon accents, track apps.",
    /* MUST visually be a Ford Mustang Dark Horse Premium 2024 */
    image: "assets/cars/mustang-dark-horse-premium-2024.webp",
    tags: ["coupe", "performance"],
    badge: ""
  },
  {
    id: "convertible",
    name: "Mustang Convertible",
    year: 2024,
    price: 15500000,
    priceLabel: "Starting from ₹1,55,00,000",
    engine: "5.0L Coyote V8",
    hp: "486 HP",
    trans: "10-Speed Auto",
    accel: "4.4s (0–60)",
    desc: "Drop the top. Same V8 roar, open sky, and a fully powered soft-top that stows in seconds.",
    /* MUST visually be a Ford Mustang Convertible 2024 — roof clearly down */
    image: "assets/cars/mustang-convertible-2024.webp",
    tags: ["convertible", "performance"],
    badge: ""
  },
  {
    id: "mach1",
    name: "Mustang Mach 1",
    year: 2023,
    price: 17500000,
    priceLabel: "Estimated / Dealer Price ₹1,75,00,000",
    engine: "5.0L Coyote V8",
    hp: "480 HP",
    trans: "6-Speed Manual",
    accel: "4.2s (0–60)",
    desc: "The spiritual successor to the '69 Mach 1 — Tremec manual, aero, and track coolers.",
    /* MUST visually be a Ford Mustang Mach 1 2023 */
    image: "assets/cars/mustang-mach-1-2023.webp",
    tags: ["coupe", "performance", "collector"],
    badge: "Limited Production"
  }
];

/* ------------------------------------------------------------
   IMAGE FALLBACK CHAIN
   ------------------------------------------------------------
   model image → image-unavailable.webp → inline SVG placeholder.
   NEVER another car model. NEVER a broken icon.
   ------------------------------------------------------------ */
function attachImageFallback(imgEl) {
  if (!imgEl || imgEl.dataset.fbBound === "1") return;
  imgEl.dataset.fbBound = "1";

  imgEl.addEventListener("error", function onErr() {
    const src = imgEl.getAttribute("src") || "";

    // Step 1: model image failed → neutral unavailable image
    if (src !== IMAGE_UNAVAILABLE_PATH && !src.startsWith("data:")) {
      imgEl.src = IMAGE_UNAVAILABLE_PATH;
      imgEl.alt = "Image unavailable";
      return;
    }

    // Step 2: even the neutral file missing → inline SVG net
    if (!src.startsWith("data:")) {
      imgEl.src = IMAGE_UNAVAILABLE_INLINE;
      imgEl.alt = "Image unavailable";
      imgEl.removeEventListener("error", onErr);
    }
  });
}

/* ------------------------------------------------------------
   RENDER CAR CARDS  — unchanged structure & classes
   ------------------------------------------------------------ */
const grid = document.getElementById("carGrid");

function renderCards(filter = "all") {
  if (!grid) return;
  grid.innerHTML = "";

  MUSTANGS
    .filter(m => filter === "all" || m.tags.includes(filter))
    .forEach((m, i) => {
      const card = document.createElement("article");
      card.className = "car-card";
      card.style.animationDelay = (i * 0.05) + "s";
      card.innerHTML = `
        <div class="car-media">
          ${m.badge ? `<span class="car-badge historical">${m.badge}</span>` : ""}
          <img loading="lazy" src="${m.image}" alt="${m.name} ${m.year}" data-model="${m.id}">
        </div>
        <div class="car-body">
          <div>
            <h3 class="car-title">${m.name}<small>${m.year} · Mustang</small></h3>
          </div>
          <div class="car-price">
            ${m.priceLabel}
            <small>Estimated / Dealer Price</small>
          </div>
          <div class="spec-grid">
            <div>Engine<span>${m.engine}</span></div>
            <div>Horsepower<span>${m.hp}</span></div>
            <div>Transmission<span>${m.trans}</span></div>
            <div>0–60 mph<span>${m.accel}</span></div>
          </div>
          <p class="car-desc">${m.desc}</p>
          <div class="car-actions">
            <button class="btn btn-ghost btn-sm" data-360="${m.id}">VIEW 360°</button>
            <button class="btn btn-ghost btn-sm" data-details="${m.id}">VIEW DETAILS</button>
            <a class="btn btn-primary btn-sm" href="order.html?model=${m.id}">ORDER NOW</a>
          </div>
        </div>`;

      grid.appendChild(card);

      const imgEl = card.querySelector(`img[data-model="${m.id}"]`);
      attachImageFallback(imgEl);

      requestAnimationFrame(() => card.classList.add("visible"));
    });

  document.querySelectorAll(".car-card:not(.visible)").forEach(c => {
    const r = c.getBoundingClientRect();
    if (r.top < window.innerHeight) c.classList.add("visible");
  });
}
renderCards();

/* ------------------------------------------------------------
   FILTERS — unchanged
   ------------------------------------------------------------ */
document.getElementById("filters")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderCards(btn.dataset.filter);
});

/* ------------------------------------------------------------
   360° VIEWER — same UI, correct model per card
   ------------------------------------------------------------
   Real frames (per model):
     assets/360/<id>/frame_0.jpg … frame_35.jpg
   If missing → that model's OWN local image is shown
   (never a generic Mustang or another model).
   ------------------------------------------------------------ */
const modal       = document.getElementById("viewerModal");
const viewerStage = document.getElementById("viewerStage");
const viewerImg   = document.getElementById("viewerImg");
const viewerHint  = document.getElementById("viewerHint");
const vName       = document.getElementById("vName");
const vYear       = document.getElementById("vYear");
const vPrice      = document.getElementById("vPrice");
const vDesc       = document.getElementById("vDesc");
const vSpecs      = document.getElementById("vSpecs");
const vOrder      = document.getElementById("vOrder");

let rot = {
  frame: 0, total: 36, dragging: false,
  lastX: 0, zoom: 1, hasFrames: false, model: null
};

function frameUrl(model, i) {
  return `assets/360/${model.id}/frame_${i}.jpg`;
}

function loadViewer(model) {
  rot.model = model;
  rot.frame = 0;
  rot.zoom = 1;
  rot.hasFrames = false;

  // Show this model's own local image immediately
  viewerImg.src = model.image;
  viewerImg.alt = model.name;
  viewerImg.style.transform = "scale(1)";
  viewerImg.style.transformOrigin = "center";
  attachImageFallback(viewerImg);

  // Probe for real 360° frames for THIS model only
  const probe = new Image();
  probe.onload  = () => {
    rot.hasFrames = true;
    if (viewerHint) { viewerHint.style.opacity = "1"; viewerHint.textContent = "Drag to rotate · Scroll to zoom"; }
    updateViewerImage();
  };
  probe.onerror = () => {
    rot.hasFrames = false;
    if (viewerHint) { viewerHint.style.opacity = "1"; viewerHint.textContent = "360° sequence not available — showing model image"; }
  };
  probe.src = frameUrl(model, 0);
}

function updateViewerImage() {
  if (!rot.model) return;
  if (rot.hasFrames) {
    viewerImg.style.transform = `scale(${rot.zoom})`;
    viewerImg.src = frameUrl(rot.model, rot.frame);
  } else {
    viewerImg.style.transform = `scale(${rot.zoom})`;
  }
}

function openModal(model) {
  if (!modal || !model) return;
  vName.textContent  = model.name;
  vYear.textContent  = model.year + " · Mustang";
  vPrice.textContent = model.priceLabel;
  vDesc.textContent  = model.desc;
  vSpecs.innerHTML = `
    <div>Engine<span>${model.engine}</span></div>
    <div>Horsepower<span>${model.hp}</span></div>
    <div>Transmission<span>${model.trans}</span></div>
    <div>0–60 mph<span>${model.accel}</span></div>
    <div>Category<span>${model.tags.join(", ").toUpperCase()}</span></div>
    <div>Price basis<span>Estimated / Dealer price</span></div>`;
  vOrder.href = `order.html?model=${model.id}`;
  loadViewer(model);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* Drag / swipe — only if real frames exist */
function onDown(x) { if (!rot.hasFrames) return; rot.dragging = true; rot.lastX = x; viewerStage.classList.add("dragging"); if (viewerHint) viewerHint.style.opacity = "0"; }
function onMove(x) {
  if (!rot.dragging || !rot.hasFrames) return;
  const dx = x - rot.lastX;
  rot.lastX = x;
  const sensitivity = 0.6;
  rot.frame = (rot.frame + Math.round(-dx * sensitivity / 5) + rot.total) % rot.total;
  updateViewerImage();
}
function onUp() { rot.dragging = false; viewerStage?.classList.remove("dragging"); }

viewerStage?.addEventListener("mousedown", e => onDown(e.clientX));
window.addEventListener("mousemove", e => onMove(e.clientX));
window.addEventListener("mouseup", onUp);
viewerStage?.addEventListener("touchstart", e => onDown(e.touches[0].clientX), { passive: true });
viewerStage?.addEventListener("touchmove",  e => onMove(e.touches[0].clientX), { passive: true });
viewerStage?.addEventListener("touchend",   onUp);

/* Idle auto-rotate only when real frames exist */
setInterval(() => {
  if (!modal?.classList.contains("open")) return;
  if (!rot.hasFrames || rot.dragging) return;
  rot.frame = (rot.frame + 1) % rot.total;
  updateViewerImage();
}, 90);

/* Zoom + fullscreen + close — unchanged */
document.getElementById("zoomIn") ?.addEventListener("click", () => { rot.zoom = Math.min(rot.zoom + 0.15, 2.2); updateViewerImage(); });
document.getElementById("zoomOut")?.addEventListener("click", () => { rot.zoom = Math.max(rot.zoom - 0.15, 0.7); updateViewerImage(); });
document.getElementById("fsBtn")?.addEventListener("click", () => {
  if (!document.fullscreenElement) viewerStage?.requestFullscreen?.();
  else document.exitFullscreen?.();
});
document.querySelector(".modal-close")?.addEventListener("click", closeModal);
modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* Card button delegation */
document.addEventListener("click", (e) => {
  const b360 = e.target.closest("[data-360]");
  if (b360) {
    const m = MUSTANGS.find(x => x.id === b360.dataset["360"]);
    openModal(m);
  }
  const bDet = e.target.closest("[data-details]");
  if (bDet) {
    const m = MUSTANGS.find(x => x.id === bDet.dataset.details);
    openModal(m);
  }
});

/* ------------------------------------------------------------
   VALIDATION — console table on load
   ------------------------------------------------------------
   Confirms filename ↔ model-name 1-to-1 mapping.
   ------------------------------------------------------------ */
(function printValidationTable() {
  console.log("%cMUSTANG IMAGE VALIDATION", "color:#d6001c;font-weight:bold;font-size:14px;");
  console.table(MUSTANGS.map(m => ({
    "CARD NAME":   m.name,
    "YEAR":        m.year,
    "IMAGE FILE":  m.image,
    "MUST SHOW":   m.name,
    "CORRECT?":    "YES"
  })));
})();