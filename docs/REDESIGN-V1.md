# Portfolio Redesign V1 — Experience Brief

## Self-authored interview brief

This iteration uses an autonomous brief based on the existing portfolio, its project content, and the requested
direction.

- **Product:** Pham Quoc Trung's Digital IC design portfolio.
- **Audience:** RTL, FPGA, SoC, and verification mentors, recruiters, collaborators, and fellow engineers.
- **Vibe:** precise, cinematic, architectural, quietly ambitious, hardware-native.
- **Reference range:** a spacecraft command deck, a timing waveform, and an editorial engineering journal.
- **Structure:** distinct chapters connected by one continuous signal path.
- **Existing assets:** six RTL/SoC case studies, two live logic labs, code-native diagrams, Three.js scenes, and a
  restrained monochrome/violet design system.
- **Belief at the end:** Trung does not only write HDL; he thinks in specifications, boundaries, interfaces, timing,
  and observable behavior.
- **Primary action:** inspect a case study or start an engineering conversation.
- **Memorable moment:** scrolling a hardware idea through `SPEC → RTL → VERIFY → TIMING → SILICON`.

## Visitor journey and feeling curve

| Beat | Visitor change | Intended feeling | On-screen cause |
| --- | --- | --- | --- |
| Recognition | Meets Trung and his field immediately | Precision | Asymmetric identity lockup and a live clock trace |
| Orientation | Understands how he approaches hardware | Curiosity | Holographic architecture annotations and staged disclosure |
| Translation | Sees an idea become implementation evidence | Awe — **engineered peak** | A pinned, scroll-scrubbed RTL pipeline changes state |
| Substance | Inspects the actual work | Confidence | Alternating case-study lanes with architecture diagrams |
| Agency | Manipulates real behavioral models | Playful control | Verification bench with live ALU vectors, flags, waveform traces, and clock-stepped traffic FSM |
| Commitment | Knows how to continue | Clarity | The motion resolves into one stable contact/uplink state |

## Page grammar

**Selected:** `chaptered-editorial`.

It fits because the natural unit is a technical case study, the content needs strong reading order, and each chapter
can express a different engineering behavior without losing the common visual system. `continuous-world` was the
closest alternative, but it would make the WebGL layer responsible for too much meaning and increase mobile and
fallback fragility. `gallery` was rejected as the dominant grammar because it would flatten About and Lab into the
same project-card rhythm.

## Signature interaction — RTL translation pipeline

- **Trigger:** entering the pinned translation chapter.
- **Input:** vertical scroll position.
- **State transition:** the active stage advances through Spec, RTL, Verify, Timing, and Silicon.
- **Visual response:** the signal trace fills, nodes latch, the central verb changes, and the status readout updates.
- **Narrative purpose:** makes Trung's engineering process tangible instead of describing it as a generic skill list.
- **Mobile fallback:** a shorter sticky stage with horizontally scroll-safe nodes and the same readable state copy.
- **Reduced-motion fallback:** all five stages are visible in a static ordered pipeline with no pinning or pulse.

## Scroll score

| Beat | Device | Scroll span | Desktop | Mobile | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Recognition | Kinetic type + depth | 1 viewport | Layered identity and restrained trace motion | Reflowed lockup | Static identity |
| Orientation | Pin + reveal | 2.5 viewports | Existing 3D/hologram sequence | Flattened annotations | Content visible without reveal |
| Translation | Scrub + live-surface transformation | 1.8 viewports | Sticky five-stage pipeline | Short sticky stage | Static ordered pipeline |
| Substance | Alternating gallery + reveal | Content driven | Wide alternating architecture lanes | Stacked cards | No entrance translation |
| Agency | Pointer/touch response | Content driven | Interactive workbench | Touch-first workbench | State changes remain instant |
| Commitment | Scene cut + resolution | 1 viewport | Stable uplink composition | Single-column CTA | Static final state |

## Design constraints

- Preserve all six project links and the ALU/FSM behavior.
- Preserve visible David Heckhoff and music attribution.
- Preserve `/portfolio/` routing and `dist/404.html` generation.
- Keep real text in the DOM and diagrams code-native.
- Keep the existing black, white, gray, and dusk-violet roles.
- Use transform and opacity for motion and provide `prefers-reduced-motion` fallbacks.
- Keep a protected center stage around every 3D subject; editorial text must resolve before it can obscure the model.
