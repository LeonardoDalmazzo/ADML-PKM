// pages/Servicos/Servicos.js
document.addEventListener("DOMContentLoaded", () => {
  const buttons = Array.from(document.querySelectorAll(".servico-card__action"));
  const cards = Array.from(document.querySelectorAll(".servico-card"));
  const LI = window.LinkIcon;

  if (LI && cards.length) {
    cards.forEach((card) => {
      const slot = card.querySelector(".servico-card__wpp-slot");
      const title = card.querySelector(".servico-card__title")?.textContent?.trim();
      if (!slot || !title) return;

      const basePreset = LI.getPreset?.("whatsapp");
      if (!basePreset?.href) return;

      const message = `Ola, quero conversar sobre "${title}".`;
      const url = new URL(basePreset.href);
      url.searchParams.set("text", message);

      slot.innerHTML = LI.render({
        ...basePreset,
        href: url.toString(),
        iconOnly: true,
        className: "servico-card__wpp",
        label: `Falar no WhatsApp sobre ${title}`,
      });
    });
  }

  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const card = event.currentTarget.closest(".servico-card");
      const title = card?.querySelector(".servico-card__title")?.textContent?.trim();
      if (!title) return;

      event.preventDefault();
      const baseHref = event.currentTarget.getAttribute("href") || "../contact/formulario.html";
      const url = new URL(baseHref, window.location.href);
      url.searchParams.set("servico", title);
      window.location.href = url.toString();
    });
  });
});
