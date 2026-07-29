<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

type Variant = "about" | "work" | "lab" | "contact";

defineProps<{
  variant: Variant;
}>();

const root = ref<HTMLElement | null>(null);
const active = ref(false);
let observer: IntersectionObserver | null = null;

const particles = [
  { x: "7%", y: "18%", delay: "-1.8s", duration: "5.6s" },
  { x: "14%", y: "72%", delay: "-4.2s", duration: "7.8s" },
  { x: "23%", y: "42%", delay: "-0.7s", duration: "6.2s" },
  { x: "31%", y: "84%", delay: "-3.4s", duration: "8.6s" },
  { x: "42%", y: "13%", delay: "-5.1s", duration: "7.1s" },
  { x: "49%", y: "58%", delay: "-2.5s", duration: "5.9s" },
  { x: "57%", y: "31%", delay: "-6.3s", duration: "9.1s" },
  { x: "65%", y: "76%", delay: "-1.1s", duration: "6.8s" },
  { x: "73%", y: "9%", delay: "-3.9s", duration: "8.1s" },
  { x: "79%", y: "52%", delay: "-0.4s", duration: "5.4s" },
  { x: "87%", y: "88%", delay: "-5.7s", duration: "7.4s" },
  { x: "94%", y: "27%", delay: "-2.1s", duration: "6.5s" },
];

onMounted(() => {
  if (!root.value) return;
  observer = new IntersectionObserver(
    ([entry]) => {
      active.value = entry?.isIntersecting ?? false;
    },
    { rootMargin: "18% 0px", threshold: 0.02 },
  );
  observer.observe(root.value);
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<template>
  <div
    ref="root"
    :class="['section-atmosphere', `section-atmosphere-${variant}`, { 'section-atmosphere-active': active }]"
    aria-hidden="true"
  >
    <div class="section-atmosphere-halo"></div>
    <div class="section-atmosphere-ring section-atmosphere-ring-outer"><i></i><b></b></div>
    <div class="section-atmosphere-ring section-atmosphere-ring-inner"><i></i><b></b></div>
    <div v-if="variant !== 'about'" class="section-atmosphere-crystal">
      <div class="section-atmosphere-crystal-orbit section-atmosphere-crystal-orbit-a"></div>
      <div class="section-atmosphere-crystal-orbit section-atmosphere-crystal-orbit-b"></div>
      <svg
        class="section-atmosphere-crystal-shape"
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          class="section-atmosphere-crystal-outline"
          points="100,5 184,63 158,188 100,235 42,188 16,63"
          pathLength="100"
        />
        <polygon
          class="section-atmosphere-crystal-core"
          points="100,42 151,78 136,165 100,197 64,165 49,78"
          pathLength="100"
        />
        <path class="section-atmosphere-crystal-facet facet-a" d="M100 5V42M16 63L49 78M184 63L151 78" pathLength="100" />
        <path class="section-atmosphere-crystal-facet facet-b" d="M42 188L64 165M158 188L136 165M100 197V235" pathLength="100" />
        <path class="section-atmosphere-crystal-facet facet-c" d="M16 63L100 111L184 63M42 188L100 111L158 188" pathLength="100" />
        <path class="section-atmosphere-crystal-facet facet-d" d="M100 5L49 78L100 111L151 78L100 5Z" pathLength="100" />
        <path class="section-atmosphere-crystal-facet facet-e" d="M49 78L64 165L100 197L136 165L151 78" pathLength="100" />
        <circle class="section-atmosphere-crystal-node" cx="100" cy="111" r="4" />
      </svg>
    </div>
    <div class="section-atmosphere-wire"></div>
    <span
      v-for="(particle, index) in particles"
      :key="index"
      class="section-atmosphere-particle"
      :style="{
        '--particle-x': particle.x,
        '--particle-y': particle.y,
        '--particle-delay': particle.delay,
        '--particle-duration': particle.duration,
      }"
    ></span>
    <div class="section-atmosphere-sweep"></div>
  </div>
</template>

<style scoped lang="scss">
.section-atmosphere {
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.8s ease;

  &-active {
    opacity: 1;
  }

  &-halo {
    position: absolute;
    width: min(82vw, 960px);
    aspect-ratio: 1;
    border-radius: 50%;
    opacity: 0.14;
    filter: blur(34px);
    background: radial-gradient(circle, rgba(52, 55, 85, 0.52), rgba(0, 0, 0, 0) 68%);
    animation: atmosphere-breathe 8s ease-in-out infinite alternate;
    animation-play-state: paused;
  }

  &-ring {
    position: absolute;
    width: min(70vw, 820px);
    aspect-ratio: 1;
    border: 1px solid rgba(198, 198, 198, 0.085);
    border-radius: 50%;
    animation: atmosphere-orbit 26s linear infinite;
    animation-play-state: paused;

    &::before,
    &::after,
    i {
      content: "";
      position: absolute;
      border-radius: 50%;
      background: #c6c6c6;
    }

    &::before {
      top: 8%;
      left: 26%;
      width: 4px;
      height: 4px;
      opacity: 0.52;
    }

    &::after {
      right: 13%;
      bottom: 21%;
      width: 3px;
      height: 3px;
      opacity: 0.34;
    }

    i {
      left: 4%;
      top: 61%;
      width: 2px;
      height: 2px;
      opacity: 0.28;
    }

    b {
      position: absolute;
      inset: -2px;
      border-radius: inherit;
      border-top: 2px solid rgba(101, 232, 255, 0.62);
      border-right: 1px solid rgba(243, 111, 221, 0.38);
      border-bottom: 1px solid transparent;
      border-left: 1px solid transparent;
      opacity: 0.58;
      animation: atmosphere-rim 6.5s linear infinite;
      animation-play-state: paused;
    }

    &-inner {
      width: min(52vw, 610px);
      border-color: rgba(141, 147, 203, 0.13);
      animation-direction: reverse;
      animation-duration: 19s;
    }
  }

  &-wire {
    position: absolute;
    width: min(34vw, 410px);
    aspect-ratio: 1;
    border: 1px solid rgba(255, 255, 255, 0.075);
    transform: rotate(45deg);
    animation: atmosphere-wire 12s ease-in-out infinite alternate;
    animation-play-state: paused;

    &::before,
    &::after {
      content: "";
      position: absolute;
      inset: 17%;
      border: 1px solid rgba(141, 147, 203, 0.11);
      transform: rotate(30deg);
    }

    &::after {
      inset: 34%;
      transform: rotate(60deg);
    }
  }

  &-crystal {
    position: absolute;
    width: min(36vw, 470px);
    aspect-ratio: 5 / 6;
    perspective: 900px;
    opacity: 0.48;
    animation: crystal-float 7s ease-in-out infinite alternate;
    animation-play-state: paused;

    &::before {
      content: "";
      position: absolute;
      inset: -24%;
      border-radius: 50%;
      opacity: 0.24;
      background: radial-gradient(circle, rgba(52, 55, 85, 0.68), transparent 66%);
      animation: crystal-breathe 5.5s ease-in-out infinite alternate;
      animation-play-state: paused;
    }

    &-shape {
      position: absolute;
      z-index: 2;
      inset: 10%;
      width: 80%;
      height: 80%;
      overflow: visible;
      transform-origin: center;
      transform-style: preserve-3d;
      animation: crystal-turn 16s ease-in-out infinite;
      animation-play-state: paused;
    }

    &-outline {
      fill: rgba(0, 0, 0, 0.18);
      stroke: rgba(198, 198, 198, 0.72);
      stroke-width: 0.8;
      stroke-dasharray: 11 4;
      animation: crystal-edge-flow 5s linear infinite;
      animation-play-state: paused;
    }

    &-core {
      fill: rgba(52, 55, 85, 0.14);
      stroke: rgba(141, 147, 203, 0.58);
      stroke-width: 0.8;
      stroke-dasharray: 6 3;
      animation: crystal-edge-flow-reverse 4.2s linear infinite;
      animation-play-state: paused;
    }

    &-facet {
      stroke: rgba(198, 198, 198, 0.32);
      stroke-width: 0.65;
      stroke-dasharray: 8 5;
      animation: crystal-edge-flow 7s linear infinite;
      animation-play-state: paused;

      &.facet-b,
      &.facet-d {
        stroke: rgba(101, 232, 255, 0.38);
        animation-duration: 5.4s;
      }

      &.facet-c,
      &.facet-e {
        stroke: rgba(243, 111, 221, 0.25);
        animation-direction: reverse;
        animation-duration: 6.2s;
      }
    }

    &-node {
      fill: #c6c6c6;
      opacity: 0.62;
      transform-origin: 100px 111px;
      animation: crystal-node 2.4s ease-in-out infinite alternate;
      animation-play-state: paused;
    }

    &-orbit {
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 50%;
      width: 102%;
      aspect-ratio: 1;
      border: 1px solid rgba(198, 198, 198, 0.13);
      border-radius: 50%;
      animation: crystal-orbit 12s linear infinite;
      animation-play-state: paused;

      &::before {
        content: "";
        position: absolute;
        left: 15%;
        top: 8%;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #65e8ff;
        opacity: 0.68;
      }

      &-a {
        transform: translate(-50%, -50%) rotateX(68deg) rotateZ(12deg);
      }

      &-b {
        width: 82%;
        border-color: rgba(141, 147, 203, 0.18);
        transform: translate(-50%, -50%) rotateX(66deg) rotateZ(78deg);
        animation-direction: reverse;
        animation-duration: 8.5s;

        &::before {
          left: auto;
          top: auto;
          right: 18%;
          bottom: 7%;
          width: 3px;
          height: 3px;
          background: #f36fdd;
        }
      }
    }
  }

  &-particle {
    position: absolute;
    left: var(--particle-x);
    top: var(--particle-y);
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: #c6c6c6;
    opacity: 0.18;
    animation: atmosphere-particle var(--particle-duration) ease-in-out var(--particle-delay) infinite alternate;
    animation-play-state: paused;

    &:nth-of-type(3n) {
      background: #8d93cb;
    }
  }

  &-sweep {
    position: absolute;
    left: 7%;
    right: 7%;
    top: -4%;
    height: 1px;
    opacity: 0;
    background: linear-gradient(to right, transparent, rgba(198, 198, 198, 0.24), transparent);
    animation: atmosphere-sweep 11s ease-in-out infinite;
    animation-play-state: paused;
  }

  &-active &-halo,
  &-active &-ring,
  &-active &-wire,
  &-active &-crystal,
  &-active &-crystal::before,
  &-active &-crystal-shape,
  &-active &-crystal-outline,
  &-active &-crystal-core,
  &-active &-crystal-facet,
  &-active &-crystal-node,
  &-active &-crystal-orbit,
  &-active &-ring b,
  &-active &-particle,
  &-active &-sweep {
    animation-play-state: running;
  }

  &-about {
    .section-atmosphere-halo {
      left: 50%;
      top: 50%;
      opacity: 0.055;
      transform: translate(-50%, -50%);
    }

    .section-atmosphere-ring {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .section-atmosphere-wire {
      left: 50%;
      top: 50%;
      opacity: 0.22;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .section-atmosphere-ring b {
      display: none;
    }
  }

  &-work {
    .section-atmosphere-halo,
    .section-atmosphere-ring {
      right: -18%;
      top: 9%;
    }

    .section-atmosphere-ring-inner {
      right: -4%;
      top: 16%;
    }

    .section-atmosphere-wire {
      left: -9%;
      top: 36%;
      opacity: 0.34;
    }

    .section-atmosphere-crystal {
      right: 3%;
      top: 8%;
    }
  }

  &-lab {
    .section-atmosphere-halo,
    .section-atmosphere-ring {
      left: -24%;
      top: 18%;
    }

    .section-atmosphere-ring-inner {
      left: -8%;
      top: 26%;
    }

    .section-atmosphere-wire {
      right: 4%;
      bottom: 7%;
      opacity: 0.32;
    }

    .section-atmosphere-crystal {
      right: -1%;
      top: 21%;
      opacity: 0.42;
    }

    .section-atmosphere-sweep {
      animation-duration: 6s;
    }
  }

  &-contact {
    .section-atmosphere-halo,
    .section-atmosphere-ring {
      right: -8%;
      top: 50%;
      transform: translateY(-50%);
    }

    .section-atmosphere-ring-inner {
      right: 5%;
    }

    .section-atmosphere-wire {
      left: 10%;
      bottom: 6%;
      opacity: 0.28;
    }

    .section-atmosphere-crystal {
      right: 7%;
      top: 20%;
      opacity: 0.36;
    }
  }
}

@keyframes atmosphere-breathe {
  from {
    opacity: 0.08;
    scale: 0.92;
  }
  to {
    opacity: 0.18;
    scale: 1.08;
  }
}

@keyframes atmosphere-orbit {
  to {
    rotate: 360deg;
  }
}

@keyframes atmosphere-rim {
  to {
    rotate: 360deg;
  }
}

@keyframes atmosphere-wire {
  from {
    rotate: -3deg;
    scale: 0.94;
  }
  to {
    rotate: 5deg;
    scale: 1.06;
  }
}

@keyframes crystal-float {
  from {
    translate: 0 -12px;
    rotate: -2deg;
  }
  to {
    translate: 0 14px;
    rotate: 3deg;
  }
}

@keyframes crystal-breathe {
  from {
    opacity: 0.13;
    scale: 0.88;
  }
  to {
    opacity: 0.3;
    scale: 1.12;
  }
}

@keyframes crystal-turn {
  0% {
    transform: rotateX(4deg) rotateY(-22deg) rotateZ(-5deg) scaleX(0.9);
  }
  50% {
    transform: rotateX(-4deg) rotateY(22deg) rotateZ(5deg) scaleX(1.03);
  }
  100% {
    transform: rotateX(4deg) rotateY(-22deg) rotateZ(-5deg) scaleX(0.9);
  }
}

@keyframes crystal-edge-flow {
  to {
    stroke-dashoffset: -100;
  }
}

@keyframes crystal-edge-flow-reverse {
  to {
    stroke-dashoffset: 100;
  }
}

@keyframes crystal-node {
  from {
    opacity: 0.26;
    scale: 0.7;
  }
  to {
    opacity: 0.82;
    scale: 1.35;
  }
}

@keyframes crystal-orbit {
  to {
    rotate: 360deg;
  }
}

@keyframes atmosphere-particle {
  from {
    opacity: 0.08;
    transform: translate3d(-6px, 8px, 0) scale(0.72);
  }
  to {
    opacity: 0.52;
    transform: translate3d(8px, -12px, 0) scale(1.35);
  }
}

@keyframes atmosphere-sweep {
  0%,
  16% {
    top: -4%;
    opacity: 0;
  }
  28% {
    opacity: 0.34;
  }
  78% {
    opacity: 0.12;
  }
  92%,
  100% {
    top: 104%;
    opacity: 0;
  }
}

@media (max-width: 839px) {
  .section-atmosphere {
    &-ring {
      width: 112vw;

      &-inner {
        width: 82vw;
      }
    }

    &-wire {
      width: 56vw;
    }

    &-crystal {
      width: 76vw;
      max-width: 420px;
    }

    &-work,
    &-contact {
      .section-atmosphere-ring {
        right: -52%;
      }

      .section-atmosphere-crystal {
        right: -24%;
      }
    }

    &-lab {
      .section-atmosphere-ring {
        left: -58%;
      }

      .section-atmosphere-crystal {
        right: -26%;
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-atmosphere {
    transition: none;

    &-halo,
    &-ring,
    &-wire,
    &-crystal,
    &-crystal::before,
    &-crystal-shape,
    &-crystal-outline,
    &-crystal-core,
    &-crystal-facet,
    &-crystal-node,
    &-crystal-orbit,
    &-ring b,
    &-particle,
    &-sweep {
      animation: none;
    }

    &-sweep {
      display: none;
    }
  }
}
</style>
