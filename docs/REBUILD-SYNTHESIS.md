# Portfolio rebuild synthesis

## Local cosmic-template enhancement

The post-launch local review branch adds the remaining atmosphere described by `template/DESIGN.md` without changing the engineering contract:

- a procedural Three.js portal with cyan-to-magenta rim light, wireframe emblem, star field and downward particle stream;
- a fixed black-void backdrop with low-opacity aurora, orbital hairlines and slow star drift behind conventional sections;
- template-derived ghost navigation, pill actions, a translucent interface-status panel and a continuous signal ticker;
- frosted Work cards and transparent Work/Lab/Footer surfaces so the cosmic canvas remains visible;
- monochrome/violet UI chrome while reserving richer cyan/magenta light for the rendered scene.
- a true black About render target with restrained violet grid lines, leaving cyan only on the animated hologram;
- viewport-aware orbit, wireframe, particle and sweep variants for About, Work, Lab and Contact.
- rotating faceted wireframe crystals and traveling cyan-to-magenta rim segments behind Work, Lab and Contact only; About is intentionally excluded.

This enhancement remains local until a new explicit approval. The six Work repositories, ALU/FSM behavior, HDL sources, routing fallback and public attribution remain unchanged.

## Source 1 — `template/`

This folder defines the global visual system:

- a pure-black cosmic canvas;
- white, fog and smoke typography;
- `#4d4d4d` hairline borders;
- `#343755` as the single UI accent;
- translucent ghost panels with 5 px, 12 px or pill radii;
- restrained UI motion with the rendered scene carrying the richer color.

## Source 2 — `portfolio-2025/`

This folder defines the experience architecture:

- a full-viewport WebGL scene that remains the visual anchor;
- scroll-linked camera and scene transitions;
- a staged hero/about/work/contact journey;
- project preview cards and animated case-study overlays;
- custom cursor, optional sound and responsive interaction;
- Three.js models, texture materials, shaders and hologram projections.

## Combined direction

The rebuild uses the first source for all UI chrome and the second for interaction, motion and 3D composition. Beige project surfaces and the template author’s project content are not carried into Pham Quoc Trung’s work.

The resulting content order is:

1. Hero / identity and current role
2. WebGL learning-path sequence
3. Six hardware Work case studies
4. Interactive ALU and Traffic FSM Lab
5. Contact and required attribution

## Preserved engineering substance

- Every Work card points to the original hardware repository.
- RV32I, SoC, FSM, sequential and arithmetic learning goals remain intact.
- ALU operations remain AND, OR, XOR and ADD with two 4-bit operands and 5-bit output.
- Traffic FSM remains IDLE 10 ticks → RED 5 → GREEN 5 → YELLOW 3 → RED.
- The Verilog and SystemVerilog examples remain available in the Lab source view.
