const applyBtn = document.getElementById("apply-btn");

applyBtn.addEventListener("click", () => {
  const theme = document.getElementById("theme-select").value;
  const colors = {
    bgColor: document.getElementById("bg-color").value,
    textColor: document.getElementById("text-color").value,
    buttonColor: document.getElementById("button-color").value
  };

  const file = document.getElementById("bg-upload").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      saveSettings(theme, colors, e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    const selected = document.getElementById("default-bg").value;
saveSettings(theme, colors, `assets/backgrounds/${selected}.jpg`);
  }
});

function saveSettings(theme, colors, backgroundImage) {
  const settings = { theme, colors, backgroundImage };
  localStorage.setItem("quoteAppSettings", JSON.stringify(settings));
  alert("Settings applied!");
}
