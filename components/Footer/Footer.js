class GlobalFooter {
    constructor() {
        // Pega o ROOT_PATH global ou define como atual
        this.rootPath = window.ROOT_PATH || './';
        this.currentYear = new Date().getFullYear();
        this.init();
    }

    init() {
        // Remove footer existente se houver (para evitar duplicatas)
        const existingFooter = document.querySelector('footer');
        if (existingFooter) existingFooter.remove();

        // Cria o elemento
        const footerElement = document.createElement('footer');
        footerElement.className = 'site-footer';
        footerElement.innerHTML = this.generateHTML();

        // Injeta no final do body (ou dentro do container se preferir)
        // Se usar .container, mude para: document.querySelector('.container').appendChild(footerElement);
        document.body.appendChild(footerElement);
    }

    generateHTML() {
        return `
            <div class="footer-content">
                <div class="footer-col">
                    <h3>ADML: PKM</h3>
                    <p>Uma central de conhecimento pessoal focada em agilidade, referências rápidas e aprendizado contínuo para desenvolvedores.</p>
                </div>

                <div class="footer-col">
                    <h3>Navegação</h3>
                    <ul class="footer-links">
                        <li><a href="${this.rootPath}index.html">Home</a></li>
                        <li><a href="${this.rootPath}about.html">Sobre o Projeto</a></li>
                        <li><a href="${this.rootPath}web_dev/web_dev.html">Web Development</a></li>
                        <li><a href="${this.rootPath}planilhas/planilhas.html">Planilhas</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h3>Conecte-se</h3>
                    <ul class="footer-links">
                        <li><a href="${this.rootPath}contact.html"><i class="fa-regular fa-envelope"></i> Entre em Contato</a></li>
                        <li><a href="https://github.com/LeonardoDalmazzo" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a></li>
                    </ul>
                    
                    <div class="social-links mt-20">
                        <a href="https://github.com/LeonardoDalmazzo" target="_blank" class="social-btn" aria-label="GitHub">
                            <i class="fa-brands fa-github"></i>
                        </a>
                        <a href="#" class="social-btn" aria-label="LinkedIn">
                            <i class="fa-brands fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>
                    © ${this.currentYear} ADML™. Desenvolvido por <span>Leonardo Dalmazzo</span>.
                    <br>Licença MIT - Código Aberto.
                </p>
            </div>
        `;
    }
}

// Inicializa automaticamente
new GlobalFooter();