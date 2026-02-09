(function () {
  class FilterBar {
    constructor({
      rootSelector = "#app-filterbar",
      filters = ["all"],
      defaultValue = "all",
      onChange = null, // opcional
    } = {}) {
      this.rootEl = document.querySelector(rootSelector);
      if (!this.rootEl) return;

      this.filters = (filters || []).map((x) => String(x).trim().toLowerCase());
      if (!this.filters.includes("all")) this.filters.unshift("all");

      this.value = String(defaultValue || "all").trim().toLowerCase();
      if (!this.filters.includes(this.value)) this.value = "all";

      this.onChange = typeof onChange === "function" ? onChange : null;

      this.render();
      this.cache();
      this.bind();
      this.setActive(this.value);
    }

    render() {
      const btns = this.filters
        .map(
          (f) => `
            <button class="filter-btn" type="button" data-filter="${f}">
              ${this.labelFor(f)}
            </button>
          `
        )
        .join("");

      this.rootEl.innerHTML = `
        <div class="filterbar" role="toolbar" aria-label="Filtros de conteúdo">
          ${btns}
        </div>
      `;
    }

    labelFor(value) {
      // você pode personalizar rótulos aqui
      if (value === "all") return "All";
      // Title Case simples
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    cache() {
      this.buttons = Array.from(this.rootEl.querySelectorAll("[data-filter]"));
    }

    bind() {
      this.rootEl.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-filter]");
        if (!btn) return;

        const next = String(btn.getAttribute("data-filter") || "all").toLowerCase();
        this.setActive(next);

        // dispara callback (se existir)
        if (this.onChange) this.onChange(next);

        // dispara evento global para a página ouvir (Blazor-like)
        this.rootEl.dispatchEvent(
          new CustomEvent("filter:change", {
            bubbles: true,
            detail: { value: next },
          })
        );
      });
    }

    setActive(value) {
      this.value = String(value || "all").toLowerCase();
      this.buttons.forEach((b) => {
        const v = String(b.getAttribute("data-filter") || "").toLowerCase();
        b.classList.toggle("is-active", v === this.value);
        b.setAttribute("aria-pressed", v === this.value ? "true" : "false");
      });
    }
  }

  window.FilterBar = FilterBar;
})();
