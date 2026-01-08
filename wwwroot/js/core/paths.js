// wwwroot/js/core/paths.js
(() => {
  const path = window.location.pathname; // ex: /repo/pages/home/home.html
  const segments = path.split("/").filter(Boolean);

  // Detecta base para GitHub Pages (project pages)
  // - Live Server: /index.html -> segments[0] parece arquivo => base "/"
  // - User pages: /pages/... -> segments[0] = "pages" => base "/"
  // - Project pages: /repo/pages/... -> segments[0] = "repo" => base "/repo/"
  let base = "/";
  if (segments.length > 0) {
    const first = segments[0];
    const firstLooksLikeFile = first.includes(".");
    if (!firstLooksLikeFile && first !== "pages") {
      base = "/" + first + "/";
    }
  }

  // internal = parte do path depois da base (sem começar com "/")
  const internal = path.startsWith(base) ? path.slice(base.length) : path.replace(/^\//, "");
  const internalSegments = internal.split("/").filter(Boolean);

  // Remove o arquivo final para calcular profundidade
  const last = internalSegments[internalSegments.length - 1] || "";
  const isFile = last.includes(".");
  const depth = Math.max(0, internalSegments.length - (isFile ? 1 : 0));

  // Ex: internal=pages/home/home.html => depth=2 => ../../
  const rootPath = depth === 0 ? "./" : "../".repeat(depth);

  window.APP_BASE = base;     // "/repo/" ou "/"
  window.ROOT_PATH = rootPath; // "./" ou "../" repetido

  // Helper opcional: monta URL respeitando base
  window.toAppUrl = (relativePath) => {
    const cleaned = String(relativePath || "").replace(/^\/+/, "");
    return window.APP_BASE + cleaned;
  };
})();
