// wwwroot/js/app.js
(() => {
  const safe = (fn) => {
    try {
      fn();
    } catch (err) {
      console.error("[app.js]", err);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    // 1) Header/Nav (cria também o container do breadcrumbs)
    safe(() => {
      const header = document.querySelector("#app-header");
      if (!header) return;

      if (!window.NavMenu) {
        console.warn("[app.js] NavMenu não carregou. Confira imports em global.js");
        return;
      }

      new window.NavMenu({
        rootSelector: "#app-header",
        activePage: window.PAGE_ID || "",
      });
    });

    // 2) Breadcrumbs (AGORA fica dentro do header)
    safe(() => {
      const bc = document.querySelector("#app-breadcrumbs");
      if (!bc) return;

      if (!window.Breadcrumbs) {
        console.warn("[app.js] Breadcrumbs não carregou. Confira imports em global.js");
        return;
      }

      new window.Breadcrumbs({
        rootSelector: "#app-breadcrumbs",
      });
    });

    // 3) ContentNav / TOC (somente em páginas com #app-contentnav)
    safe(() => {
      const tocRoot = document.querySelector("#app-contentnav");
      if (!tocRoot) return;

      if (!window.ContentNav) {
        console.warn("[app.js] ContentNav não carregou. Confira imports em global.js");
        return;
      }

      new window.ContentNav({
        rootSelector: "#app-contentnav",
        contentSelector: "#content-article",
        toggleButtonSelector: "#toc-toggle",
        title: "Tópicos",
        headerOffset: 110
      });
    });

    // 4) Footer
    safe(() => {
      const footer = document.querySelector("#app-footer");
      if (!footer) return;

      if (!window.Footer) {
        console.warn("[app.js] Footer não carregou. Confira imports em global.js");
        return;
      }

      new window.Footer({
        rootSelector: "#app-footer",
      });
    });

    // Scroll to Top (global)
    if (window.ScrollTop) {
      new window.ScrollTop({
        threshold: 300
      });
    }

    if (window.CopyCodeButton) {
      new window.CopyCodeButton({
        selector: ".content-article pre",
      });
    }

    if (window.AutoFilterHub && document.querySelector("#app-filterbar")) {
      new window.AutoFilterHub({
        filterRootSelector: "#app-filterbar",
        cardsSelector: ".js-content-card[data-tags]",
        fixedLevels: ["all", "introducao", "basico", "intermediario", "avancado"],
        defaultLevel: "all",
        defaultTheme: "all",
      });
    }
  });
})();
