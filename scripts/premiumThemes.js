// ✅ Define your sellable theme packs here
const PREMIUM_THEMES = [
  {
    id: "pink-cherry",
    name: "Cherry Blossom Pink",
    description: "Soft pink vibe + cute floral border.",
    price: 2.99,
    bodyClass: "premium-pink-cherry"
  },
  {
    id: "green-vines",
    name: "Leafy Vines Green",
    description: "Green glow + vine border aesthetic.",
    price: 2.99,
    bodyClass: "premium-green-vines"
  }
];

function getPurchases() {
  return JSON.parse(localStorage.getItem("quoteAppPurchases")) || { unlocked: [] };
}

function savePurchases(p) {
  localStorage.setItem("quoteAppPurchases", JSON.stringify(p));
}

function isUnlocked(themeId) {
  const p = getPurchases();
  return p.unlocked.includes(themeId);
}

function unlockTheme(themeId) {
  const p = getPurchases();
  if (!p.unlocked.includes(themeId)) p.unlocked.push(themeId);
  savePurchases(p);
}

// ✅ Apply premium theme to the current page immediately
function applyPremiumTheme(themeId) {
  const theme = PREMIUM_THEMES.find(t => t.id === themeId);
  if (!theme) return;

  // Clear any existing premium classes
  document.body.classList.remove(
    ...Array.from(document.body.classList).filter(c => c.startsWith("premium-"))
  );

  document.body.classList.add(theme.bodyClass);

  // Persist as active theme
  const existing = JSON.parse(localStorage.getItem("quoteAppSettings")) || {};
  const next = {
    ...existing,
    theme: "premium",
    premiumThemeId: themeId
  };
  localStorage.setItem("quoteAppSettings", JSON.stringify(next));
}