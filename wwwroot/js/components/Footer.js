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

      const email = "mailto:leonardodalmazzo.dev@gmail.com";
      const waLink = "https://wa.me/5511991795884";
      const githubLink = "https://github.com/LeonardoDalmazzo";
      const instaLink = "https://www.instagram.com/leonardodalmazzo/?igsh=MXJhYTZ5NHcxcXZsYw%3D%3D";
      const linkedInLink = "https://linkedin.com/in/leonardodalmazzo";

      const LI = window.LinkIcon;

      // fallback simples caso alguém esqueça de importar LinkIcon
      const renderLink = (opts) => (LI ? LI.render(opts) : `<a class="footer-link" href="${opts.href}">${opts.label}</a>`);

      const navLinks = [
        { href: `${rp}pages/home/home.html`, label: "Home", icon: "link", newTab: false },
        { href: `${rp}pages/about/about.html`, label: "About", icon: "link", newTab: false },
        { href: `${rp}pages/contact/contact.html`, label: "Contact", icon: "link", newTab: false },
      ];

      const hubLinks = [
        { href: `${rp}pages/pacotes-office/index.html`, label: "Pacotes Office", icon: "link", newTab: false },
        { href: `${rp}pages/sistemas-operacionais/index.html`, label: "Sistemas Operacionais", icon: "link", newTab: false },
        { href: `${rp}pages/tecnologia-da-informacao/index.html`, label: "Tecnologia da Informação", icon: "link", newTab: false },
        { href: `${rp}pages/servicos/index.html`, label: "Serviços", icon: "link", newTab: false },
        { href: `${rp}pages/stakeholders/index.html`, label: "Stakeholders", icon: "link", newTab: false },
      ];

      const contactLinks = [
        { href: email, label: "E-mail", icon: "mail", newTab: false },
        { href: waLink, label: "WhatsApp", icon: "whatsapp", newTab: true },
        { href: githubLink, label: "GitHub", icon: "github", newTab: true },
        { href: linkedInLink, label: "LinkedIn", icon: "linkedin", newTab: true },
        { href: instaLink, label: "Instagram", icon: "instagram", newTab: true },
      ];

      this.rootEl.innerHTML = `
        <div class="app-footer">
          <div class="footer-grid">
            <!-- Coluna 1 -->
            <section class="footer-col">
              <h2 class="footer-title">ADML</h2>
              <p class="footer-desc">
                Hub organizado para estudos, guias e conteúdos técnicos — com foco em manutenção, clareza e evolução contínua.
              </p>
            </section>

            <!-- Coluna 2 -->
            <section class="footer-col">
              <h3 class="footer-heading">Navegação</h3>
              <nav class="footer-links" aria-label="Navegação do rodapé">
                ${navLinks.map(renderLink).join("")}
                <div class="footer-sep" role="separator" aria-hidden="true"></div>
                ${hubLinks.map(renderLink).join("")}
              </nav>
            </section>

            <!-- Coluna 3 -->
            <section class="footer-col">
              <h3 class="footer-heading">Conecte-se</h3>
              <nav class="footer-links" aria-label="Links de contato">
                ${contactLinks.map(renderLink).join("")}
              </nav>
            </section>
          </div>

          <div class="footer-bottom">
            <p class="footer-copy">
              © 2026 todos os direitos reservados por ADML™. powered by
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
