window.addEventListener("DOMContentLoaded", () => {
  const settings = JSON.parse(localStorage.getItem("quoteAppSettings"));
  const themeSelect = document.getElementById("theme-select");
  const customColorSection = document.getElementById("custom-color-section");

  // Apply previous theme selection
  if (settings?.theme && themeSelect) {
    themeSelect.value = settings.theme;
  }

  if (settings?.colors && settings.theme === "custom") {
    document.getElementById("bg-color").value = settings.colors.bgColor;
    document.getElementById("text-color").value = settings.colors.textColor;
    document.getElementById("button-color").value = settings.colors.buttonColor;
  }

  // 🔁 Live toggle logic
  function toggleCustomColors() {
    if (themeSelect.value === "custom") {
      customColorSection.style.display = "block";
    } else {
      customColorSection.style.display = "none";
    }
  }

  if (themeSelect && customColorSection) {
    toggleCustomColors(); // on load
    themeSelect.addEventListener("change", toggleCustomColors); // on change
  }
});
