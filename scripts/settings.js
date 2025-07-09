// Theme and customization handlers
const themeSelect = document.getElementById("theme-select");
const bgColorInput = document.getElementById("bg-color");
const textColorInput = document.getElementById("text-color");
const buttonColorInput = document.getElementById("button-color");
const bgUpload = document.getElementById("bg-upload");
const defaultBgSelect = document.getElementById("default-bg");
const applyBtn = document.getElementById("apply-btn");

applyBtn.addEventListener("click", () => {
  const selectedTheme = themeSelect.value;
  const customColors = {
    bgColor: bgColorInput.value,
    textColor: textColorInput.value,
    buttonColor: buttonColorInput.value
  };

  const uploadedFile = bgUpload.files[0];
  let backgroundImage = "";

  if (uploadedFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      backgroundImage = e.target.result;
      saveSettings(selectedTheme, customColors, backgroundImage);
    };
    reader.readAsDataURL(uploadedFile);
  } else {
    const defaultBackground = defaultBgSelect.value;
    backgroundImage = `../assets/backgrounds/${defaultBackground}.jpg`;
    saveSettings(selectedTheme, customColors, backgroundImage);
  }
});

function saveSettings(theme, colors, backgroundImage) {
  const settings = {
    theme,
    colors,
    backgroundImage
  };

  localStorage.setItem("quoteAppSettings", JSON.stringify(settings));
  alert("Settings applied! Go back to see the changes.");
}
