// wwwroot/js/components/ContentNav.js
(function () {
  class ContentNav {
    constructor({
      rootSelector = "#app-contentnav",
      contentSelector = "#content-article",
      toggleButtonSelector = "#toc-toggle",
      title = "Topicos",
      headerOffset = 110,
    } = {}) {
      this.rootEl = document.querySelector(rootSelector);
      if (!this.rootEl) return;

      this.contentEl = document.querySelector(contentSelector);
      if (!this.contentEl) return;

      this.toggleBtn = document.querySelector(toggleButtonSelector);
      this.title = title;
      this.headerOffset = Number(headerOffset) || 110;
      this.isOpen = false;

      this.items = this.scan();
      this.render();
      this.cache();
      this.bind();
      this.highlight();
    }

    scan() {
      const headings = Array.from(this.contentEl.querySelectorAll("h2[id], h3[id]"));
      const items = [];
      let currentH2 = null;

      for (const h of headings) {
        const id = h.id;
        const label = h.textContent.trim();

        if (h.tagName.toLowerCase() === "h2") {
          currentH2 = { id, label, children: [], open: false };
          items.push(currentH2);
        } else {
          if (!currentH2) {
            currentH2 = { id, label: "Secoes", children: [], open: false };
            items.push(currentH2);
          }
          currentH2.children.push({ id, label });
        }
      }

      return items;
    }

    render() {
      const listHtml = this.items
        .map((x) => {
          const subs = (x.children || [])
            .map((c) => `<a class="toc-sub" href="#${c.id}" data-id="${c.id}" data-parent="${x.id}">${c.label}</a>`)
            .join("");

          return `
            <div class="toc-item" data-h2="${x.id}">
              <a class="toc-link" href="#${x.id}" data-id="${x.id}" data-type="h2">
                ${x.label}
                ${subs ? `<span class="toc-caret" aria-hidden="true">▾</span>` : ""}
              </a>
              ${subs ? `<div class="toc-sublist" data-sublist="${x.id}" hidden>${subs}</div>` : ""}
            </div>
          `;
        })
        .join("");

      this.rootEl.innerHTML = `
        <div class="toc-overlay" hidden></div>

        <aside class="toc-drawer" aria-hidden="true" aria-label="Topicos do conteudo">
          <div class="toc-drawer__head">
            <div class="toc-drawer__title">${this.title}</div>
            <button class="toc-close" type="button" aria-label="Fechar topicos">✕</button>
          </div>
          <div class="toc-drawer__body">
            ${listHtml}
          </div>
        </aside>
      `;
    }

    cache() {
      this.overlay = this.rootEl.querySelector(".toc-overlay");
      this.drawer = this.rootEl.querySelector(".toc-drawer");
      this.closeBtn = this.rootEl.querySelector(".toc-close");
    }

    bind() {
      this.toggleBtn?.addEventListener("click", () => this.toggle());
      this.overlay?.addEventListener("click", () => this.close());
      this.closeBtn?.addEventListener("click", () => this.close());

      document.addEventListener("keydown", (e) => {
        if (!this.isOpen) return;
        if (e.key === "Escape") this.close();
      });

      this.drawer?.addEventListener("click", (e) => {
        const a = e.target.closest("[data-id]");
        if (!a) return;

        const id = a.getAttribute("data-id");
        const type = a.getAttribute("data-type");

        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          const y = el.getBoundingClientRect().top + window.scrollY - this.headerOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }

        if (type === "h2") {
          this.toggleSublist(id);
          return;
        }

        this.close();
      });

      window.addEventListener("scroll", () => this.highlight(), { passive: true });
    }

    toggleSublist(h2Id) {
      this.items.forEach((it) => {
        if (it.id !== h2Id) it.open = false;
      });

      const target = this.items.find((it) => it.id === h2Id);
      if (!target) return;
      target.open = !target.open;

      this.items.forEach((it) => {
        const box = this.rootEl.querySelector(`[data-sublist="${it.id}"]`);
        if (!box) return;
        box.hidden = !it.open;
      });
    }

    highlight() {
      let activeId = null;
      const all = this.contentEl.querySelectorAll("h2[id], h3[id]");

      for (const h of all) {
        if (h.getBoundingClientRect().top - this.headerOffset <= 0) activeId = h.id;
      }

      const links = this.rootEl.querySelectorAll("[data-id]");
      links.forEach((a) => {
        a.classList.toggle("is-active", a.getAttribute("data-id") === activeId);
      });

      if (!activeId) return;
      const activeH3 = this.rootEl.querySelector(`.toc-sub[data-id="${activeId}"]`);
      if (!activeH3) return;

      const parent = activeH3.getAttribute("data-parent");
      if (!parent) return;

      const target = this.items.find((it) => it.id === parent);
      if (target && !target.open) {
        target.open = true;
        const box = this.rootEl.querySelector(`[data-sublist="${parent}"]`);
        if (box) box.hidden = false;
      }
    }

    open() {
      if (this.isOpen) return;
      this.isOpen = true;

      if (this.overlay) {
        this.overlay.hidden = false;
        requestAnimationFrame(() => this.overlay.classList.add("is-visible"));
      }

      if (this.drawer) {
        this.drawer.classList.add("is-open");
        this.drawer.setAttribute("aria-hidden", "false");
      }

      document.documentElement.classList.add("toc-open");
      document.body.classList.add("toc-open");

      this.closeBtn?.focus?.();
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;

      if (this.overlay) {
        this.overlay.classList.remove("is-visible");
        setTimeout(() => {
          this.overlay.hidden = true;
        }, 180);
      }

      if (this.drawer) {
        this.drawer.classList.remove("is-open");
        this.drawer.setAttribute("aria-hidden", "true");
      }

      document.documentElement.classList.remove("toc-open");
      document.body.classList.remove("toc-open");

      this.toggleBtn?.focus?.();
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }
  }

  window.ContentNav = ContentNav;
})();
