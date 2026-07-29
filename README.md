<div align="center">
  <h1>Digital IC Design Portfolio</h1>
  <p><strong>Interactive RTL, verification, FPGA, CPU, and SoC project portfolio</strong></p>
  <p>
    <a href="https://trungpham141205.github.io/portfolio/">
      <img src="https://img.shields.io/badge/Live%20Site-Open-7C3AED?style=flat-square&logo=googlechrome&logoColor=white" alt="Open live portfolio" />
    </a>
    <img src="https://img.shields.io/badge/React-Interactive%20UI-149ECA?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Vite-Build-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

## Overview

This repository contains the source for Pham Quoc Trung's hardware-engineering portfolio. It presents the progression from foundational RTL blocks to RISC-V and SoC integration, while providing interactive browser-based labs for digital-logic concepts.

The live site is available at [trungpham141205.github.io/portfolio](https://trungpham141205.github.io/portfolio/).

## Portfolio sections

| Section | Content |
|---|---|
| Home | Engineering focus, current direction, and highlighted capabilities |
| Projects | Filterable CPU, SoC, FSM, sequential, and arithmetic project cards |
| Digital Lab | Interactive 4-bit ALU and traffic-light FSM demonstrations |
| About | Skills matrix and learning progression |
| Contact | Direct portfolio contact links |

## Technical implementation

- Single-page React application with client-side view switching.
- Vite development and production build flow.
- Tailwind CSS utility styling plus custom component styles.
- Lucide icon set.
- Responsive desktop sidebar and mobile navigation.
- Browser-only ALU and FSM models for interactive demonstrations.
- GitHub Pages deployment through the `gh-pages` package.

The interactive labs are educational front-end models; they do not compile or simulate the RTL repositories in the browser.

## Run locally

Prerequisites:

- Node.js 18 or later;
- npm.

Install the locked dependency set and start the development server:

```bash
npm ci
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the generated `dist/` directory:

```bash
npm run preview
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

## Repository structure

```text
.
├── index.html
├── src/
│   ├── App.jsx       # Pages, project data, interactive labs, and navigation
│   ├── index.css     # Tailwind entry point
│   └── main.jsx      # React application bootstrap
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Current limitations

- Several project-card URLs are placeholders and should be replaced with their repository links.
- Footer social icons still contain placeholder destinations.
- Project content is embedded directly in `App.jsx`; moving it to structured data would simplify maintenance.
- No automated UI, accessibility, or link-validation tests are included.

## Related links

- [GitHub profile](https://github.com/trungpham141205)
- [RTL and hardware repositories](https://github.com/trungpham141205?tab=repositories)
