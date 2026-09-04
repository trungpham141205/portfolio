<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { transitions } from "../../../animations";
import BoxDescription from "./BoxDescription.vue";
import BoxServices from "./BoxServices.vue";
import BoxDetails from "./BoxDetails.vue";
import ProgressCount from "./ProgressCount.vue";
import SectionAtmosphere from "../../../components/SectionAtmosphere.vue";

const contentDescriptionRef = ref<HTMLDivElement | null>(null);
const contentServicesRef = ref<HTMLDivElement | null>(null);
const contentDetailsRef = ref<HTMLDivElement | null>(null);
const contentProgressCountRef = ref<HTMLDivElement | null>(null);
const tlDescriptionRef = ref<gsap.core.Timeline | null>(null);
const tlServicesRef = ref<gsap.core.Timeline | null>(null);
const tlDetailsRef = ref<gsap.core.Timeline | null>(null);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const props = defineProps<{
  spacerRef: HTMLElement | null;
}>();

watchEffect((onInvalidate) => {
  if (prefersReducedMotion) return;
  if (
    props.spacerRef &&
    tlDescriptionRef.value &&
    contentDescriptionRef.value &&
    tlServicesRef.value &&
    contentServicesRef.value &&
    contentDetailsRef.value &&
    tlDetailsRef.value &&
    contentProgressCountRef.value
  ) {
    transitions.about.setup({
      about: props.spacerRef,
      contentDescription: contentDescriptionRef.value,
      tlDescription: tlDescriptionRef.value,
      contentServices: contentServicesRef.value,
      tlServices: tlServicesRef.value,
      contentDetails: contentDetailsRef.value,
      tlDetails: tlDetailsRef.value,
      contentProgressCount: contentProgressCountRef.value,
    });
  }

  onInvalidate(() => {
    transitions.about.destroy();
  });
});
</script>

<template>
  <div class="about-content">
    <SectionAtmosphere variant="about" />
    <header class="about-manifest">
      <p>01 / ARCHITECTURE</p>
      <h2>Think in boundaries.<br /><span>Then write the logic.</span></h2>
      <div>
        <span>SPEC</span><i></i><span>BLOCKS</span><i></i><span>INTERFACES</span><i></i><span>CLOCKS</span>
      </div>
    </header>
    <div class="about-static">
      <article><span>NOW</span><strong>CPU Architecture</strong><p>Datapaths, control paths, and instruction behavior.</p></article>
      <article><span>NEXT</span><strong>SoC Integration</strong><p>Buses, accelerators, cryptography, and system boundaries.</p></article>
      <article><span>TOOLS</span><strong>RTL Practice</strong><p>Verilog, SystemVerilog, Vivado, Questa, synthesis, and STA.</p></article>
    </div>
    <div ref="contentDetailsRef" class="about-details">
      <BoxDetails @timeline:created="(tl: gsap.core.Timeline) => (tlDetailsRef = tl)" />
    </div>
    <div ref="contentDescriptionRef" class="about-description">
      <BoxDescription @timeline:created="(tl: gsap.core.Timeline) => (tlDescriptionRef = tl)" />
    </div>
    <div ref="contentServicesRef" class="about-services">
      <BoxServices @timeline:created="(tl: gsap.core.Timeline) => (tlServicesRef = tl)" />
    </div>
    <div ref="contentProgressCountRef" class="about-progress-count">
      <ProgressCount />
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  &-content {
    position: absolute;
    color: var(--color-text-cyan-400);
    font-family: "ProFontWindows";
    top: 0;
    width: 100%;
    padding: var(--space-outer);
    left: 50%;
    transform: translateX(-50%);
    height: calc(var(--lvh) * 100);

    --count-height: calc(max(calc((var(--lvh) - var(--svh)) * 100), 36px) + var(--space-outer));
  }

  &-details,
  &-description,
  &-services {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    will-change: transform, opacity;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    @include mixins.landscape {
      width: 100%;
      height: 0;
      top: 50%;
    }
  }

  &-manifest {
    position: absolute;
    z-index: 2;
    top: calc(var(--height-header) + 28px);
    left: var(--space-outer);
    max-width: min(460px, calc(100% - var(--space-outer) * 2));
    display: grid;
    gap: 12px;
    pointer-events: none;

    @include mixins.mq("lg") {
      left: calc((100% - min(100%, var(--breakpoint-xxxl))) / 2 + var(--space-outer) + 8.333%);
    }

    > p {
      color: #8d93cb;
      font: 700 9px/1.5 "Urbanist", sans-serif;
      letter-spacing: 0.18em;
    }

    h2 {
      font-family: "Urbanist", sans-serif;
      font-size: clamp(30px, 3.5vw, 52px);
      line-height: 0.95;
      letter-spacing: -0.045em;
      text-transform: uppercase;

      span {
        color: #707070;
      }
    }

    > div {
      display: flex;
      align-items: center;
      gap: 9px;
      color: #686868;
      font: 700 8px/1 "ProFontWindows", monospace;
      letter-spacing: 0.11em;

      i {
        width: 18px;
        height: 1px;
        background: #414141;
      }
    }
  }

  &-progress-count {
    z-index: 1;
    will-change: transform, opacity;
    position: absolute;
    bottom: 0;
    left: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);
  }

  &-static {
    display: none;
  }
}

@media (max-width: 839px) {
  .about-manifest {
    top: 88px;

    > div {
      display: none;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 42px;
  }

  .about-manifest {
    position: relative;
    top: auto;
    left: auto;
  }

  .about-details,
  .about-description,
  .about-services,
  .about-progress-count {
    display: none;
  }

  .about-static {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    article {
      padding: 18px;
      border: 1px solid #414141;
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.56);
      display: grid;
      gap: 9px;
    }

    span {
      color: #8d93cb;
      font: 700 8px/1 "ProFontWindows", monospace;
    }

    strong {
      font-size: 18px;
    }

    p {
      color: #aaa;
      font-size: 14px;
      line-height: 1.45;
    }
  }
}

@media (prefers-reduced-motion: reduce) and (max-width: 839px) {
  .about-static {
    grid-template-columns: 1fr;
  }
}
</style>
