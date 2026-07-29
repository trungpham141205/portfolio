<script setup>
import { preloaderVisible } from "../../../composables/usePreloader";
import { t } from "../../../i18n/utils/translate";
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
      </div>
    </div>
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
        background: #8ef5bd;
        box-shadow: 0 0 12px rgba(142, 245, 189, 0.45);
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
      color: #aeb3e8;
      font-family: "ProFontWindows", monospace;
    }
  }
}
</style>
