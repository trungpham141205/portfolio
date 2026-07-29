<template>
  <div class="cosmic-backdrop" aria-hidden="true">
    <div class="cosmic-backdrop-aurora"></div>
    <div class="cosmic-backdrop-stars cosmic-backdrop-stars-a"></div>
    <div class="cosmic-backdrop-stars cosmic-backdrop-stars-b"></div>
    <div class="cosmic-backdrop-orbit cosmic-backdrop-orbit-outer"></div>
    <div class="cosmic-backdrop-orbit cosmic-backdrop-orbit-inner"></div>
    <div class="cosmic-backdrop-axis"></div>
  </div>
</template>

<style scoped lang="scss">
.cosmic-backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: #000;

  &-aurora {
    position: absolute;
    inset: -28%;
    opacity: 0.28;
    filter: blur(46px);
    transform-origin: 28% 18%;
    background:
      radial-gradient(ellipse at 18% 16%, rgba(41, 112, 88, 0.35), transparent 30%),
      radial-gradient(ellipse at 68% 24%, rgba(52, 55, 85, 0.22), transparent 34%),
      radial-gradient(ellipse at 80% 78%, rgba(83, 35, 87, 0.13), transparent 28%);
    animation: aurora-drift 16s ease-in-out infinite alternate;
  }

  &-stars {
    position: absolute;
    inset: -12%;
    opacity: 0.34;
    background-repeat: repeat;
    animation: stars-drift 28s linear infinite;

    &-a {
      background-image:
        radial-gradient(circle, rgba(255, 255, 255, 0.88) 0 0.7px, transparent 1px),
        radial-gradient(circle, rgba(101, 232, 255, 0.68) 0 0.6px, transparent 1px),
        radial-gradient(circle, rgba(216, 189, 112, 0.58) 0 0.7px, transparent 1.1px);
      background-size:
        173px 197px,
        251px 229px,
        307px 281px;
      background-position:
        18px 33px,
        92px 117px,
        151px 49px;
    }

    &-b {
      opacity: 0.18;
      transform: scale(1.2);
      animation-duration: 44s;
      animation-direction: reverse;
      background-image:
        radial-gradient(circle, rgba(255, 255, 255, 0.7) 0 0.55px, transparent 0.9px),
        radial-gradient(circle, rgba(141, 147, 203, 0.6) 0 0.6px, transparent 1px);
      background-size:
        119px 139px,
        223px 193px;
      background-position:
        42px 68px,
        130px 22px;
    }
  }

  &-orbit {
    position: absolute;
    left: 74%;
    top: 42%;
    border: 1px solid rgba(198, 198, 198, 0.055);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: orbit-turn 32s linear infinite;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(141, 147, 203, 0.5);
    }

    &::before {
      top: 8%;
      left: 26%;
    }

    &::after {
      right: 13%;
      bottom: 22%;
      width: 3px;
      height: 3px;
      background: rgba(198, 198, 198, 0.42);
    }

    &-outer {
      width: min(78vw, 980px);
      aspect-ratio: 1;
    }

    &-inner {
      width: min(58vw, 720px);
      aspect-ratio: 1;
      animation-direction: reverse;
      animation-duration: 24s;
    }
  }

  &-axis {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    opacity: 0.14;
    background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2) 48%, transparent);
  }
}

@keyframes aurora-drift {
  from {
    transform: rotate(-4deg) scale(0.94) translate3d(-2%, -1%, 0);
  }
  to {
    transform: rotate(5deg) scale(1.08) translate3d(3%, 2%, 0);
  }
}

@keyframes stars-drift {
  to {
    transform: translate3d(34px, 52px, 0);
  }
}

@keyframes orbit-turn {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@media (max-width: 839px) {
  .cosmic-backdrop {
    &-aurora {
      inset: -16%;
      opacity: 0.22;
    }

    &-orbit {
      left: 50%;
      top: 29%;

      &-outer {
        width: 112vw;
      }

      &-inner {
        width: 84vw;
      }
    }

    &-axis {
      opacity: 0.08;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .cosmic-backdrop-aurora,
  .cosmic-backdrop-stars,
  .cosmic-backdrop-orbit {
    animation: none;
  }
}
</style>
