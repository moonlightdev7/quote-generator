const grid = document.getElementById("shop-grid");

function render() {
  grid.innerHTML = "";

  PREMIUM_THEMES.forEach((t) => {
    const unlocked = isUnlocked(t.id);

    const card = document.createElement("div");
    card.className = "pack";

    card.innerHTML = `
      <h3>${t.name} ${unlocked ? `<span class="badge">Unlocked</span>` : ""}</h3>
      <p>${t.description}</p>
      <p><b>$${t.price.toFixed(2)}</b></p>
      <div class="row">
        <button data-action="preview" data-id="${t.id}">Preview</button>
        ${
          unlocked
            ? `<button data-action="apply" data-id="${t.id}">Apply</button>`
            : `<button data-action="unlock" data-id="${t.id}">Unlock (demo)</button>`
        }
      </div>
    `;

    grid.appendChild(card);
  });
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const id = btn.dataset.id;

  if (action === "preview") {
    applyPremiumTheme(id);
    alert("Preview applied! Go to Generator to see it.");
    return;
  }

  if (action === "apply") {
    applyPremiumTheme(id);
    window.location.href = "index.html";
    return;
  }

  if (action === "unlock") {
    // ✅ This is a placeholder so you can test the flow tonight.
    // Later, replace this with PayPal success → unlockTheme(id)
    unlockTheme(id);
    render();
    return;
  }
});

render();