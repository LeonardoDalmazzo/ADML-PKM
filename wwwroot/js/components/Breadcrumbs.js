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
        "tecnologia-da-informacao": "Tecnologia da Informacao",
        programacao: "Programacao",
        servicos: "Servicos",
        stakeholders: "Stakeholders",
        conteudos: "Conteudos",
        "git-github": "Git & GitHub",
        "setup-ambiente": "Setup de Ambiente",
        "html-css-fundamentos": "HTML e CSS Fundamentos",
        "javascript-dom": "JavaScript e DOM",
        "javascript-moderno-es6": "JavaScript Moderno ES6+",
        "css-layout-grid": "CSS Layout e Grid",
        "apis-fetch": "APIs e Fetch",
        "react-fundamentos": "React Fundamentos",
        "linguagem-c": "Linguagem C",
        "vscode-shortcuts": "VS Code Shortcuts",
        "como-a-web-funciona": "Como a Web Funciona",
        "microsoft-word": "Microsoft Word",
        "microsoft-excel": "Microsoft Excel",
        "google-sheets": "Google Sheets",
        "linux-basico": "Linux Basico",
        "windows-winget": "Windows e Winget",
        "windows-master-guide": "Windows Master Guide",
        "windows-historia": "Historia do Windows",
        "windows-isos": "Instalacao e ISOs no Windows",
        "windows-ip-estatico": "IP Estatico e DNS no Windows",
        "linux-distros": "Linux Distros",
      };

      const clean = s.replace(/\.html$/i, "");
      if (map[clean]) return map[clean];
      return clean.replace(/[-_]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
    }

    buildTrail() {
      const path = window.location.pathname;
      const segments = path.split("/").filter(Boolean);
      const idxPages = segments.indexOf("pages");
      const rel = idxPages >= 0 ? segments.slice(idxPages + 1) : segments;

      const items = [{ label: "Home", href: `${this.rp}pages/home/home.html` }];
      if (rel.length === 0) return items;

      const hub = rel[0];
      const isHomeRoute = hub === "home" && (rel[1] === "home.html" || rel[1] === "index.html" || rel.length === 1);
      if (isHomeRoute) {
        return [{ label: "Home", href: null, isCurrent: true }];
      }

      if (hub && hub !== "home") {
        items.push({ label: this.pretty(hub), href: `${this.rp}pages/${hub}/index.html` });
      }

      const last = rel[rel.length - 1] || "";
      if (last.endsWith(".html") && rel.includes("conteudos")) {
        items.push({ label: this.pretty(last), href: null, isCurrent: true });
        return items;
      }

      if (last === "index.html") {
        items[items.length - 1] = { label: this.pretty(hub), href: null, isCurrent: true };
        return items;
      }

      items.push({ label: this.pretty(last || hub), href: null, isCurrent: true });
      return items;
    }

    render() {
      const items = this.buildTrail();
      this.rootEl.innerHTML = `
        <div class="breadcrumbs" aria-label="Breadcrumb">
          <div class="bc-location" aria-label="Voce esta aqui">
            ${items
              .map((x, idx) => {
                const sep = idx === 0 ? "" : `<span class="bc-sep" aria-hidden="true">&rsaquo;</span>`;
                if (!x.href || x.isCurrent) return `${sep}<span class="bc-current">${x.label}</span>`;
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

