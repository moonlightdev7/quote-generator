window.addEventListener("DOMContentLoaded", () => {
  const settings = JSON.parse(localStorage.getItem("quoteAppSettings"));
  if (!settings) return;

  if (settings.theme) {
    document.body.className = settings.theme;
    const select = document.getElementById("theme-select");
    if (select) select.value = settings.theme;
  }

  if (settings.colors) {
    document.getElementById("bg-color").value = settings.colors.bgColor;
    document.getElementById("text-color").value = settings.colors.textColor;
    document.getElementById("button-color").value = settings.colors.buttonColor;
  }
});
