// settings.js
const uploadInput = document.getElementById("bg-upload");
const styleSelect = document.getElementById("bg-style");
const resetBtn = document.getElementById("reset-settings");

uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    localStorage.setItem("customBackground", event.target.result);
  };
  reader.readAsDataURL(file);
});

styleSelect.addEventListener("change", () => {
  localStorage.setItem("bgStyle", styleSelect.value);
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("customBackground");
  localStorage.removeItem("bgStyle");
  alert("Settings reset!");
});
