const styleSelect = document.getElementById("bg-style");

const bgMap = {
  default: "",
  stars: "Starry Night.jpg",
  bokeh: "Soft Bokeh.jpg",
};

styleSelect.addEventListener("change", function () {
  const selected = this.value;

  if (selected === "default") {
    document.body.style.backgroundImage = "";
    document.body.classList.remove("custom-bg");
  } else {
    const filename = bgMap[selected];
    if (filename) {
      const imagePath = `images/${filename}`;
      document.body.style.backgroundImage = `url('${imagePath}')`;
      document.body.classList.add("custom-bg");
    }
  }
});
