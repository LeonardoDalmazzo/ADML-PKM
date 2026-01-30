// wwwroot/js/components/AutoFilterHub.js
(function () {
  class AutoFilterHub {
    constructor({
      filterRootSelector = "#app-filterbar",
      cardsSelector = ".js-content-card[data-tags]",
      // tags fixas (sempre no começo). Se não existirem nos cards, ainda assim aparecem.
      fixedFilters = ["all", "basico", "intermediario", "avancado"],
      // se true, além das fixas, adiciona TODAS tags encontradas nos cards
      includeDiscoveredTags = true,
      // se quiser limitar as tags auto-descobertas (ex: ["windows","linux","drivers"])
      allowList = null,
      // tags para excluir (ex: ["windows10"])
      denyList = null,
      // ordenação das tags descobertas
      sort = "alpha", // "alpha" | "none"
      // valor inicial
      defaultValue = "all",
      // opcional: callback quando muda
      onChange = null,
      // modo: "hide" usa hidden, "class" usa classe .is-hidden
      mode = "hide",
    } = {}) {
      this.filterRootSelector = filterRootSelector;
      this.cardsSelector = cardsSelector;

      this.fixedFilters = (fixedFilters || []).map(this.norm);
      if (!this.fixedFilters.includes("all")) this.fixedFilters.unshift("all");

      this.includeDiscoveredTags = includeDiscoveredTags;

      this.allowList = Array.isArray(allowList) ? allowList.map(this.norm) : null;
      this.denyList = Array.isArray(denyList) ? denyList.map(this.norm) : null;

      this.sort = sort;
      this.value = this.norm(defaultValue || "all");

      this.onChange = typeof onChange === "function" ? onChange : null;
      this.mode = mode;

      this.rootEl = document.querySelector(this.filterRootSelector);
      if (!this.rootEl) return;

      this.cards = Array.from(document.querySelectorAll(this.cardsSelector));

      // Se não houver cards, ainda renderiza filtros fixos (útil em hubs vazios)
      this.tags = this.buildFiltersList();

      this.render();
      this.cache();
      this.bind();
      this.setActive(this.value);
      this.applyFilter(this.value);
    }

    norm = (s) => String(s || "").trim().toLowerCase();

    getCardTags(cardEl) {
      const raw = cardEl.getAttribute("data-tags") || "";
      const tags = raw
        .split(",")
        .map(this.norm)
        .filter(Boolean);

      // allowList / denyList
      let out = tags;

      if (this.allowList) out = out.filter((t) => this.allowList.includes(t));
      if (this.denyList) out = out.filter((t) => !this.denyList.includes(t));

      return out;
    }

    buildFiltersList() {
      const discovered = new Set();

      for (const card of this.cards) {
        const tags = this.getCardTags(card);
        tags.forEach((t) => discovered.add(t));
      }

      let discoveredList = Array.from(discovered);

      // remove "all" de discovered se existir
      discoveredList = discoveredList.filter((t) => t !== "all");

      if (this.sort === "alpha") discoveredList.sort((a, b) => a.localeCompare(b));

      const fixed = this.fixedFilters.slice(); // clone

      // se incluir discovered, junta evitando duplicatas
      let combined = fixed;
      if (this.includeDiscoveredTags) {
        discoveredList.forEach((t) => {
          if (!combined.includes(t)) combined.push(t);
        });
      }

      // garante default válido
      if (!combined.includes(this.value)) this.value = "all";

      return combined;
    }

    labelFor(value) {
      // Customize rótulos aqui se quiser
      if (value === "all") return "All";
      if (value === "ti") return "TI";

      // Title Case simples com suporte a acentos (mantém como está)
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    render() {
      const buttons = this.tags
        .map(
          (t) => `
            <button class="filter-btn" type="button" data-filter="${t}">
              ${this.labelFor(t)}
            </button>
          `
        )
        .join("");

      this.rootEl.innerHTML = `
        <div class="filterbar" role="toolbar" aria-label="Filtros de conteúdo">
          ${buttons}
        </div>
      `;
    }

    cache() {
      this.buttons = Array.from(this.rootEl.querySelectorAll("[data-filter]"));
    }

    bind() {
      this.rootEl.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-filter]");
        if (!btn) return;

        const next = this.norm(btn.getAttribute("data-filter") || "all");

        this.setActive(next);
        this.applyFilter(next);

        if (this.onChange) this.onChange(next);

        // Evento para integrações (caso queira)
        this.rootEl.dispatchEvent(
          new CustomEvent("filter:change", {
            bubbles: true,
            detail: { value: next },
          })
        );
      });
    }

    setActive(value) {
      this.value = this.norm(value || "all");
      if (!this.tags.includes(this.value)) this.value = "all";

      this.buttons.forEach((b) => {
        const v = this.norm(b.getAttribute("data-filter") || "");
        const isActive = v === this.value;

        b.classList.toggle("is-active", isActive);
        b.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    }

    applyFilter(value) {
      const selected = this.norm(value || "all");

      for (const card of this.cards) {
        const tags = this.getCardTags(card);
        const show = selected === "all" ? true : tags.includes(selected);

        if (this.mode === "class") {
          card.classList.toggle("is-hidden", !show);
        } else {
          card.hidden = !show;
        }
      }
    }
  }

  window.AutoFilterHub = AutoFilterHub;
})();
