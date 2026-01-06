# ADML: PKM  
**Personal Knowledge Manager – Frontend Vanilla (Blazor-like Architecture)**

Este projeto é uma aplicação **frontend em HTML, CSS e JavaScript puro**, construída com foco em **manutenibilidade**, **reutilização**, **mobile-first** e **arquitetura modular**, inspirada na organização do **Blazor (wwwroot + páginas isoladas)**.

O objetivo é servir como uma base sólida, escalável e organizada para evolução futura (inclusive migração para Blazor / .NET, se necessário).

---

## 🎯 Princípios do Projeto

Este projeto segue rigorosamente os princípios abaixo:

### 1. Mobile First
- Todo layout nasce pensado para **mobile**.
- Breakpoints são usados apenas para **expandir** o layout.
- Nenhuma regra CSS deve assumir desktop como padrão.

---

### 2. Clean Code
- Código legível > código “curto”.
- Nomes claros e sem abreviações obscuras.
- Evitar duplicação.
- Um arquivo = uma responsabilidade.

---

### 3. Programação Orientada a Objetos (no Frontend)
- Mesmo usando JavaScript puro, os componentes seguem **POO**.
- Cada componente é uma classe responsável por:
  - Criar seu próprio DOM
  - Controlar seu próprio comportamento
- Exemplo: `NavMenu`, `Footer`, `FAB`.

---

### 4. Componentes Reutilizáveis
- Componentes globais ficam em `wwwroot/js/components`.
- Nenhuma página cria menu, footer ou FAB manualmente.
- Páginas apenas **declaram containers**, o sistema monta tudo.

---

### 5. Design Clean e Consistente
- Identidade visual centralizada em **variáveis CSS**.
- Nada de “cores mágicas” ou estilos inline.
- CSS global define o sistema, CSS da página apenas complementa.

---

### 6. HTML, CSS e JS com Máximo de Recursos Nativos
- Sem frameworks (React, Vue, etc).
- Uso de:
  - CSS Grid / Flexbox
  - ES Modules
  - Custom Properties (CSS Variables)
  - Web APIs nativas
- Compatível com GitHub Pages e Live Server.

---

## 🧱 Arquitetura Geral (Blazor-like)

A estrutura do projeto se inspira diretamente no padrão do Blazor:

- `pages/` → Views / Pages
- `wwwroot/` → Assets, CSS e JS globais

---

## 📁 Estrutura de Pastas

```bash
/ (root)
├─ index.html # Redirect / loader (GitHub Pages friendly)
├─ 404.html # (opcional) fallback de rotas
│
├─ pages/ # Páginas (Views)
│ ├─ home/
│ │ ├─ home.html
│ │ ├─ home.css
│ │ └─ home.js # opcional
│ │
│ ├─ pacotes-office/
│ ├─ sistemas-operacionais/
│ ├─ tecnologia-da-informacao/
│ ├─ servicos/
│ └─ parceiros/
│
├─ wwwroot/ # Infraestrutura global (equivalente ao Blazor)
│ ├─ css/
│ │ ├─ reset.css # Reset / normalize
│ │ ├─ variables.css # Design tokens (cores, fontes, spacing, etc)
│ │ ├─ layout.css # Layout global (nav, footer, FAB, containers)
│ │ ├─ utilities.css # Helpers opcionais
│ │ └─ global.css # @import de todos os arquivos acima
│ │
│ ├─ js/
│ │ ├─ core/
│ │ │ └─ paths.js # ROOT_PATH e APP_BASE automáticos
│ │ │
│ │ ├─ components/
│ │ │ ├─ NavMenu.js
│ │ │ ├─ Footer.js
│ │ │ └─ FAB-FloatingActionButton.js
│ │ │
│ │ ├─ app.js # Boot global da aplicação
│ │ └─ global.js # Importa tudo (core + components + app)
│ │
│ ├─ assets/
│ │ ├─ img/
│ │ ├─ icons/
│ │ └─ fonts/
│ │
│ └─ vendor/ # Bibliotecas externas (opcional)
│
└─ README.md
```

---

## 🧩 Padrão de Página (Contrato)

Toda página **DEVE** seguir este padrão mínimo:

```html
<header id="app-header"></header>

<main>
  <!-- Conteúdo da página -->
</main>

<footer id="app-footer"></footer>

<script type="module" src="../../wwwroot/js/global.js"></script>