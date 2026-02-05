// wwwroot/js/components/Footer.js
(function () {
  class Footer {
    constructor({ rootSelector = "#app-footer" } = {}) {
      this.rootSelector = rootSelector;
      this.rootEl = document.querySelector(this.rootSelector);
      if (!this.rootEl) return;

      this.render();
    }

    render() {
      const rp = window.ROOT_PATH || "./";
      const LI = window.LinkIcon;

      const renderLink = (opts) =>
        LI ? LI.render(opts) : `<a class="footer-link" href="${opts.href}">${opts.label}</a>`;

      const navLinks = [
        { href: `${rp}pages/home/home.html`, label: "Home", icon: "link", newTab: false },
        { href: `${rp}pages/about/about.html`, label: "About", icon: "link", newTab: false },
        { href: `${rp}pages/contact/contact.html`, label: "Contact", icon: "link", newTab: false },
      ];

      const hubLinks = [
        { href: `${rp}pages/tecnologia-da-informacao/index.html`, label: "Tecnologia da Informacao", icon: "link", newTab: false },
        { href: `${rp}pages/programacao/index.html`, label: "Programacao", icon: "link", newTab: false },
        { href: `${rp}pages/sistemas-operacionais/index.html`, label: "Sistemas Operacionais", icon: "link", newTab: false },
        { href: `${rp}pages/pacotes-office/index.html`, label: "Pacotes Office", icon: "link", newTab: false },
        { href: `${rp}pages/Servicos/Servicos.html`, label: "Servicos", icon: "link", newTab: false },
        { href: `${rp}pages/stakeholders/index.html`, label: "Stakeholders", icon: "link", newTab: false },
      ];

      const contactFallbackLinks = [
        { href: "mailto:leonardodalmazzo.dev@gmail.com", label: "E-mail", icon: "mail", newTab: false },
        { href: "https://wa.me/5511991795884", label: "WhatsApp", icon: "whatsapp", newTab: true },
        { href: "https://github.com/LeonardoDalmazzo", label: "GitHub", icon: "github", newTab: true },
        { href: "https://linkedin.com/in/leonardodalmazzo", label: "LinkedIn", icon: "linkedin", newTab: true },
        { href: "https://www.instagram.com/leonardodalmazzo/?igsh=MXJhYTZ5NHcxcXZsYw%3D%3D", label: "Instagram", icon: "instagram", newTab: true },
      ];

      const contactLinksHtml = LI?.renderPresets
        ? LI.renderPresets(["email", "whatsapp", "github", "linkedin", "instagram"])
        : contactFallbackLinks.map(renderLink).join("");

      this.rootEl.innerHTML = `
        <div class="app-footer">
          <div class="footer-grid">
            <section class="footer-col">
              <h2 class="footer-title">ADML</h2>
              <p class="footer-desc">
                Hub organizado para estudos, guias e conteudos tecnicos com foco em manutencao, clareza e evolucao continua.
              </p>
            </section>

            <section class="footer-col">
              <h3 class="footer-heading">Navegacao</h3>
              <nav class="footer-links" aria-label="Navegacao do rodape">
                ${navLinks.map(renderLink).join("")}
                <div class="footer-sep" role="separator" aria-hidden="true"></div>
                ${hubLinks.map(renderLink).join("")}
              </nav>
            </section>

            <section class="footer-col">
              <h3 class="footer-heading">Conecte-se</h3>
              <nav class="footer-links" aria-label="Links de contato">
                ${contactLinksHtml}
              </nav>
            </section>
          </div>

          <div class="footer-bottom">
            <p class="footer-copy">
              ©2026 todos os direitos reservados por ADML™. powered by
              <a class="footer-author" href="https://github.com/LeonardoDalmazzo" target="_blank" rel="noopener noreferrer">
                Leonardo Dalmazzo
              </a>.
            </p>
          </div>
        </div>
      `;
    }
  }

  window.Footer = Footer;
})();
