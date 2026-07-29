# Portfolio rebuild synthesis

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
