// wwwroot/js/components/ScrollTop.js
(function () {
  class ScrollTop {
    constructor({ threshold = 320 } = {}) {
      this.threshold = threshold;
      this.button = null;

      this.render();
      this.bind();
      this.onScroll();
    }

    render() {
      this.button = document.createElement("button");
      this.button.className = "scroll-top";
      this.button.type = "button";
      this.button.setAttribute("aria-label", "Voltar ao topo");

      // SVG (arrow-up)
      this.button.innerHTML = `
        <span class="scroll-top__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M6.5 10.5 12 5l5.5 5.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      `;

      document.body.appendChild(this.button);
    }

    bind() {
      window.addEventListener("scroll", () => this.onScroll(), { passive: true });

      this.button.addEventListener("click", () => {
        const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

        window.scrollTo({
          top: 0,
          behavior: prefersReduced ? "auto" : "smooth",
        });
      });
    }

    onScroll() {
      const shouldShow = window.scrollY > this.threshold;
      this.button.classList.toggle("is-visible", shouldShow);
    }
  }

  window.ScrollTop = ScrollTop;
})();
