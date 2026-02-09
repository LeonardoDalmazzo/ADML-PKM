// wwwroot/js/components/CopyCodeButton.js
(function () {
  class CopyCodeButton {
    constructor({ selector = ".content-article pre" } = {}) {
      this.selector = selector;
      this.init();
    }

    init() {
      const blocks = Array.from(document.querySelectorAll(this.selector));
      blocks.forEach((block) => {
        if (block.querySelector(".code-copy-btn")) return;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "code-copy-btn";
        btn.textContent = "Copiar";

        btn.addEventListener("click", async () => {
          const text = block.innerText || "";
          try {
            await navigator.clipboard.writeText(text);
            btn.textContent = "Copiado";
            setTimeout(() => {
              btn.textContent = "Copiar";
            }, 1200);
          } catch (err) {
            console.error("copy failed", err);
          }
        });

        block.style.position = "relative";
        block.appendChild(btn);
      });
    }
  }

  window.CopyCodeButton = CopyCodeButton;
})();
