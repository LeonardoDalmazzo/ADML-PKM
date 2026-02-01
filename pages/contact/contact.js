// pages/contact/contact.js
document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector("#contact-actions");
  if (!box) return;

  const LI = window.LinkIcon;
  if (!LI) {
    console.warn("LinkIcon nao carregou. Confira o import em wwwroot/js/global.js");
    return;
  }

  box.innerHTML = LI.renderPresets(
    ["email", "whatsapp", "linkedin", "github"],
    {},
    {
      email: { label: "Enviar e-mail" },
      whatsapp: { label: "Falar no WhatsApp" },
    }
  );
});
