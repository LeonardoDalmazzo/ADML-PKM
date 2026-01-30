// pages/contact/contact.js
document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector("#contact-actions");
  if (!box) return;

  const LI = window.LinkIcon;
  if (!LI) {
    console.warn("LinkIcon não carregou. Confira o import em wwwroot/js/global.js");
    return;
  }

  box.innerHTML = [
    LI.render({
      href: "mailto:leonardodalmazzo.dev@gmail.com",
      label: "Enviar e-mail",
      icon: "mail",
      newTab: false,
    }),
    LI.render({
      href: "https://wa.me/5511991795884",
      label: "Falar no WhatsApp",
      icon: "whatsapp",
      newTab: true,
    }),
  ].join("");
});
