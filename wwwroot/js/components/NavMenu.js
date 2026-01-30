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
      this.ensureClosed(); // ✅ garante estado inicial fechado (desktop/mobile)
      this.bind();
      this.setActive();
    }

    render() {
      const rp = window.ROOT_PATH || "./";
      const showToc = !!window.IS_CONTENT_PAGE;

      this.rootEl.innerHTML = `
        <div class="app-header-2row">
          <!-- Linha 1 -->
          <div class="header-row header-row--top">
            ${showToc ? `
              <button id="toc-toggle" class="nav-toggle toc-toggle" type="button" aria-label="Abrir tópicos">
                <span class="nav-toggle-lines" aria-hidden="true">
                  <span class="line line-1"></span>
                  <span class="line line-2"></span>
                  <span class="line line-3"></span>
                </span>
              </button>
            ` : `<div class="header-spacer"></div>`}

            <div class="nav-brand" aria-label="ADML">ADML</div>

            <button class="menu-dd" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="site-drawer">
              Menu <span class="menu-dd__chev" aria-hidden="true">▾</span>
            </button>
          </div>

          <!-- Linha 2 (Breadcrumbs) -->
          <div class="header-row header-row--crumbs">
            <div id="app-breadcrumbs"></div>
          </div>
        </div>

        <!-- Overlay -->
        <div class="nav-overlay" hidden></div>

        <!-- Drawer do menu do site (Menu ↓) -->
        <aside id="site-drawer" class="nav-drawer" aria-label="Menu" aria-hidden="true">
          <div class="nav-drawer__head">
            <div class="nav-drawer__title">Menu</div>
            <button class="nav-close" type="button" aria-label="Fechar menu">✕</button>
          </div>

          <nav class="nav-drawer-nav">
            <a class="nav-drawer-link" data-page="home" href="${rp}pages/home/home.html">Home</a>
            <a class="nav-drawer-link" data-page="about" href="${rp}pages/about/about.html">About</a>
            <a class="nav-drawer-link" data-page="contact" href="${rp}pages/contact/contact.html">Contact</a>

            <div class="footer-sep" role="separator" aria-hidden="true"></div>

            <a class="nav-drawer-link" href="${rp}pages/pacotes-office/index.html">Pacotes Office</a>
            <a class="nav-drawer-link" href="${rp}pages/sistemas-operacionais/index.html">Sistemas Operacionais</a>
            <a class="nav-drawer-link" href="${rp}pages/tecnologia-da-informacao/index.html">Tecnologia da Informação</a>
            <a class="nav-drawer-link" href="${rp}pages/servicos/index.html">Serviços</a>
            <a class="nav-drawer-link" href="${rp}pages/stakeholders/index.html">Stakeholders</a>
          </nav>
        </aside>
      `;
    }

    cache() {
      // sempre buscar a partir do root do header (evita pegar overlay/drawer de outros componentes)
      this.menuBtn = this.rootEl.querySelector(".menu-dd");
      this.overlay = this.rootEl.querySelector(".nav-overlay") || document.querySelector(".nav-overlay");
      this.drawer = this.rootEl.querySelector(".nav-drawer") || document.querySelector(".nav-drawer");
      this.closeBtn = this.rootEl.querySelector(".nav-close");
    }

    ensureClosed() {
      // ✅ garante que começa fechado (evita “menu sempre aberto” no desktop)
      this.isOpen = false;

      this.menuBtn?.setAttribute("aria-expanded", "false");
      this.drawer?.setAttribute("aria-hidden", "true");
      this.drawer?.classList.remove("is-open"); // compatível com CSS novo

      if (this.overlay) {
        this.overlay.classList.remove("is-visible");
        this.overlay.hidden = true;
      }

      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    }

    bind() {
      this.menuBtn?.addEventListener("click", () => this.toggle());
      this.overlay?.addEventListener("click", () => this.close());
      this.closeBtn?.addEventListener("click", () => this.close());

      document.addEventListener("keydown", (e) => {
        if (!this.isOpen) return;
        if (e.key === "Escape") this.close();
      });

      this.drawer?.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (a) this.close();
      });
    }

    setActive() {
      const links = this.drawer?.querySelectorAll(".nav-drawer-link[data-page]") || [];
      links.forEach((a) => {
        const page = (a.getAttribute("data-page") || "").toLowerCase();
        a.classList.toggle("is-active", page === this.activePage);
      });
    }

    open() {
      if (this.isOpen) return;
      this.isOpen = true;

      this.menuBtn?.setAttribute("aria-expanded", "true");
      this.drawer?.setAttribute("aria-hidden", "false");
      this.drawer?.classList.add("is-open"); // ✅ abre via classe (CSS novo)

      if (this.overlay) {
        this.overlay.hidden = false;
        requestAnimationFrame(() => this.overlay.classList.add("is-visible"));
      }

      document.documentElement.classList.add("no-scroll");
      document.body.classList.add("no-scroll");

      this.closeBtn?.focus?.();
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;

      this.menuBtn?.setAttribute("aria-expanded", "false");
      this.drawer?.setAttribute("aria-hidden", "true");
      this.drawer?.classList.remove("is-open");

      if (this.overlay) {
        this.overlay.classList.remove("is-visible");
        setTimeout(() => (this.overlay.hidden = true), 180);
      }

      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");

      this.menuBtn?.focus?.();
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }
  }

  window.NavMenu = NavMenu;
})();
