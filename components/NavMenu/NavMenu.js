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

        // Create Navbar Container
        const navElement = document.createElement('nav');
        navElement.className = 'navbar';

        // Brand
        const brand = document.createElement('a');
        brand.href = 'index.html';
        brand.className = 'navbar-brand';
        brand.textContent = 'ADML: PKM';
        navElement.appendChild(brand);

        // Desktop Menu (Home, About, Contact)
        const desktopMenu = document.createElement('div');
        desktopMenu.className = 'navbar-menu';

        const mainLinks = [
            { name: 'Início', href: 'index.html' },
            { name: 'Sobre', href: 'about.html' },
            { name: 'Contato', href: 'contact.html' }
        ];

        mainLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
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

        // Mobile Sidebar (Cheatsheet items)
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.id = 'mobile-nav';

        const cheatSheets = [
            { name: 'Planilhas', href: 'planilhas.html' }
        ];

        // Also add Home/About/Contact to mobile nav for completeness on small screens
        const allLinks = [...mainLinks, ...cheatSheets];

        allLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
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
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.navbar-menu a, .mobile-nav a');

        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }
}
