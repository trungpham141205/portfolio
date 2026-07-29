---
name: rebuild-cosmic-hardware-portfolio
description: Rebuild, extend, validate, and safely publish Pham Quoc Trung's immersive Digital IC portfolio by combining the local `template/` design system with the `portfolio-2025/` Vue/Three.js experience architecture. Use for portfolio redesigns, Work or Lab updates, WebGL scene changes, GitHub Pages blank-page fixes, local review deployments, and approved GitHub publication while preserving RTL project links, ALU/FSM behavior, source attribution, and the explicit local-approval gate.
---

# Rebuild Cosmic Hardware Portfolio

Treat `template/` and `portfolio-2025/` as read-only references. Rebuild the root application while preserving the engineering meaning of Work and Lab content.

## Apply the source hierarchy

1. Read `template/DESIGN.md`, `template/theme.css`, `template/tokens.json`, and `template/variables.css`.
2. Use `template/` as the authority for UI chrome:
   - black cosmic canvas;
   - white/gray text and `#4d4d4d` hairlines;
   - `#343755` as the restrained UI accent;
   - translucent ghost surfaces;
   - 5 px, 12 px, or pill radii;
   - no decorative gradients or shadows in ordinary UI.
3. Review `portfolio-2025/` at architecture level before editing:
   - Vue/TypeScript structure;
   - Three.js renderer, models, textures, shaders, and camera waypoints;
   - GSAP/Lenis scene transitions;
   - project preview and case-study overlays;
   - optional cursor and audio systems.
4. Use `portfolio-2025/` for interaction, motion, 3D composition, and case-study architecture. Do not present its author’s project content as Trung’s work.
5. Preserve visible attribution to David Heckhoff and `https://david-hckh.com` in source, README, and public output. Preserve `THIRD_PARTY_LICENSE.md`.

## Preserve the engineering contract

Keep these Work repositories and their technical meaning:

- RV32I Single-Cycle CPU — `https://github.com/trungpham141205/RV32I_Single_Cycle`
- SoC RV32I CNN — `https://github.com/trungpham141205/SoC-RV32I-CNN-`
- Traffic Light Controller — `https://github.com/trungpham141205/TRAFFIC_LIGHT_CONTROLLER`
- SIPO 8-bit Register — `https://github.com/trungpham141205/SIPO_8_BIT`
- Carry Lookahead Adder — `https://github.com/trungpham141205/CLA_4_BIT`
- Ripple Carry Adder 32-bit — `https://github.com/trungpham141205/Ripple_Carry_Adder_32bit`

Keep the Lab behaviors:

- ALU: two 4-bit operands; AND, OR, XOR, and ADD; a 5-bit result containing carry and four output bits; source and logic views.
- Traffic FSM: IDLE for 10 ticks, RED for 5, GREEN for 5, YELLOW for 3, then RED; 1 Hz browser clock; reset/pause controls; source and state views.
- Keep the Verilog `alu_4bit` and SystemVerilog `traffic_controller` examples semantically equivalent when refactoring presentation.

Do not replace engineering diagrams with unrelated stock imagery. Prefer code-native SVG/block diagrams for datapaths, buses, FSMs, shift registers, and carry networks.

## Follow the gated workflow

### 1. Audit and synthesize

- Inspect both reference folders and the current root app.
- Check `git status` before editing and preserve unrelated user changes.
- Record the combined direction in `docs/REBUILD-SYNTHESIS.md` when the design changes materially.
- Flag licensing or missing-profile-link constraints before publication.

### 2. Implement locally

- Work on a non-default local branch.
- Keep the reference folders unchanged and exclude the nested `portfolio-2025/` repository from the parent repository.
- Keep root content under `src/content/projects/`.
- Keep Lab behavior in `src/features/home/components/Labs.vue`.
- Keep architecture graphics reusable through `ProjectDiagram.vue`.
- Maintain responsive behavior, reduced-motion handling, keyboard semantics, accessible labels, and optional sound controls.

### 3. Protect GitHub Pages routing

- Keep the Vite base as `/portfolio/`.
- Resolve internal history links through `import.meta.env.BASE_URL`.
- Strip the base before matching logical project routes.
- Create `dist/404.html` from the production `index.html` so direct case-study loads and refreshes recover on GitHub Pages.
- Use asset imports instead of hard-coded root asset URLs.

### 4. Validate before review

Run:

```bash
npm ci
npm run typecheck
npm run build
npm audit
npm run preview -- --host 127.0.0.1 --port 4173
```

Verify at least:

- hero WebGL and About hologram on desktop and mobile;
- all six Work cards and repository links;
- one direct project route under `/portfolio/project/<slug>`;
- ALU initial logic and ADD behavior (`5 + 3 = 8`, output `01000`);
- both HDL source panels;
- Traffic FSM timing, pause, and reset;
- Contact email/GitHub links;
- visible public attribution;
- no console-breaking resource or routing errors.

### 5. Stop for local approval

Keep the production preview running and give the user its URL. Do not commit, push, merge, or deploy until the user explicitly accepts the preview.

Treat requests for refinements as local-only until acceptance is repeated.

### 6. Publish only after acceptance

- Recheck scope and validations.
- Remove generated `dist/` from version control while keeping it ignored; GitHub Actions must build it.
- Commit intentionally on the approved branch.
- Push with upstream tracking.
- Create a pull request into the default branch.
- Merge and deploy only when the user has explicitly authorized the full deployment flow.
- Monitor the GitHub Pages workflow to completion and verify the live URL, assets, project routes, and attribution.
- Report branch, commit, PR, workflow result, and live URL.

Never claim GitHub or production success from a local build alone.
