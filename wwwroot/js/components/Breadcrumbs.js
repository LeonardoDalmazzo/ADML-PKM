// wwwroot/js/components/Breadcrumbs.js
(function () {
  class Breadcrumbs {
    constructor({ rootSelector = "#app-breadcrumbs" } = {}) {
      this.rootEl = document.querySelector(rootSelector);
      if (!this.rootEl) return;

      this.rp = window.ROOT_PATH || "./";
      this.render();
    }

    pretty(segment) {
      const s = String(segment || "").trim();
      const map = {
        home: "Home",
        about: "About",
        contact: "Contact",
        "sistemas-operacionais": "Sistemas Operacionais",
        "pacotes-office": "Pacotes Office",
        "tecnologia-da-informacao": "Tecnologia da Informação",
        servicos: "Serviços",
        stakeholders: "Stakeholders",
        conteudos: "Conteúdos",
      };

      const clean = s.replace(/\.html$/i, "");
      if (map[clean]) return map[clean];

      return clean
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());
    }

    buildTrail() {
      const path = window.location.pathname;
      const segments = path.split("/").filter(Boolean);

      // Remove base do repo (GitHub Pages) se existir
      const idxPages = segments.indexOf("pages");
      const rel = idxPages >= 0 ? segments.slice(idxPages + 1) : segments;

      const items = [];
      items.push({ label: "Home", href: `${this.rp}pages/home/home.html` });

      // pages/<hub>/index.html  |  pages/<page>/<page>.html  | pages/<hub>/conteudos/<file>.html
      // Vamos adicionar migalhas até o arquivo final, sem link no último.
      if (rel.length === 0) return items;

      // Ex: ["sistemas-operacionais","conteudos","drivers.html"]
      const hub = rel[0];
      if (hub && hub !== "home") {
        // Hub sempre vira link para index.html
        items.push({ label: this.pretty(hub), href: `${this.rp}pages/${hub}/index.html` });
      }

      // Se for página base (about/about.html ou contact/contact.html)
      // rel = ["about","about.html"]
      if (rel.length === 2 && rel[1].endsWith(".html") && rel[1].replace(".html", "") === rel[0]) {
        items[items.length - 1] = { label: this.pretty(rel[0]), href: null, isCurrent: true };
        return items;
      }

      // Se existir pasta conteudos e arquivo final
      const last = rel[rel.length - 1] || "";
      if (last.endsWith(".html") && rel.includes("conteudos")) {
        items.push({ label: this.pretty(last), href: null, isCurrent: true });
        return items;
      }

      // Se for index.html de hub
      if (last === "index.html") {
        // o item de hub já existe acima; torna ele current
        items[items.length - 1] = { label: this.pretty(hub), href: null, isCurrent: true };
        return items;
      }

      // fallback: último segmento como current
      items.push({ label: this.pretty(last || hub), href: null, isCurrent: true });
      return items;
    }

    render() {
      const items = this.buildTrail();

      this.rootEl.innerHTML = `
        <div class="breadcrumbs" aria-label="Breadcrumb">
          <div class="bc-location" aria-label="Você está aqui">
            ${items
              .map((x, idx) => {
                const sep = idx === 0 ? "" : `<span class="bc-sep" aria-hidden="true">›</span>`;
                if (!x.href || x.isCurrent) {
                  return `${sep}<span class="bc-current">${x.label}</span>`;
                }
                return `${sep}<a class="bc-link" href="${x.href}">${x.label}</a>`;
              })
              .join("")}
          </div>
        </div>
      `;
    }
  }

  window.Breadcrumbs = Breadcrumbs;
})();
