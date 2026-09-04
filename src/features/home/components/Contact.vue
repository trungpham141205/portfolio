<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import Social from "../../../components/Social.vue";
import SectionAtmosphere from "../../../components/SectionAtmosphere.vue";

const contactElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (contactElement.value && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    transitions.contact.setup(contactElement.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
});
</script>

<template>
  <section class="contact grid" ref="contactElement" aria-labelledby="contact-title">
    <SectionAtmosphere variant="contact" />
    <div class="contact-content">
      <p class="contact-kicker">05 / CONTACT UPLINK</p>
      <h2 id="contact-title" class="contact-title">Close the loop.<br /><span>Start the next block.</span></h2>
      <p class="contact-copy">
        Interested in RTL, FPGA, processor architecture, cryptographic accelerators and the systems that connect
        them. Open to mentorship, collaboration and engineering conversations.
      </p>
      <a class="contact-email" href="mailto:pquoctrung141205@gmail.com">
        <span>OPEN CHANNEL</span>
        pquoctrung141205@gmail.com
        <i aria-hidden="true">↗</i>
      </a>
      <Social variant="background" />
    </div>
    <aside class="contact-terminal" aria-label="Contact channel status">
      <div class="contact-terminal-head"><span>UPLINK / READY</span><i></i></div>
      <div class="contact-terminal-orbit" aria-hidden="true"><i></i><b></b></div>
      <p>AVAILABLE FOR</p>
      <ul>
        <li><span>01</span> RTL DESIGN</li>
        <li><span>02</span> SOC INTEGRATION</li>
        <li><span>03</span> DIGITAL IC RESEARCH</li>
      </ul>
      <div class="contact-terminal-foot"><span>STATUS / OPEN</span><span>UTC+07</span></div>
    </aside>
  </section>
</template>

<style scoped lang="scss">
.contact {
  position: relative;
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: calc(var(--lvh) * 100);
  padding: var(--space-outer);
  padding-top: calc(var(--height-header) + 42px);
  align-items: center;

  @include mixins.mq("md") {
    padding-top: calc(var(--height-header) + 58px);
  }

  &-content {
    z-index: 1;
    position: relative;
    padding-top: 0;
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    @include mixins.mq("sm") {
      grid-column: 1 / 9;
    }

    @include mixins.mq("md") {
      gap: var(--space-xl);
      grid-column: 1 / 8;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 8;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: -0.055em;
    line-height: 0.86;
    font-size: clamp(48px, 7.6vw, 116px);
    text-transform: uppercase;

    span {
      color: transparent;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.46);
    }
  }

  &-kicker {
    color: #8b8fac;
    font: 700 10px/1.5 "Urbanist", sans-serif;
    letter-spacing: 0.17em;
  }

  &-copy {
    max-width: 520px;
    color: var(--color-gray-400);
    font-size: clamp(15px, 1.5vw, 20px);
    line-height: 1.45;
  }

  &-email {
    width: min(100%, 640px);
    min-height: 58px;
    padding: 9px 14px;
    border: 1px solid #4d4d4d;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.52);
    color: #fff;
    font-size: clamp(13px, 1.4vw, 17px);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 13px;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease,
      color 0.25s ease;

    span {
      color: #8d93cb;
      font: 700 8px/1 "Urbanist", sans-serif;
      letter-spacing: 0.14em;
    }

    i {
      font-style: normal;
    }

    @include mixins.hover {
      &:hover {
        border-color: #fff;
        background: #fff;
        color: #000;
      }
    }
  }

  &-terminal {
    position: relative;
    z-index: 1;
    grid-column: 9 / 13;
    min-height: 420px;
    padding: 18px;
    border: 1px solid #414141;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.54);
    backdrop-filter: blur(5px);
    display: none;
    flex-direction: column;
    justify-content: space-between;

    @include mixins.mq("lg") {
      display: flex;
    }

    &-head,
    &-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #737373;
      font: 700 8px/1 "ProFontWindows", monospace;
      letter-spacing: 0.12em;
    }

    &-head i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #aeb3e5;
      box-shadow: 0 0 14px rgba(174, 179, 229, 0.72);
    }

    &-orbit {
      position: absolute;
      left: 50%;
      top: 44%;
      width: 190px;
      aspect-ratio: 1;
      border: 1px solid #363636;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: contact-orbit 18s linear infinite;

      &::before,
      &::after,
      i,
      b {
        content: "";
        position: absolute;
        border-radius: 50%;
      }

      &::before {
        inset: 22%;
        border: 1px solid #4b4e72;
      }

      &::after {
        inset: 43%;
        background: #343755;
        box-shadow: 0 0 40px rgba(89, 95, 160, 0.48);
      }

      i {
        width: 8px;
        height: 8px;
        top: 12%;
        left: 26%;
        background: #fff;
      }

      b {
        inset: -16%;
        border: 1px dashed #292929;
      }
    }

    > p {
      margin-top: auto;
      margin-bottom: 10px;
      color: #666;
      font: 700 8px/1 "Urbanist", sans-serif;
      letter-spacing: 0.14em;
    }

    ul {
      margin-bottom: 26px;
      display: grid;
      gap: 7px;
      color: #c6c6c6;
      font-size: 10px;
      letter-spacing: 0.1em;

      li {
        display: flex;
        gap: 10px;
      }

      span {
        color: #676b95;
        font-family: "ProFontWindows", monospace;
      }
    }
  }
}

@keyframes contact-orbit {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@media (max-width: 839px) {
  .contact-email {
    grid-template-columns: 1fr auto;

    span {
      grid-column: 1 / -1;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-terminal-orbit {
    animation: none;
  }

  .contact-email {
    transition: none;
  }
}
</style>
