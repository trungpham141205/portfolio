# Pham Quoc Trung — Digital IC Design Portfolio

An immersive portfolio for RTL, FPGA, RISC-V and SoC work. The site combines a scroll-driven Three.js scene with six hardware case studies and two interactive digital-logic labs.

Live site: [trungpham141205.github.io/portfolio](https://trungpham141205.github.io/portfolio/).

## Portfolio content

- RV32I Single-Cycle CPU
- SoC RV32I CNN
- Traffic Light Controller
- SIPO 8-bit Register
- Carry Lookahead Adder
- Ripple Carry Adder 32-bit
- Interactive 4-bit ALU lab with source/logic views
- Interactive four-state Traffic FSM with source/logic views

The browser labs are educational behavioral models. They preserve the original operations, state timing and HDL source presentation, but do not compile the linked repositories in the browser.

## Stack

- Vue 3 and TypeScript
- Vite with a GitHub Pages base path
- Three.js and GLSL for the full-viewport scene
- GSAP and Lenis for scroll-linked motion
- Howler for optional ambient sound
- SCSS for the design system and responsive layouts

## Local review flow

```bash
npm ci
npm run typecheck
npm run build
npm run preview
```

Open `http://localhost:4173/portfolio/`.

The production build also creates `dist/404.html`. This lets GitHub Pages restore client-side project routes on direct load or refresh instead of displaying a blank/404 page.

## Content structure

```text
src/
├── content/projects/          # Hardware case-study data and repository links
├── features/home/components/ # Hero, 3D about flow, Work, Lab and Contact
├── features/projects/        # Work cards, diagrams and detail overlays
├── three/                    # Scene, models, shaders and scroll-driven camera
└── assets/styles/            # Cosmic UI tokens and responsive global styles
```

## Design sources and attribution

The UI system follows the local `template/DESIGN.md`: black void, monochrome ghost UI, hairline borders, restrained dusk-violet accents and scene-led motion.

The experience architecture, 3D scene, models, shaders, interaction patterns and substantial source portions are adapted from David Heckhoff’s Portfolio 2025. Original work: [david-hckh.com](https://david-hckh.com).

That source is licensed for personal and educational use with required attribution. Commercial use or redistribution of substantial portions requires the original author’s permission. See [THIRD_PARTY_LICENSE.md](./THIRD_PARTY_LICENSE.md).

## Reusable workflow

The review, rebuild, validation and approval-gated publishing process is captured in [`skills/rebuild-cosmic-hardware-portfolio/SKILL.md`](./skills/rebuild-cosmic-hardware-portfolio/SKILL.md) for future Codex sessions.

## Contact

- Email: [pquoctrung141205@gmail.com](mailto:pquoctrung141205@gmail.com)
- GitHub: [trungpham141205](https://github.com/trungpham141205)
