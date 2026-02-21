// ✅ Auto-highlight active top tab based on current page
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".top-tabs a");

  links.forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href === path) a.classList.add("active");
    else a.classList.remove("active");
  });
});