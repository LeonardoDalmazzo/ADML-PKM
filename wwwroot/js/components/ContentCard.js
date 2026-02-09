// wwwroot/js/components/ContentCard.js
(function () {
  class ContentCard {
    /**
     * @param {Object} data
     * @param {string} data.title
     * @param {string} data.desc
     * @param {string} data.href
     * @param {string[]} [data.tags]
     * @param {string} [data.cta="Acessar"]
     */
    static render({ title, desc, href, tags = [], cta = "Acessar" } = {}) {
      const safeTitle = title || "Conteúdo";
      const safeDesc = desc || "";
      const safeHref = href || "#";

      const normalizedTags = (tags || [])
        .map(t => String(t).trim().toLowerCase().replace(/\s+/g, "-"))
        .filter(Boolean);

      const tagsAttr = normalizedTags.join(" ");

      return `
        <a class="content-card" href="${safeHref}" data-tags="${tagsAttr}">
          <div class="content-card__body">
            <h2 class="content-card__title">${safeTitle}</h2>
            <p class="content-card__desc">${safeDesc}</p>
          </div>
          <div class="content-card__footer">
            <span class="link-btn">Acessar</span>
          </div>
        </a>
      `;
    }
  }

  window.ContentCard = ContentCard;
})();
