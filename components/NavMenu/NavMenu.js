class Navbar {
    constructor() {
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
        this.highlightActive();
    }

    render() {
        const body = document.body;
        // Pega o caminho definido no HTML ou usa vazio (se estiver na raiz)
        const root = window.ROOT_PATH || ''; 

        // Create Navbar Container
        const navElement = document.createElement('nav');
        navElement.className = 'navbar';

        // Brand
        const brand = document.createElement('a');
        brand.href = root + 'index.html'; // Adiciona o prefixo root
        brand.className = 'navbar-brand';
        brand.textContent = 'ADML: PKM';
        navElement.appendChild(brand);

        // Desktop Menu
        const desktopMenu = document.createElement('div');
        desktopMenu.className = 'navbar-menu';

        // Atualizei os links para incluir as pastas novas
        const mainLinks = [
            { name: 'Início', href: 'index.html' },
            { name: 'Sobre', href: 'about.html' },
            { name: 'Contato', href: 'contact.html' }
        ];

        mainLinks.forEach(link => {
            const a = document.createElement('a');
            // Se for link externo ou âncora, não mexe. Se não, adiciona root.
            if (link.href.startsWith('http') || link.href.startsWith('#')) {
                a.href = link.href;
            } else {
                a.href = root + link.href;
            }
            a.textContent = link.name;
            desktopMenu.appendChild(a);
        });
        navElement.appendChild(desktopMenu);

        // Hamburger Button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.id = 'hamburger-btn';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        navElement.appendChild(hamburger);

        body.prepend(navElement);

        // Mobile Sidebar
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.id = 'mobile-nav';

        const cheatSheets = [
            { name: 'Planilhas', href: 'planilhas/planilhas.html' },
            { name: 'Web Dev', href: 'web_dev/web_dev.html' } 
        ];

        const allLinks = [...mainLinks, ...cheatSheets];

        allLinks.forEach(link => {
            const a = document.createElement('a');
            if (link.href.startsWith('http') || link.href.startsWith('#')) {
                a.href = link.href;
            } else {
                a.href = root + link.href;
            }
            a.textContent = link.name;
            mobileNav.appendChild(a);
        });

        body.appendChild(mobileNav);

        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        overlay.id = 'mobile-overlay';
        body.appendChild(overlay);
    }

    bindEvents() {
        const btn = document.getElementById('hamburger-btn');
        const nav = document.getElementById('mobile-nav');
        const overlay = document.getElementById('mobile-overlay');

        const toggleMenu = () => {
            const isOpen = btn.classList.contains('open');
            if (isOpen) {
                btn.classList.remove('open');
                nav.classList.remove('active');
                overlay.classList.remove('active');
            } else {
                btn.classList.add('open');
                nav.classList.add('active');
                overlay.classList.add('active');
            }
        };

        btn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    highlightActive() {
        // Pega apenas o nome do arquivo atual (ex: 'index.html' ou 'planilhas.html')
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.navbar-menu a, .mobile-nav a');

        links.forEach(link => {
            // Compara se o href do link termina com o arquivo atual
            // Isso evita problemas com o prefixo '../'
            if (link.getAttribute('href').endsWith(currentPath)) {
                link.classList.add('active');
            }
        });
    }
}