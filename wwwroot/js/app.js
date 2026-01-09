// wwwroot/js/app.js
(() => {
  function safeMount(fn) {
    try { fn(); } catch (err) { console.error(err); }
  }

  function mountNav() {
    const header = document.querySelector("#app-header");
    if (!header || !window.NavMenu) return;

    new window.NavMenu({
      rootSelector: "#app-header",
      activePage: window.PAGE_ID || "",
    });
  }

  function mountFooter() {
    // Vai funcionar quando você criar o Footer.js (com window.Footer)
    const footer = document.querySelector("#app-footer");
    if (!footer || !window.Footer) return;

    new window.Footer({ rootSelector: "#app-footer" });
  }

  function mountFab() {
    // Vai funcionar quando você criar o FAB component (com window.FloatingMenu)
    if (!window.FloatingMenu) return;
    new window.FloatingMenu();
  }

  document.addEventListener("DOMContentLoaded", () => {
    safeMount(mountNav);
    safeMount(mountFooter);
    safeMount(mountFab);
  });
})();
