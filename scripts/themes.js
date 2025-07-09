window.addEventListener("DOMContentLoaded", () => {
  const settings = JSON.parse(localStorage.getItem("quoteAppSettings"));
  if (!settings) return;

  const themeSelect = document.getElementById("theme-select");
  const bgColor = document.getElementById("bg-color");
  const textColor = document.getElementById("text-color");
  const buttonColor = document.getElementById("button-color");

  // Apply theme class visually
  document.body.classList.remove(...document.body.classList);
  if (settings.theme && settings.theme !== "default") {
    document.body.classList.add(settings.theme);
  }

  // Set dropdown to selected theme
  if (themeSelect && settings.theme) {
    themeSelect.value = settings.theme;
  }

  // Only load custom colors if theme is 'custom'
  if (settings.colors && settings.theme === "custom") {
    if (bgColor) bgColor.value = settings.colors.bgColor;
    if (textColor) textColor.value = settings.colors.textColor;
    if (buttonColor) buttonColor.value = settings.colors.buttonColor;
  }
});
const themeSelect = document.getElementById("theme-select");
const customColorSection = document.getElementById("custom-color-section");

function toggleCustomColors() {
  if (themeSelect.value === "custom") {
    customColorSection.style.display = "block";
  } else {
    customColorSection.style.display = "none";
  }
}

if (themeSelect && customColorSection) {
  toggleCustomColors(); // Set on page load
  themeSelect.addEventListener("change", toggleCustomColors); // React to changes
}
