// Optional: If you want real-time theme preview in the settings page
const themeSelect = document.getElementById("theme-select");

if (themeSelect) {
  themeSelect.addEventListener("change", () => {
    document.body.className = themeSelect.value;
  });
}

// If you want to auto-fill the color inputs with current theme on load
window.addEventListener("DOMContentLoaded", () => {
  const settings = JSON.parse(localStorage.getItem("quoteAppSettings"));
  if (settings && settings.colors) {
    document.getElementById("bg-color").value = settings.colors.bgColor;
    document.getElementById("text-color").value = settings.colors.textColor;
    document.getElementById("button-color").value = settings.colors.buttonColor;
  }

  if (settings && settings.theme) {
    themeSelect.value = settings.theme;
    document.body.className = settings.theme;
  }
});