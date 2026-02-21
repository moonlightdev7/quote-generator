// scripts/shop.js

const grid = document.getElementById("shop-grid");

// Decorations sold here (separate from premium themes)
const DECORATIONS = [
  {
    id: "leafy-frame",
    name: "Leafy Vine Frame",
    description: "A true frame border: 4 edges + 4 corners. Resizes for all screens.",
    price: 2.99
  }
];

// Use same purchases object as themes, without breaking your existing premiumThemes.js
// premiumThemes.js expects: { unlocked: [] }  :contentReference[oaicite:3]{index=3}
function getPurchases() {
  try {
    return JSON.parse(localStorage.getItem("quoteAppPurchases")) || { unlocked: [], unlockedDecorations: [] };
  } catch {
    return { unlocked: [], unlockedDecorations: [] };
  }
}

function savePurchases(p) {
  localStorage.setItem("quoteAppPurchases", JSON.stringify(p));
}

function isDecorationUnlocked(decoId) {
  const p = getPurchases();
  return Array.isArray(p.unlockedDecorations) && p.unlockedDecorations.includes(decoId);
}

function unlockDecoration(decoId) {
  const p = getPurchases();
  if (!Array.isArray(p.unlockedDecorations)) p.unlockedDecorations = [];
  if (!p.unlockedDecorations.includes(decoId)) p.unlockedDecorations.push(decoId);
  savePurchases(p);
}

function renderSectionTitle(text) {
  const el = document.createElement("div");
  el.className = "shop-section-title";
  el.textContent = text;
  grid.appendChild(el);
}

function renderThemeCards() {
  renderSectionTitle("Premium Themes");

  PREMIUM_THEMES.forEach((t) => {
    const unlocked = isUnlocked(t.id); // from premiumThemes.js :contentReference[oaicite:4]{index=4}

    const card = document.createElement("div");
    card.className = "shop-card";
    card.dataset.type = "theme";
    card.dataset.id = t.id;

    card.innerHTML = `
      <h3>${t.name} ${unlocked ? `<span class="badge">Unlocked</span>` : ""}</h3>
      <p>${t.description}</p>
      <p><b>$${t.price.toFixed(2)}</b></p>
      <div class="row">
        <button data-action="preview" data-type="theme" data-id="${t.id}">Preview</button>
        ${
          unlocked
            ? `<button data-action="apply" data-type="theme" data-id="${t.id}">Apply</button>`
            : `<button data-action="unlock" data-type="theme" data-id="${t.id}">Unlock (demo)</button>`
        }
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderDecorationCards() {
  renderSectionTitle("Decorations");

  DECORATIONS.forEach((d) => {
    const unlocked = isDecorationUnlocked(d.id);

    const card = document.createElement("div");
    card.className = "shop-card";
    card.dataset.type = "deco";
    card.dataset.id = d.id;

    card.innerHTML = `
      <h3>${d.name} ${unlocked ? `<span class="badge">Unlocked</span>` : ""}</h3>
      <p>${d.description}</p>
      <p><b>$${d.price.toFixed(2)}</b></p>
      <div class="row">
        <button data-action="preview" data-type="deco" data-id="${d.id}">Preview</button>
        ${
          unlocked
            ? `<button data-action="apply" data-type="deco" data-id="${d.id}">Apply</button>`
            : `<button data-action="unlock" data-type="deco" data-id="${d.id}">Unlock (demo)</button>`
        }
      </div>
    `;
    grid.appendChild(card);
  });
}

function render() {
  grid.innerHTML = "";
  renderThemeCards();
  renderDecorationCards();
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const type = btn.dataset.type;
  const id = btn.dataset.id;

  // THEMES
  if (type === "theme") {
    if (action === "preview") {
      applyPremiumTheme(id); // premiumThemes.js :contentReference[oaicite:5]{index=5}
      alert("Preview applied! Go to Generator to see it.");
      return;
    }

    if (action === "apply") {
      applyPremiumTheme(id);
      window.location.href = "index.html";
      return;
    }

    if (action === "unlock") {
      unlockTheme(id); // premiumThemes.js :contentReference[oaicite:6]{index=6}
      render();
      return;
    }
  }

  // DECORATIONS
  if (type === "deco") {
    if (action === "preview") {
      // show it immediately without saving
      if (typeof window.applyLeafyBorder === "function") {
        window.applyLeafyBorder({ opacity: 0.95 });
      }
      alert("Preview applied! (Frame shows on this page too.)");
      return;
    }

    if (action === "apply") {
      if (typeof window.enableLeafyFramePersist === "function") {
        window.enableLeafyFramePersist({ opacity: 0.95 });
      }
      window.location.href = "index.html";
      return;
    }

    if (action === "unlock") {
      unlockDecoration(id);
      render();
      return;
    }
  }
});

render();