// settings.js
const styleSelect = document.getElementById("bg-style");

styleSelect.addEventListener("change", function () {
  const selected = this.value;

  if (selected === "default") {
    document.body.style.backgroundImage = "";
    document.body.classList.remove("custom-bg");
  } else {
    const imagePath = `images/${selected}.jpg`; // make sure the name matches the dropdown value
    document.body.style.backgroundImage = `url('${imagePath}')`;
    document.body.classList.add("custom-bg");
  }
});
