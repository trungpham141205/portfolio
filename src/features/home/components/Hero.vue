<script setup lang="ts">
import { preloaderVisible } from "../../../composables/usePreloader";
import { t } from "../../../i18n/utils/translate";
import { lenis } from "../../../composables/useScroll";

const scrollTo = (target: string) => {
  lenis.value?.scrollTo(target);
};
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-frame" aria-hidden="true">
      <span>CLK / 100 MHZ</span>
      <span>MODE / LEARN + BUILD</span>
      <span>LOC / HO CHI MINH CITY</span>
      <span>PORTFOLIO / 2026</span>
    </div>

    <div class="hero-grid grid">
      <div class="hero-identity" id="hero-content-inner">
        <div class="hero-kicker">
          <span><i></i> SIGNAL LOCKED</span>
          <span>DIGITAL IC / RTL</span>
        </div>
        <h1 id="hero-title" class="hero-title">
          <span>Pham Quoc</span>
          <span>Trung</span>
        </h1>
        <div class="hero-role" v-if="!preloaderVisible">
          <span>RTL</span>
          <span>{{ t("job-title") || "Digital IC Design Learner" }}</span>
        </div>
      </div>

      <aside class="hero-thesis">
        <span class="hero-thesis-index">00 / IDENTITY</span>
        <p>I translate specifications into deterministic hardware behavior.</p>
        <div class="hero-thesis-stack">
          <span>VERILOG</span><span>SYSTEMVERILOG</span><span>RISC-V</span><span>FPGA</span>
        </div>
        <div class="hero-actions" v-if="!preloaderVisible">
          <button class="hero-action hero-action-primary" type="button" @click="scrollTo('#projects')">
            Inspect work
          </button>
          <button class="hero-action hero-action-ghost" type="button" @click="scrollTo('#pipeline')">
            See process
          </button>
        </div>
      </aside>
    </div>

    <div class="hero-clock" aria-hidden="true">
      <div><span>0</span><span>20 ns</span><span>40 ns</span><span>60 ns</span><span>80 ns</span></div>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
        <polyline points="0,60 90,60 90,16 220,16 220,60 350,60 350,16 480,16 480,60 610,60 610,16 740,16 740,60 870,60 870,16 1000,16 1000,60 1200,60" />
      </svg>
      <p>posedge clk</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  width: 100%;
  height: calc(var(--lvh) * 100);
  min-height: calc(var(--lvh) * 100);
  max-height: none;
  overflow: hidden;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    inset: 12% 5% 19%;
    border: 1px solid rgba(255, 255, 255, 0.055);
    border-radius: 50%;
    transform: rotate(-8deg);
    pointer-events: none;
  }

  &-grid {
    position: relative;
    z-index: 2;
    width: 100%;
    align-items: end;
    padding: 0 var(--space-outer) 8vh;
  }

  &-identity {
    grid-column: 1 / 13;
    transform-origin: left center;

    @include mixins.mq("md") {
      grid-column: 1 / 7;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 7;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: -0.065em;
    line-height: 0.76;
    text-transform: uppercase;
    font-size: clamp(62px, 7.4vw, 124px);

    span {
      display: block;

      &:last-child {
        color: transparent;
        -webkit-text-stroke: 1px rgba(255, 255, 255, 0.72);
        transform: translateX(clamp(18px, 3vw, 58px));
      }
    }
  }

  &-kicker {
    width: min(100%, 760px);
    margin-bottom: clamp(18px, 3vh, 34px);
    padding-bottom: 10px;
    border-bottom: 1px solid #353535;
    display: flex;
    justify-content: space-between;
    color: #898989;
    font: 700 9px/1 "Urbanist", sans-serif;
    letter-spacing: 0.17em;

    span:first-child {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #aeb3e5;
      box-shadow: 0 0 18px rgba(174, 179, 229, 0.65);
    }
  }

  &-role {
    width: fit-content;
    margin-top: clamp(18px, 3.4vh, 38px);
    margin-left: clamp(18px, 3vw, 58px);
    padding: 7px 13px;
    border: 1px solid #4d4d4d;
    border-radius: 500px;
    background: rgba(0, 0, 0, 0.56);
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-size: var(--font-size-sm);
    font-weight: 700;

    > span:first-child {
      color: #aeb3e5;
      font-family: "ProFontWindows", monospace;
    }
  }

  &-thesis {
    grid-column: 1 / 13;
    margin-top: clamp(34px, 7vh, 72px);
    padding: 16px 0 0;
    border-top: 1px solid #4d4d4d;
    display: grid;
    gap: 16px;

    @include mixins.mq("md") {
      grid-column: 9 / 13;
      margin-top: 0;
      padding-left: 20px;
      border-top: 0;
      border-left: 1px solid #4d4d4d;
    }

    &-index {
      color: #8d93cb;
      font: 700 9px/1 "Urbanist", sans-serif;
      letter-spacing: 0.17em;
    }

    > p {
      max-width: 400px;
      color: #fff;
      font-size: clamp(18px, 2vw, 27px);
      line-height: 1.28;
    }

    &-stack {
      padding-top: 10px;
      border-top: 1px solid #2e2e2e;
      color: #777;
      font: 700 8px/1.6 "Urbanist", sans-serif;
      letter-spacing: 0.13em;
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
    }
  }

  &-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &-action {
    min-height: 44px;
    padding: 0 20px;
    border-radius: 500px;
    color: #fff;
    font: 700 10px/1 "Urbanist", sans-serif;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease,
      color 0.25s ease,
      transform 0.25s ease;

    &-primary {
      border: 1px solid #4d527e;
      background: #343755;
    }

    &-ghost {
      border: 1px solid rgba(255, 255, 255, 0.38);
      background: rgba(0, 0, 0, 0.44);
      backdrop-filter: blur(4px);
    }

    @include mixins.hover {
      &:hover {
        transform: translateY(-2px);
        border-color: #fff;
        background: #fff;
        color: #000;
      }
    }
  }

  &-frame {
    position: absolute;
    z-index: 2;
    inset: var(--space-outer);
    pointer-events: none;

    span {
      position: absolute;
      color: #575757;
      font: 700 8px/1 "ProFontWindows", monospace;
      letter-spacing: 0.12em;

      &:nth-child(1) { left: 0; top: 76px; }
      &:nth-child(2) { right: 0; top: 76px; }
      &:nth-child(3) { left: 0; bottom: 122px; }
      &:nth-child(4) { right: 0; bottom: 122px; }
    }
  }

  &-clock {
    position: absolute;
    z-index: 2;
    left: var(--space-outer);
    right: var(--space-outer);
    bottom: 24px;
    height: 76px;
    border-top: 1px solid #313131;

    > div {
      display: flex;
      justify-content: space-between;
      padding-top: 7px;
      color: #515151;
      font: 700 7px/1 "ProFontWindows", monospace;
    }

    svg {
      position: absolute;
      inset: 16px 0 0;
      width: 100%;
      height: 56px;
      overflow: visible;
    }

    polyline {
      fill: none;
      stroke: rgba(141, 147, 203, 0.62);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
      stroke-dasharray: 12 8;
      animation: hero-clock-flow 12s linear infinite;
    }

    p {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #75799f;
      font: 700 8px/1 "ProFontWindows", monospace;
      text-transform: uppercase;
    }
  }
}

@keyframes hero-clock-flow {
  to { stroke-dashoffset: -200; }
}

@media (max-width: 839px) {
  .hero {
    align-items: flex-start;
    padding-top: 120px;

    &-grid {
      padding-bottom: 104px;
    }

    &-title {
      font-size: clamp(64px, 18vw, 104px);
    }

    &-thesis {
      max-width: 560px;
    }

    &-frame span:nth-child(2),
    &-frame span:nth-child(3) {
      display: none;
    }

    &-clock {
      bottom: 46px;
    }
  }
}

@media (max-width: 479px) {
  .hero {
    padding-top: 105px;

    &-kicker span:last-child,
    &-thesis-stack,
    &-frame span {
      display: none;
    }

    &-title {
      font-size: clamp(58px, 18.5vw, 82px);
    }

    &-thesis > p {
      font-size: 18px;
    }

    &-clock {
      bottom: 52px;
    }
  }
}

@media (max-height: 700px) {
  .hero {
    padding-top: 82px;

    &-grid {
      padding-bottom: 88px;
    }

    &-kicker {
      margin-bottom: 14px;
    }

    &-title {
      font-size: clamp(54px, 14vh, 94px);
    }

    &-role {
      margin-top: 14px;
    }

    &-thesis {
      margin-top: 20px;
      gap: 10px;

      &-stack {
        display: none;
      }
    }

    &-action {
      min-height: 38px;
    }

    &-clock {
      height: 58px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-action {
    transition: none;
  }

  .hero-clock polyline {
    animation: none;
  }
}
</style>
