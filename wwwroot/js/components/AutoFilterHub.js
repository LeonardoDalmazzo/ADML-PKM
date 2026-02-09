// wwwroot/js/components/AutoFilterHub.js
(function () {
  class AutoFilterHub {
    constructor({
      filterRootSelector = "#app-filterbar",
      cardsSelector = ".js-content-card[data-tags]",
      fixedLevels = ["all", "introducao", "basico", "intermediario", "avancado"],
      defaultLevel = "all",
      defaultTheme = "all",
      onChange = null,
      mode = "hide",
    } = {}) {
      this.filterRootSelector = filterRootSelector;
      this.cardsSelector = cardsSelector;
      this.fixedLevels = Array.from(new Set((fixedLevels || []).map(this.norm)));
      if (!this.fixedLevels.includes("all")) this.fixedLevels.unshift("all");

      this.levelValue = this.norm(defaultLevel || "all");
      this.themeValue = this.norm(defaultTheme || "all");
      this.mode = mode;
      this.onChange = typeof onChange === "function" ? onChange : null;

      this.rootEl = document.querySelector(this.filterRootSelector);
      if (!this.rootEl) return;

      this.cards = Array.from(document.querySelectorAll(this.cardsSelector));
      this.themeOptions = this.buildThemeList();

      if (!this.fixedLevels.includes(this.levelValue)) this.levelValue = "all";
      if (!this.themeOptions.includes(this.themeValue)) this.themeValue = "all";

      this.render();
      this.cache();
      this.bind();
      this.applyFilter();
    }

    norm = (s) => String(s || "").trim().toLowerCase();

    getCardTags(cardEl) {
      const raw = cardEl.getAttribute("data-tags") || "";
      return raw
        .split(",")
        .map(this.norm)
        .filter(Boolean);
    }

    buildThemeList() {
      const discovered = new Set();

      for (const card of this.cards) {
        this.getCardTags(card)
          .filter((tag) => !this.fixedLevels.includes(tag))
          .forEach((tag) => discovered.add(tag));
      }

      return ["all", ...Array.from(discovered).sort((a, b) => a.localeCompare(b))];
    }

    labelFor(value) {
      const v = this.norm(value);
      if (v === "all") return "Todos";
      if (v === "ti") return "TI";
      if (v === "introducao") return "Introducao";
      return v.charAt(0).toUpperCase() + v.slice(1);
    }

    renderSelectOptions(values) {
      return values
        .map((value) => `<option value="${value}">${this.labelFor(value)}</option>`)
        .join("");
    }

    render() {
      this.rootEl.innerHTML = `
        <div class="filterbar-wrap">
          <button class="filter-toggle" type="button" aria-expanded="false">Filtros</button>

          <div class="filter-panel" hidden>
            <label class="filter-field">
              <span class="filter-field__label">Nivel</span>
              <select class="filter-select" data-filter-kind="level">
                ${this.renderSelectOptions(this.fixedLevels)}
              </select>
            </label>

            <label class="filter-field">
              <span class="filter-field__label">Tema</span>
              <select class="filter-select" data-filter-kind="theme">
                ${this.renderSelectOptions(this.themeOptions)}
              </select>
            </label>
          </div>
        </div>
      `;
    }

    cache() {
      this.toggleBtn = this.rootEl.querySelector(".filter-toggle");
      this.panel = this.rootEl.querySelector(".filter-panel");
      this.levelSelect = this.rootEl.querySelector('[data-filter-kind="level"]');
      this.themeSelect = this.rootEl.querySelector('[data-filter-kind="theme"]');

      if (this.levelSelect) this.levelSelect.value = this.levelValue;
      if (this.themeSelect) this.themeSelect.value = this.themeValue;
    }

    bind() {
      this.toggleBtn?.addEventListener("click", () => {
        const isHidden = this.panel?.hasAttribute("hidden");
        if (!this.panel) return;

        if (isHidden) {
          this.panel.removeAttribute("hidden");
          this.toggleBtn.setAttribute("aria-expanded", "true");
        } else {
          this.panel.setAttribute("hidden", "");
          this.toggleBtn.setAttribute("aria-expanded", "false");
        }
      });

      this.levelSelect?.addEventListener("change", (e) => {
        this.levelValue = this.norm(e.target.value || "all");
        this.applyFilter();
      });

      this.themeSelect?.addEventListener("change", (e) => {
        this.themeValue = this.norm(e.target.value || "all");
        this.applyFilter();
      });
    }

    applyFilter() {
      for (const card of this.cards) {
        const tags = this.getCardTags(card);

        const levelOk = this.levelValue === "all" ? true : tags.includes(this.levelValue);
        const themeOk = this.themeValue === "all" ? true : tags.includes(this.themeValue);
        const show = levelOk && themeOk;

        if (this.mode === "class") card.classList.toggle("is-hidden", !show);
        else card.hidden = !show;
      }

      const detail = { level: this.levelValue, theme: this.themeValue };
      if (this.onChange) this.onChange(detail);

      this.rootEl.dispatchEvent(
        new CustomEvent("filter:change", {
          bubbles: true,
          detail,
        })
      );
    }
  }

  window.AutoFilterHub = AutoFilterHub;
})();
