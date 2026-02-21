// scripts/settings.js

document.addEventListener("DOMContentLoaded", () => {
  const applyBtn = document.getElementById("apply-btn");
  const resetBtn = document.getElementById("reset-btn");

  // Settings internal tabs
  const tabButtons = document.querySelectorAll(".settings-tab");
  const panels = document.querySelectorAll(".settings-panel");

  // Sun/Moon mode toggle
  const modeToggle = document.getElementById("mode-toggle");
  const modeIcon = document.getElementById("mode-icon");

  function getSettings() {
    return JSON.parse(localStorage.getItem("quoteAppSettings")) || {};
  }

  function setSettings(next) {
    localStorage.setItem("quoteAppSettings", JSON.stringify(next));
  }

  function setModeIcon(isDark) {
    if (!modeIcon) return;
    modeIcon.textContent = isDark ? "🌙" : "☀️";
  }

  function applySettingsToPage(settings) {
    // Background image
    document.body.style.backgroundImage = settings.backgroundImage
      ? `url('${settings.backgroundImage}')`
      : "none";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Reset classes first
    document.body.className = "";

    // Preset theme
    if (settings.theme && settings.theme !== "default") {
      document.body.classList.add(settings.theme);
    }

    // Custom theme
    if (settings.colors && settings.theme === "custom") {
      document.body.classList.add("custom");
      document.documentElement.style.setProperty("--custom-bg-color", settings.colors.bgColor);
      document.documentElement.style.setProperty("--custom-text-color", settings.colors.textColor);
      document.documentElement.style.setProperty("--custom-button-color", settings.colors.buttonColor);
      document.documentElement.style.setProperty("--custom-quote-bg", "rgba(0, 0, 0, 0.6)");
    } else {
      // Clear any custom vars if not using custom theme
      document.documentElement.style.removeProperty("--custom-bg-color");
      document.documentElement.style.removeProperty("--custom-text-color");
      document.documentElement.style.removeProperty("--custom-button-color");
      document.documentElement.style.removeProperty("--custom-quote-bg");
    }

    // Dark mode affects panels/cards UI
    document.body.classList.toggle("dark-mode", !!settings.darkMode);
    setModeIcon(!!settings.darkMode);
  }

  // ✅ Init: apply saved settings to Settings page itself
  applySettingsToPage(getSettings());

  // ✅ Internal tabs (Theme / Background / Account)
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      tabButtons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.querySelector(`.settings-panel[data-panel="${tab}"]`)?.classList.add("active");
    });
  });

  // ✅ Sun/Moon toggle
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      const settings = getSettings();
      const nextDark = !settings.darkMode;

      settings.darkMode = nextDark;
      setSettings(settings);

      // apply immediately (no alerts, no redirect)
      applySettingsToPage(settings);
    });
  }

  // ✅ Apply Changes (silent, no redirect)
  applyBtn?.addEventListener("click", () => {
    const settings = getSettings();

    const theme = document.getElementById("theme-select")?.value || "default";
    const bgColor = document.getElementById("bg-color")?.value || "#ffffff";
    const textColor = document.getElementById("text-color")?.value || "#000000";
    const buttonColor = document.getElementById("button-color")?.value || "#6200ee";

    const file = document.getElementById("bg-upload")?.files?.[0] || null;
    const selected = document.getElementById("default-bg")?.value || "none";

    settings.theme = theme;
    settings.colors = (theme === "custom")
      ? { bgColor, textColor, buttonColor }
      : null;

    // Preserve darkMode + any premium info if you already saved it elsewhere
    // settings.darkMode stays as-is

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        settings.backgroundImage = e.target.result;
        setSettings(settings);
        applySettingsToPage(settings);
      };
      reader.readAsDataURL(file);
    } else {
      settings.backgroundImage = (selected === "none") ? "" : `assets/backgrounds/${selected}.jpg`;
      setSettings(settings);
      applySettingsToPage(settings);
    }
  });

  // ✅ Reset (silent)
  resetBtn?.addEventListener("click", () => {
    // Keep dark mode? Your call.
    // I’m resetting EVERYTHING (theme/background/custom) but keeping darkMode feels nicer.
    const current = getSettings();
    const keepDark = !!current.darkMode;

    const reset = {
      theme: "default",
      colors: null,
      backgroundImage: "",
      darkMode: keepDark
    };

    setSettings(reset);

    // Reset UI controls too
    const themeSelect = document.getElementById("theme-select");
    const defaultBg = document.getElementById("default-bg");
    const bgUpload = document.getElementById("bg-upload");

    if (themeSelect) themeSelect.value = "default";
    if (defaultBg) defaultBg.value = "none";
    if (bgUpload) bgUpload.value = "";

    applySettingsToPage(reset);
  });
});