// wwwroot/js/components/NavMenu.js
(function () {
  class NavMenu {
    constructor({ rootSelector = "#app-header", activePage = "home" } = {}) {
      this.rootSelector = rootSelector;
      this.activePage = (activePage || "").toLowerCase();

      this.rootEl = document.querySelector(this.rootSelector);
      if (!this.rootEl) return;

      this.isOpen = false;

      this.render();
      this.cache();
      this.bind();
      this.setActive();
    }

    render() {
      this.rootEl.innerHTML = `
        <div class="app-header">
          <button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav-drawer">
            <span class="nav-toggle-lines" aria-hidden="true">
              <span class="line line-1"></span>
              <span class="line line-2"></span>
              <span class="line line-3"></span>
            </span>
          </button>

          <div class="nav-brand" aria-label="ADML">ADML</div>

          <nav class="nav-desktop" aria-label="Navegação principal">
            <a class="nav-link" data-page="home" href="${window.ROOT_PATH || "./"}pages/home/home.html">Home</a>
            <a class="nav-link" data-page="about" href="${window.ROOT_PATH || "./"}pages/about/index.html">About</a>
            <a class="nav-link" data-page="contact" href="${window.ROOT_PATH || "./"}pages/contact/index.html">Contact</a>
          </nav>
        </div>

        <div class="nav-overlay" hidden></div>

        <aside id="nav-drawer" class="nav-drawer" aria-label="Menu" aria-hidden="true">
          <nav class="nav-drawer-nav">
            <a class="nav-drawer-link" data-page="home" href="${window.ROOT_PATH || "./"}pages/home/home.html">Home</a>
            <a class="nav-drawer-link" data-page="about" href="${window.ROOT_PATH || "./"}pages/about/index.html">About</a>
            <a class="nav-drawer-link" data-page="contact" href="${window.ROOT_PATH || "./"}pages/contact/index.html">Contact</a>
          </nav>
        </aside>
      `;
    }

    cache() {
      this.btn = this.rootEl.querySelector(".nav-toggle");
      this.overlay = this.rootEl.querySelector(".nav-overlay");
      this.drawer = this.rootEl.querySelector(".nav-drawer");
    }

    bind() {
      this.btn?.addEventListener("click", () => this.toggle());

      this.overlay?.addEventListener("click", () => this.close());

      document.addEventListener("keydown", (e) => {
        if (!this.isOpen) return;
        if (e.key === "Escape") this.close();
      });

      // Fecha ao clicar em um item (mobile UX)
      this.drawer?.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (a) this.close();
      });
    }

    setActive() {
      const set = (selector) => {
        const links = this.rootEl.querySelectorAll(selector);
        links.forEach((a) => {
          const page = (a.getAttribute("data-page") || "").toLowerCase();
          a.classList.toggle("is-active", page === this.activePage);
          if (page === this.activePage) a.setAttribute("aria-current", "page");
          else a.removeAttribute("aria-current");
        });
      };

      set(".nav-link");
      set(".nav-drawer-link");
    }

    open() {
      if (this.isOpen) return;
      this.isOpen = true;

      this.btn?.setAttribute("aria-expanded", "true");
      this.btn?.setAttribute("aria-label", "Fechar menu");
      this.drawer?.setAttribute("aria-hidden", "false");
      this.rootEl.classList.add("nav-is-open");

      if (this.overlay) {
        this.overlay.hidden = false;
        requestAnimationFrame(() => this.overlay.classList.add("is-visible"));
      }

      document.documentElement.classList.add("no-scroll");
      document.body.classList.add("no-scroll");
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;

      this.btn?.setAttribute("aria-expanded", "false");
      this.btn?.setAttribute("aria-label", "Abrir menu");
      this.drawer?.setAttribute("aria-hidden", "true");
      this.rootEl.classList.remove("nav-is-open");

      if (this.overlay) {
        this.overlay.classList.remove("is-visible");
        // espera a transição para esconder de verdade
        setTimeout(() => (this.overlay.hidden = true), 180);
      }

      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }
  }

  window.NavMenu = NavMenu;
})();
