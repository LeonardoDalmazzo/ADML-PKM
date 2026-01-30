// pages/about/about.js
document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector("#social-row");
  if (!row) return;

  const LI = window.LinkIcon;
  if (!LI) {
    console.warn("LinkIcon não carregou. Confira o import em wwwroot/js/global.js");
    return;
  }

  row.innerHTML = [
    LI.render({
      href: "https://github.com/LeonardoDalmazzo",
      label: "GitHub",
      icon: "github",
      iconOnly: true,
      newTab: true,
    }),
    LI.render({
      href: "https://linkedin.com/in/leonardodalmazzo",
      label: "LinkedIn",
      icon: "linkedin",
      iconOnly: true,
      newTab: true,
    }),
    LI.render({
      href: "https://www.instagram.com/leonardodalmazzo/?igsh=MXJhYTZ5NHcxcXZsYw%3D%3D",
      label: "Instagram",
      icon: "instagram",
      iconOnly: true,
      newTab: true,
    }),
  ].join("");
});
