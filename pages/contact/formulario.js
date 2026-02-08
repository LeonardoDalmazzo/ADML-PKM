// pages/contact/formulario.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const feedback = document.querySelector("#form-feedback");
  const nextUrlInput = document.querySelector("#form-next-url");
  const titleInput = document.querySelector('input[name="title"]');
  if (!form || !feedback) return;

  const nextUrl = `${window.location.origin}${window.location.pathname}?enviado=1`;
  if (nextUrlInput) nextUrlInput.value = nextUrl;

  const params = new URLSearchParams(window.location.search);
  const serviceFromUrl = String(params.get("servico") || "").trim();
  const isSent = params.get("enviado") === "1";

  if (serviceFromUrl && titleInput && !titleInput.value.trim()) {
    titleInput.value = serviceFromUrl;
  }

  if (isSent) {
    feedback.textContent = "Mensagem enviada com sucesso. Obrigado pelo contato.";
    feedback.classList.add("is-success");
    feedback.classList.remove("is-error");
  }

  form.addEventListener("submit", () => {
    feedback.textContent = "Enviando mensagem...";
    feedback.classList.remove("is-error");
    feedback.classList.remove("is-success");
  });
});
