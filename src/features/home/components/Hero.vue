<script setup lang="ts">
import { preloaderVisible } from "../../../composables/usePreloader";
import { t } from "../../../i18n/utils/translate";
import { lenis } from "../../../composables/useScroll";

const scrollTo = (target: string) => {
  lenis.value?.scrollTo(target);
};
</script>

<template>
  <div class="hero">
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <div class="hero-kicker">
          <span>PORTFOLIO / 2026</span>
          <span class="hero-kicker-status"><i></i> OPEN TO LEARN &amp; BUILD</span>
        </div>
        <div class="hero-content-copys">
          <h1 class="hero-title">Pham Quoc<br />Trung</h1>
          <div class="hero-role" v-if="!preloaderVisible">
            <span>RTL</span>
            <span>{{ t("job-title") || "Digital IC Design Learner" }}</span>
          </div>
        </div>
        <p class="hero-note">Verilog / SystemVerilog / RISC-V / FPGA</p>
        <div class="hero-actions" v-if="!preloaderVisible">
          <button class="hero-action hero-action-primary" type="button" @click="scrollTo('#projects')">
            Explore work
          </button>
          <button class="hero-action hero-action-ghost" type="button" @click="scrollTo('#lab')">Open lab</button>
        </div>
      </div>
    </div>
    <aside class="hero-protocol" aria-label="Immersive portfolio interface status">
      <div class="hero-protocol-copy">
        <span>INTERFACE / 001</span>
        <p>Cosmic signal path online. Scroll to move from architecture into live logic.</p>
      </div>
      <div class="hero-protocol-status">
        <span><i></i> PORTAL / LIVE</span>
        <span>VOID / 000</span>
      </div>
    </aside>
  </div>
</template>

<style scoped lang="scss">
.hero {
  max-height: calc(var(--lvh) * 100);
  height: calc(var(--lvh) * 100);
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;

  &-content {
    align-items: center;
    justify-content: center;
    height: 58%;

    @include mixins.landscape {
      height: 100%;

      @include mixins.mq("md") {
        padding-bottom: 25%;
      }

      @include mixins.mq("lg") {
        padding-bottom: 2%;
      }
    }

    &-inner {
      transform-origin: center center;
      grid-column: 1 / 13;
      gap: var(--space-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: fit-content;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      @include mixins.landscape {
        left: 0;
        transform: translateX(0);
        grid-column: 2 / 13;
        width: fit-content;
      }
    }

    &-copys {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);

      @include mixins.mq("md") {
        gap: var(--space-md);
      }
    }

    &-button {
      width: fit-content;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: -0.045em;
    line-height: 0.83;
    text-transform: uppercase;
    font-size: var(--font-size-title-lg);

    @include mixins.landscape {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.landscape-large {
      @include mixins.mq("sm") {
        font-size: var(--font-size-title-xl);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-xxl);
      }
    }
  }

  &-kicker,
  &-note {
    color: var(--color-gray-400);
    font: 700 10px/1.5 "Urbanist", sans-serif;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  &-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &-action {
    min-height: 38px;
    padding: 0 18px;
    border-radius: 500px;
    color: #fff;
    font: 700 11px/1 "Urbanist", sans-serif;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease,
      color 0.25s ease,
      transform 0.25s ease;

    &-primary {
      border: 1px solid #343755;
      background: #343755;
    }

    &-ghost {
      border: 1px solid rgba(255, 255, 255, 0.46);
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

  &-kicker {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: var(--space-md);

    &-status {
      display: flex;
      align-items: center;
      gap: 8px;

      i {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #c6c6c6;
      }
    }
  }

  &-role {
    align-self: flex-end;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 13px;
    border: 1px solid var(--color-ash-border, #4d4d4d);
    border-radius: 500px;
    background: rgba(0, 0, 0, 0.52);
    color: #fff;
    font-size: var(--font-size-sm);
    font-weight: 700;

    > span:first-child {
      color: #c6c6c6;
      font-family: "ProFontWindows", monospace;
    }
  }

  &-protocol {
    position: absolute;
    z-index: 2;
    left: var(--space-outer);
    bottom: var(--space-outer);
    width: min(360px, calc(100% - var(--space-outer) * 2));
    padding: 16px 18px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: grid;
    gap: 14px;

    &-copy {
      display: grid;
      gap: 6px;

      > span {
        color: #999;
        font: 700 9px/1.4 "Urbanist", sans-serif;
        letter-spacing: 0.16em;
      }

      p {
        color: #fff;
        font-size: 15px;
        line-height: 1.55;
      }
    }

    &-status {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding-top: 10px;
      border-top: 1px solid #4d4d4d;
      color: #808080;
      font: 700 8px/1 "Urbanist", sans-serif;
      letter-spacing: 0.12em;

      span {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      i {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #c6c6c6;
      }
    }
  }
}

@media (max-width: 839px) {
  .hero-protocol {
    bottom: 76px;
    padding: 12px 14px;

    &-copy p {
      font-size: 13px;
      line-height: 1.4;
    }
  }
}

@media (max-width: 479px) {
  .hero-protocol-status {
    display: none;
  }
}

@media (max-height: 690px) {
  .hero-protocol {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-action {
    transition: none;
  }
}
</style>
