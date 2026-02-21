// scripts/settings.js
document.addEventListener("DOMContentLoaded", () => {
  const SETTINGS_KEY = "quoteAppSettings";

  const applyBtn = document.getElementById("apply-btn");

  const tabButtons = document.querySelectorAll(".settings-tab");
  const panels = document.querySelectorAll(".settings-panel");

  const modeToggle = document.getElementById("mode-toggle");
  const modeIcon = document.getElementById("mode-icon");

  const themeSelect = document.getElementById("theme-select");
  const bgColorInput = document.getElementById("bg-color");
  const textColorInput = document.getElementById("text-color");
  const buttonColorInput = document.getElementById("button-color");
  const customSection = document.getElementById("custom-color-section");

  const bgUpload = document.getElementById("bg-upload");
  const defaultBg = document.getElementById("default-bg");

  // Decorations
  const decoSelect = document.getElementById("deco-select");
  const decoControls = document.getElementById("deco-controls");
  const decoOpacity = document.getElementById("deco-opacity");
  const decoThickness = document.getElementById("deco-thickness");

  // Reset buttons (per tab)
  const resetThemeBtn = document.getElementById("reset-theme");
  const resetBackgroundBtn = document.getElementById("reset-background");
  const resetDecorationsBtn = document.getElementById("reset-decorations");

  function getSettings() {
    try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; }
    catch { return {}; }
  }

  function setSettings(next) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next || {}));
  }

  function setModeIcon(isDark) {
    if (!modeIcon) return;
    modeIcon.textContent = isDark ? "🌙" : "☀️";
  }

  const KNOWN_THEMES = [
    "soft-girlie","midnight-black","lavender-dreams","mint-cream","peachy-vibes",
    "sky-blue-bliss","rose-quartz","ocean-deep","vanilla-cream","blush-pink",
    "lemon-sorbet","dusty-rose","cool-grey","mauve-magic","custom",
    "premium","premium-pink-cherry","premium-green-vines"
  ];

  function applySettingsToPage(settings) {
    // Background
    document.body.style.backgroundImage = settings.backgroundImage
      ? `url('${settings.backgroundImage}')`
      : "none";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Theme classes
    KNOWN_THEMES.forEach(t => document.body.classList.remove(t));
    if (settings.theme && settings.theme !== "default") {
      document.body.classList.add(settings.theme);
    }

    // Custom vars
    if (settings.colors && settings.theme === "custom") {
      document.body.classList.add("custom");
      document.documentElement.style.setProperty("--custom-bg-color", settings.colors.bgColor);
      document.documentElement.style.setProperty("--custom-text-color", settings.colors.textColor);
      document.documentElement.style.setProperty("--custom-button-color", settings.colors.buttonColor);
      document.documentElement.style.setProperty("--custom-quote-bg", "rgba(0, 0, 0, 0.6)");
    } else {
      document.documentElement.style.removeProperty("--custom-bg-color");
      document.documentElement.style.removeProperty("--custom-text-color");
      document.documentElement.style.removeProperty("--custom-button-color");
      document.documentElement.style.removeProperty("--custom-quote-bg");
    }

    // Dark mode
    document.body.classList.toggle("dark-mode", !!settings.darkMode);
    setModeIcon(!!settings.darkMode);

    // Premium theme packs last
    if (settings.theme === "premium" && settings.premiumThemeId && typeof window.applyPremiumTheme === "function") {
      window.applyPremiumTheme(settings.premiumThemeId);
    }

    // Decorations last
    window.applyDecorationsFromSettings?.();
  }

  function syncCustomSectionVisibility() {
    if (!customSection || !themeSelect) return;
    customSection.style.display = themeSelect.value === "custom" ? "block" : "none";
  }

  function syncDecorationControlsVisibility() {
    if (!decoSelect || !decoControls) return;
    decoControls.style.display = (decoSelect.value === "none") ? "none" : "block";
  }

  // ✅ Live preview + persist for decorations
  function persistAndApplyDecorationsLive() {
    const s = getSettings();
    const decoId = decoSelect?.value || "none";

    if (decoId === "none") {
      s.decorations = { id: "none", enabled: false };
      setSettings(s);
      window.applyDecorationsFromSettings?.();
      return;
    }

    const opacity = Number(decoOpacity?.value || 0.95);
    const thicknessPx = Number(decoThickness?.value || 52);

    s.decorations = {
      id: decoId,
      enabled: true,
      opacity,
      thicknessPx,
    };

    setSettings(s);
    window.applyDecorationsFromSettings?.();
  }

  // INIT
  const initial = getSettings();
  applySettingsToPage(initial);

  // Prefill theme UI
  if (themeSelect) themeSelect.value = initial.theme || "default";
  if (initial.colors) {
    if (bgColorInput) bgColorInput.value = initial.colors.bgColor || "#ffffff";
    if (textColorInput) textColorInput.value = initial.colors.textColor || "#000000";
    if (buttonColorInput) buttonColorInput.value = initial.colors.buttonColor || "#6200ee";
  }
  syncCustomSectionVisibility();

  // Prefill decoration UI
  const deco = initial.decorations || { id: "none", enabled: false, opacity: 0.95, thicknessPx: 52 };
  if (decoSelect) decoSelect.value = deco.id || "none";
  if (decoOpacity) decoOpacity.value = String(deco.opacity ?? 0.95);
  if (decoThickness) decoThickness.value = String(deco.thicknessPx ?? 52);
  syncDecorationControlsVisibility();

  // Tabs
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      tabButtons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.querySelector(`.settings-panel[data-panel="${tab}"]`)?.classList.add("active");
    });
  });

  themeSelect?.addEventListener("change", syncCustomSectionVisibility);

  // Decorations: dropdown changes apply instantly
  decoSelect?.addEventListener("change", () => {
    syncDecorationControlsVisibility();
    persistAndApplyDecorationsLive();
  });

  // Decorations sliders update live
  decoOpacity?.addEventListener("input", persistAndApplyDecorationsLive);
  decoThickness?.addEventListener("input", persistAndApplyDecorationsLive);

  // Dark mode toggle
  modeToggle?.addEventListener("click", () => {
    const s = getSettings();
    s.darkMode = !s.darkMode;
    setSettings(s);
    applySettingsToPage(s);
  });

  // ✅ Make upload & dropdown mutually exclusive (fixes the edge case)
  defaultBg?.addEventListener("change", () => {
    if (bgUpload) bgUpload.value = "";
  });

  bgUpload?.addEventListener("change", () => {
    if (defaultBg) defaultBg.value = "none";
  });

  // Apply button: theme + background only
  applyBtn?.addEventListener("click", () => {
    const s = getSettings();

    // Theme
    const theme = themeSelect?.value || "default";
    s.theme = theme;

    if (theme === "custom") {
      s.colors = {
        bgColor: bgColorInput?.value || "#ffffff",
        textColor: textColorInput?.value || "#000000",
        buttonColor: buttonColorInput?.value || "#6200ee",
      };
    } else {
      s.colors = null;
    }

    // Background
    const file = bgUpload?.files?.[0] || null;
    const selected = defaultBg?.value || "none";

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        s.backgroundImage = e.target?.result || "";
        setSettings(s);
        applySettingsToPage(s);
      };
      reader.readAsDataURL(file);
      return;
    }

    // If no file selected, use dropdown
    if (selected === "none") {
      s.backgroundImage = "";
    } else {
      s.backgroundImage = `assets/backgrounds/${selected}.jpg`;
    }

    // IMPORTANT: clear file input so upload doesn't override next time
    if (bgUpload) bgUpload.value = "";

    setSettings(s);
    applySettingsToPage(s);
  });

  // ===============================
  // SECTION RESETS
  // ===============================

  // Theme reset
  resetThemeBtn?.addEventListener("click", () => {
    const s = getSettings();
    s.theme = "default";
    s.colors = null;

    setSettings(s);

    if (themeSelect) themeSelect.value = "default";
    syncCustomSectionVisibility();

    applySettingsToPage(s);
  });

  // Background reset
  resetBackgroundBtn?.addEventListener("click", () => {
    const s = getSettings();
    s.backgroundImage = "";

    setSettings(s);

    if (defaultBg) defaultBg.value = "none";
    if (bgUpload) bgUpload.value = "";

    applySettingsToPage(s);
  });

  // Decorations reset
  resetDecorationsBtn?.addEventListener("click", () => {
    const s = getSettings();
    s.decorations = { id: "none", enabled: false };

    setSettings(s);

    if (decoSelect) decoSelect.value = "none";
    if (decoOpacity) decoOpacity.value = "0.95";
    if (decoThickness) decoThickness.value = "52";

    syncDecorationControlsVisibility();
    window.applyDecorationsFromSettings?.();
  });
});