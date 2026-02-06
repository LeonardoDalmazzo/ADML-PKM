// pages/about/about.js
document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector("#social-row");
  if (!row) return;

  const LI = window.LinkIcon;
  if (!LI) {
    console.warn("LinkIcon nao carregou. Confira o import em wwwroot/js/global.js");
    return;
  }

  row.innerHTML = LI.renderPresets(
    ["github", "linkedin", "instagram"],
    { iconOnly: true }
  );
});
