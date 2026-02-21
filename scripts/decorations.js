// scripts/decorations.js
(() => {
  const SETTINGS_KEY = "quoteAppSettings";

  // Assets in assets/decorations/ (EDGES ONLY):
  // frame-leafy-top.png
  // frame-leafy-right.png
  // frame-leafy-bottom.png
  // frame-leafy-left.png

  function getSettings() {
    try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; }
    catch { return {}; }
  }

  function setVar(name, value) {
    if (value === undefined || value === null) return;
    document.documentElement.style.setProperty(name, value);
  }

  function ensureDecoLayer() {
    let layer = document.getElementById("deco-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "deco-layer";
      document.body.appendChild(layer);
    }
    return layer;
  }

  function ensureFrameDOM() {
    const layer = ensureDecoLayer();
    let frame = document.getElementById("deco-frame");
    if (frame) return frame;

    frame = document.createElement("div");
    frame.id = "deco-frame";
    frame.innerHTML = `
      <div class="edge top"></div>
      <div class="edge right"></div>
      <div class="edge bottom"></div>
      <div class="edge left"></div>
    `;
    layer.appendChild(frame);
    return frame;
  }

  function clearVars() {
    const root = document.documentElement;
    [
      "--frame-edge-top",
      "--frame-edge-right",
      "--frame-edge-bottom",
      "--frame-edge-left",
      "--frame-opacity",
      "--frame-inset",
      "--frame-thickness",
      "--frame-edge-tile",
    ].forEach((k) => root.style.removeProperty(k));
  }

  function clearFrame() {
    const frame = document.getElementById("deco-frame");
    if (frame) frame.remove();
    clearVars();
  }

  function setFrameImages(basePath = "assets/decorations") {
    const mk = (file) => `url("${new URL(`${basePath}/${file}`, document.baseURI).href}")`;
    setVar("--frame-edge-top", mk("frame-leafy-top.png"));
    setVar("--frame-edge-right", mk("frame-leafy-right.png"));
    setVar("--frame-edge-bottom", mk("frame-leafy-bottom.png"));
    setVar("--frame-edge-left", mk("frame-leafy-left.png"));
  }

  // hidden defaults (not shown in UI)
  const HIDDEN_DEFAULTS = {
    insetPx: 10,
    edgeTilePx: 220,
  };

  // options: { opacity, thicknessPx }
function applyLeafyBorder(options = {}) {
  ensureFrameDOM();
  setFrameImages("assets/decorations");

  const opacity = (typeof options.opacity === "number") ? options.opacity : 0.95;
  const thicknessPx = (typeof options.thicknessPx === "number") ? options.thicknessPx : 52;

  // Your asset is ~2000x200 => ratio ~10:1
  // This keeps the branch looking like the original artwork as it scales
  const ASSET_RATIO = 10;

  // If you want it slightly denser, use 9.0–9.5. For more spaced, use 10.5–11.
  const DENSITY = 10; // try 10 first

  const tile = Math.round(thicknessPx * ASSET_RATIO * (DENSITY / 10));

  // Optional inset scaling (keeps UI from being covered)
  const inset = Math.round(10 + (thicknessPx * 0.10));

  setVar("--frame-opacity", String(opacity));
  setVar("--frame-thickness", `${thicknessPx}px`);
  setVar("--frame-edge-tile", `${tile}px`);
  setVar("--frame-inset", `${inset}px`);
}

  function applyDecorationsFromSettings() {
    const settings = getSettings();
    const deco = settings.decorations || {};

    if (deco.enabled && deco.id === "leafy-frame") {
      applyLeafyBorder({
        opacity: typeof deco.opacity === "number" ? deco.opacity : 0.95,
        thicknessPx: typeof deco.thicknessPx === "number" ? deco.thicknessPx : 52,
      });
    } else {
      clearFrame();
    }
  }

  // expose globals
  window.applyLeafyBorder = applyLeafyBorder;
  window.applyDecorationsFromSettings = applyDecorationsFromSettings;

  document.addEventListener("DOMContentLoaded", applyDecorationsFromSettings);
})();