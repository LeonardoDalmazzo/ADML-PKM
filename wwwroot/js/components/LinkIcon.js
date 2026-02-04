// wwwroot/js/components/LinkIcon.js
(function () {
  class LinkIcon {
    static DEFAULT_PRESETS = {
      email: {
        href: "mailto:leonardodalmazzo.dev@gmail.com",
        label: "E-mail",
        icon: "mail",
        newTab: false,
      },
      whatsapp: {
        href: "https://wa.me/5511991795884",
        label: "WhatsApp",
        icon: "whatsapp",
        newTab: true,
      },
      github: {
        href: "https://github.com/LeonardoDalmazzo",
        label: "GitHub",
        icon: "github",
        newTab: true,
      },
      linkedin: {
        href: "https://linkedin.com/in/leonardodalmazzo",
        label: "LinkedIn",
        icon: "linkedin",
        newTab: true,
      },
      instagram: {
        href: "https://www.instagram.com/leonardodalmazzo/?igsh=MXJhYTZ5NHcxcXZsYw%3D%3D",
        label: "Instagram",
        icon: "instagram",
        newTab: true,
      },
      website: {
        href: "https://github.com/LeonardoDalmazzo",
        label: "Website",
        icon: "link",
        newTab: true,
      },
    };

    /**
     * @param {Object} opts
     * @param {string} opts.href
     * @param {string} opts.label  - texto visivel (ou aria-label quando iconOnly)
     * @param {string} opts.icon   - "mail" | "whatsapp" | "github" | "linkedin" | "instagram" | "link"
     * @param {boolean} [opts.newTab=true]
     * @param {string} [opts.className=""]
     * @param {boolean} [opts.iconOnly=false] - true => so icone (sem texto)
     */
    constructor({ href, label, icon = "link", newTab = true, className = "", iconOnly = false } = {}) {
      this.href = href || "#";
      this.label = label || "";
      this.iconName = icon || "link";
      this.newTab = newTab !== false;
      this.className = className;
      this.iconOnly = !!iconOnly;
    }

    static getPresets() {
      const custom = window.LINK_ICON_PRESETS || {};
      return { ...LinkIcon.DEFAULT_PRESETS, ...custom };
    }

    static getPreset(key) {
      const presets = LinkIcon.getPresets();
      const preset = presets[String(key || "").toLowerCase()];
      return preset ? { ...preset } : null;
    }

    static icon(name) {
      const common = `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
      switch ((name || "").toLowerCase()) {
        case "mail":
          return `<svg viewBox="0 0 24 24" aria-hidden="true"><path ${common} d="M4 6h16v12H4z"/><path ${common} d="m4 7 8 6 8-6"/></svg>`;
        case "whatsapp":
          return `<svg viewBox="0 0 24 24" aria-hidden="true"><path ${common} d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.6-4.1A8 8 0 1 1 20 11.5Z"/><path ${common} d="M9.2 9.3c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .6.4l.6 1.4c.1.3.1.5 0 .7l-.4.5c-.1.2-.2.4 0 .7.3.6 1.1 1.7 2.4 2.3.4.2.6.2.8 0l.5-.5c.2-.2.4-.2.7-.1l1.5.6c.4.2.4.4.4.6 0 .8-.4 1.5-1 1.8-.5.3-1.1.4-1.8.2-1.8-.5-3.8-2.3-4.8-3.9-.7-1.1-1.1-2.3-1.1-3.3 0-.7.2-1.3.6-1.8Z"/></svg>`;
        case "github":
          return `<svg viewBox="0 0 24 24" aria-hidden="true"><path ${common} d="M9 19c-4 1.5-4-2-5-2"/><path ${common} d="M15 22v-3.5c0-1 .1-1.4-.5-2 2.2-.2 4.5-1.1 4.5-5a3.9 3.9 0 0 0-1-2.7 3.7 3.7 0 0 0-.1-2.7s-.8-.2-2.9 1.1a10 10 0 0 0-5.2 0C7.7 3.9 6.9 4.1 6.9 4.1a3.7 3.7 0 0 0-.1 2.7 3.9 3.9 0 0 0-1 2.7c0 3.9 2.3 4.8 4.5 5-.4.4-.5.8-.5 1.6V22"/></svg>`;
        case "linkedin":
          return `<svg viewBox="0 0 24 24" aria-hidden="true"><path ${common} d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v2"/><path ${common} d="M2 9h4v12H2z"/><path ${common} d="M4 4a2 2 0 1 0 0 .1"/></svg>`;
        case "instagram":
          return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect ${common} x="4" y="4" width="16" height="16" rx="4"/><path ${common} d="M16 11.4a4 4 0 1 1-7.4 2.2 4 4 0 0 1 7.4-2.2"/><path ${common} d="M17.5 6.5h.01"/></svg>`;
        default:
          return `<svg viewBox="0 0 24 24" aria-hidden="true"><path ${common} d="M10 13a5 5 0 0 0 7.1 0l1.4-1.4a5 5 0 0 0-7.1-7.1L10.5 5"/><path ${common} d="M14 11a5 5 0 0 0-7.1 0L5.5 12.4a5 5 0 0 0 7.1 7.1L13.5 19"/></svg>`;
      }
    }

    toHTML() {
      const isMail = this.href.startsWith("mailto:");
      const isTel = this.href.startsWith("tel:");
      const newTab = this.newTab && !isMail && !isTel;

      const rel = newTab ? ` rel="noopener noreferrer"` : "";
      const target = newTab ? ` target="_blank"` : "";

      const iconOnlyClass = this.iconOnly ? " is-icon-only" : "";
      const ariaLabel = this.label ? ` aria-label="${this.label}"` : "";
      const className = (this.className || "").trim();

      return `
        <a class="link-icon${iconOnlyClass}${className ? ` ${className}` : ""}"
           href="${this.href}"${target}${rel}${this.iconOnly ? ariaLabel : ""}>
          <span class="link-icon__icon" aria-hidden="true">
            ${LinkIcon.icon(this.iconName)}
          </span>
          ${this.iconOnly ? "" : `<span class="link-icon__label">${this.label}</span>`}
        </a>
      `;
    }

    static render(opts) {
      return new LinkIcon(opts).toHTML();
    }

    static renderPreset(key, overrides = {}) {
      const preset = LinkIcon.getPreset(key);
      if (!preset) return "";
      return LinkIcon.render({ ...preset, ...overrides });
    }

    static renderPresets(keys = [], commonOverrides = {}, perKeyOverrides = {}) {
      return (keys || [])
        .map((k) => {
          const key = String(k || "").toLowerCase();
          const itemOverride = perKeyOverrides[key] || {};
          return LinkIcon.renderPreset(key, { ...commonOverrides, ...itemOverride });
        })
        .join("");
    }
  }

  window.LinkIcon = LinkIcon;
})();
