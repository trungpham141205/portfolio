<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stages = [
  { code: "SPEC", verb: "DEFINE", detail: "Extract behavior, timing, boundaries, and failure cases." },
  { code: "RTL", verb: "DESCRIBE", detail: "Turn the contract into deterministic registers and combinational paths." },
  { code: "VERIFY", verb: "CHALLENGE", detail: "Exercise behavior, assertions, corner cases, and interfaces." },
  { code: "TIMING", verb: "CLOSE", detail: "Constrain clocks and paths, then resolve setup and hold risk." },
  { code: "SILICON", verb: "COMMIT", detail: "Carry a reviewable design toward implementation confidence." },
] as const;

const root = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const progress = ref(0);
const activeStage = computed(() => stages[activeIndex.value] ?? stages[0]);
let trigger: ScrollTrigger | null = null;

onMounted(() => {
  if (!root.value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  trigger = ScrollTrigger.create({
    trigger: root.value,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.35,
    onUpdate: (self) => {
      progress.value = self.progress;
      activeIndex.value = Math.min(stages.length - 1, Math.floor(self.progress * stages.length));
      root.value?.style.setProperty("--pipeline-progress", self.progress.toFixed(4));
      root.value?.style.setProperty("--wave-scale", (0.45 + self.progress * 0.55).toFixed(4));
    },
  });
});

onBeforeUnmount(() => {
  trigger?.kill();
  trigger = null;
});
</script>

<template>
  <section id="pipeline" ref="root" class="pipeline" aria-labelledby="pipeline-title">
    <div class="pipeline-stage grid">
      <header class="pipeline-header">
        <p>02 / TRANSLATION PIPELINE</p>
        <h2 id="pipeline-title">An idea is not hardware.<br /><span>Until the contract holds.</span></h2>
      </header>

      <div class="pipeline-core" aria-live="polite">
        <div class="pipeline-wave" aria-hidden="true">
          <i></i><i></i><i></i><i></i><i></i>
        </div>
        <p class="pipeline-verb">{{ activeStage.verb }}</p>
        <p class="pipeline-detail">{{ activeStage.detail }}</p>
        <div class="pipeline-readout">
          <span>STAGE / {{ String(activeIndex + 1).padStart(2, "0") }}</span>
          <strong>{{ activeStage.code }}</strong>
          <span>PROGRESS / {{ Math.round(progress * 100).toString().padStart(3, "0") }}</span>
        </div>
      </div>

      <ol class="pipeline-nodes" aria-label="Hardware development pipeline">
        <li v-for="(stage, index) in stages" :key="stage.code" :class="{ active: index <= activeIndex }">
          <i aria-hidden="true"></i>
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          <strong>{{ stage.code }}</strong>
          <p>{{ stage.detail }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.pipeline {
  --pipeline-progress: 0;
  --wave-scale: 0.45;
  position: relative;
  min-height: 180vh;
  color: #fff;
  background: #000;
  border-top: 1px solid #353535;
  border-bottom: 1px solid #353535;

  &-stage {
    position: sticky;
    top: 0;
    min-height: 100vh;
    padding: clamp(92px, 12vh, 150px) var(--space-outer) clamp(72px, 9vh, 110px);
    align-content: space-between;
    row-gap: clamp(24px, 5vh, 56px);
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      opacity: 0.34;
      background:
        linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      background-size: 44px 44px;
      mask-image: radial-gradient(circle at center, #000, transparent 72%);
      pointer-events: none;
    }
  }

  &-header {
    position: relative;
    z-index: 1;
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;

    @include mixins.mq("md") {
      grid-template-columns: 0.35fr 1fr;
      align-items: start;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 12;
    }

    > p {
      color: #8d93cb;
      font: 700 9px/1.5 "Urbanist", sans-serif;
      letter-spacing: 0.18em;
    }

    h2 {
      font-size: clamp(34px, 5.8vw, 84px);
      line-height: 0.93;
      letter-spacing: -0.05em;
      text-transform: uppercase;

      span {
        color: #777;
      }
    }
  }

  &-core {
    position: relative;
    z-index: 1;
    grid-column: 1 / 13;
    min-height: clamp(200px, 30vh, 320px);
    display: grid;
    place-items: center;
    align-content: center;

    @include mixins.mq("lg") {
      grid-column: 2 / 12;
    }
  }

  &-wave {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    opacity: 0.54;

    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #4d4d4d;
    }

    i {
      width: clamp(20px, 4vw, 56px);
      height: clamp(30px, 7vh, 72px);
      border-top: 1px solid #8d93cb;
      border-right: 1px solid #8d93cb;
      transform: skewX(-24deg) scaleY(var(--wave-scale));
      transform-origin: center;
    }
  }

  &-verb {
    position: relative;
    z-index: 2;
    color: #fff;
    font: 900 clamp(54px, 12vw, 168px)/0.78 "Urbanist", sans-serif;
    letter-spacing: -0.065em;
    text-transform: uppercase;
    text-align: center;
    mix-blend-mode: difference;
  }

  &-detail {
    position: relative;
    z-index: 2;
    max-width: 560px;
    margin-top: 22px;
    color: #c6c6c6;
    font-size: clamp(15px, 1.5vw, 20px);
    line-height: 1.45;
    text-align: center;
  }

  &-readout {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 10px;
    border-top: 1px solid #414141;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #686868;
    font: 700 8px/1 "ProFontWindows", monospace;
    letter-spacing: 0.13em;

    strong {
      color: #c7c9df;
      font-size: 11px;
    }
  }

  &-nodes {
    position: relative;
    z-index: 1;
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    border-top: 1px solid #333;

    @include mixins.mq("lg") {
      grid-column: 2 / 12;
    }

    li {
      position: relative;
      min-width: 0;
      padding: 15px 8px 0;
      color: #555;
      display: grid;
      gap: 4px;
      transition: color 0.25s ease;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: -1px;
        height: 1px;
        background: #8d93cb;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.32s ease;
      }

      i {
        position: absolute;
        top: -4px;
        left: 0;
        width: 7px;
        height: 7px;
        border: 1px solid #555;
        border-radius: 50%;
        background: #000;
      }

      span {
        font: 700 8px/1 "ProFontWindows", monospace;
      }

      strong {
        font-size: clamp(8px, 1.1vw, 11px);
        letter-spacing: 0.12em;
      }

      p {
        display: none;
      }

      &.active {
        color: #fff;

        &::before {
          transform: scaleX(1);
        }

        i {
          border-color: #fff;
          background: #8d93cb;
        }
      }
    }
  }
}

@media (max-height: 680px) and (min-width: 840px) {
  .pipeline-stage {
    padding-top: 82px;
    padding-bottom: 38px;
  }

  .pipeline-core {
    min-height: 180px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pipeline {
    min-height: auto;

    &-stage {
      position: relative;
      min-height: auto;
    }

    &-core {
      min-height: 220px;
    }

    &-wave {
      display: none;
    }

    &-nodes {
      grid-template-columns: 1fr;
      border-top: 0;
      gap: 1px;

      li {
        padding: 15px 16px;
        border: 1px solid #333;
        color: #c6c6c6;

        &::before,
        i {
          display: none;
        }

        p {
          display: block;
          max-width: 60ch;
          color: #888;
          font-size: 14px;
          line-height: 1.4;
        }
      }
    }
  }
}
</style>
