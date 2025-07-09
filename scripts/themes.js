window.addEventListener("DOMContentLoaded", () => {
  const settings = JSON.parse(localStorage.getItem("quoteAppSettings"));
  const themeSelect = document.getElementById("theme-select");
  const bgColor = document.getElementById("bg-color");
  const textColor = document.getElementById("text-color");
  const buttonColor = document.getElementById("button-color");
  const customColorSection = document.getElementById("custom-color-section");

  // Apply saved theme class
  if (settings?.theme && themeSelect) {
    themeSelect.value = settings.theme;
    document.body.classList.remove(...document.body.classList);
    if (settings.theme !== "default") {
      document.body.classList.add(settings.theme);
    }
  }

  // Apply saved custom colors
  if (settings?.colors && settings.theme === "custom") {
    if (bgColor) bgColor.value = settings.colors.bgColor;
    if (textColor) textColor.value = settings.colors.textColor;
    if (buttonColor) buttonColor.value = settings.colors.buttonColor;
  }

  // Toggle custom color pickers
  function toggleCustomColors() {
    if (themeSelect.value === "custom") {
      customColorSection.style.display = "block";
    } else {
      customColorSection.style.display = "none";
    }
  }

  if (themeSelect && customColorSection) {
    toggleCustomColors();
    themeSelect.addEventListener("change", toggleCustomColors);
  }
});
