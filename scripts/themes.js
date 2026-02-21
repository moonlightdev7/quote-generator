// scripts/themes.js

document.addEventListener("DOMContentLoaded", () => {
  const settings = JSON.parse(localStorage.getItem("quoteAppSettings")) || {};

  const themeSelect = document.getElementById("theme-select");
  const bgColor = document.getElementById("bg-color");
  const textColor = document.getElementById("text-color");
  const buttonColor = document.getElementById("button-color");
  const customColorSection = document.getElementById("custom-color-section");

  const defaultBg = document.getElementById("default-bg");
  const displayName = document.getElementById("display-name");

  // Pre-fill theme
  if (themeSelect && settings.theme) {
    themeSelect.value = settings.theme;
  }

  // Pre-fill custom colors
  if (settings.colors && settings.theme === "custom") {
    if (bgColor) bgColor.value = settings.colors.bgColor || "#ffffff";
    if (textColor) textColor.value = settings.colors.textColor || "#000000";
    if (buttonColor) buttonColor.value = settings.colors.buttonColor || "#6200ee";
  }

  // Pre-fill background dropdown if it matches the default path
  if (defaultBg && settings.backgroundImage) {
    const match = settings.backgroundImage.match(/^assets\/backgrounds\/(.+)\.jpg$/);
    if (match?.[1]) defaultBg.value = match[1];
  }

  // Pre-fill account name (stored separately)
  const account = JSON.parse(localStorage.getItem("quoteAppAccount")) || {};
  if (displayName && typeof account.displayName === "string") {
    displayName.value = account.displayName;
  }

  function toggleCustomColors() {
    if (!themeSelect || !customColorSection) return;
    customColorSection.style.display = (themeSelect.value === "custom") ? "block" : "none";
  }

  if (themeSelect) {
    toggleCustomColors();
    themeSelect.addEventListener("change", toggleCustomColors);
  }
});