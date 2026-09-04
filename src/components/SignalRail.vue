<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { lenis } from "../composables/useScroll";

const chapters = [
  { id: "hero", code: "00", label: "Identity" },
  { id: "about", code: "01", label: "Architecture" },
  { id: "pipeline", code: "02", label: "Process" },
  { id: "projects", code: "03", label: "Work" },
  { id: "lab", code: "04", label: "Lab" },
  { id: "contact", code: "05", label: "Contact" },
] as const;

const root = ref<HTMLElement | null>(null);
const activeChapter = ref("hero");
let observers: IntersectionObserver[] = [];
let rafId = 0;

const updateProgress = () => {
  rafId = 0;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  const element = root.value;
  if (!element) return;
  const travel = window.innerWidth < 1024 ? Math.max(0, window.innerWidth - 165) : element.clientHeight;
  element.style.setProperty("--signal-progress", progress.toFixed(4));
  element.style.setProperty("--signal-offset", `${(progress * travel).toFixed(2)}px`);
};

const requestProgressUpdate = () => {
  if (!rafId) rafId = window.requestAnimationFrame(updateProgress);
};

const goToChapter = (id: string) => {
  lenis.value?.scrollTo(`#${id}`);
};

onMounted(() => {
  chapters.forEach((chapter) => {
    const element = document.getElementById(chapter.id);
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) activeChapter.value = chapter.id;
      },
      { rootMargin: "-38% 0px -52%", threshold: 0 },
    );
    observer.observe(element);
    observers.push(observer);
  });
  window.addEventListener("scroll", requestProgressUpdate, { passive: true });
  window.addEventListener("resize", requestProgressUpdate, { passive: true });
  updateProgress();
});

onBeforeUnmount(() => {
  observers.forEach((observer) => observer.disconnect());
  observers = [];
  window.removeEventListener("scroll", requestProgressUpdate);
  window.removeEventListener("resize", requestProgressUpdate);
  if (rafId) window.cancelAnimationFrame(rafId);
});
</script>

<template>
  <nav ref="root" class="signal-rail" aria-label="Portfolio chapters">
    <div class="signal-rail-status" aria-live="polite">
      <span>SIGNAL PATH</span>
      <strong>{{ chapters.find((chapter) => chapter.id === activeChapter)?.label }}</strong>
    </div>
    <div class="signal-rail-track" aria-hidden="true">
      <i class="signal-rail-fill"></i>
      <i class="signal-rail-pulse"></i>
    </div>
    <div class="signal-rail-nodes">
      <button
        v-for="chapter in chapters"
        :key="chapter.id"
        type="button"
        :class="{ active: activeChapter === chapter.id }"
        :aria-current="activeChapter === chapter.id ? 'location' : undefined"
        :aria-label="`Go to ${chapter.label}`"
        @click="goToChapter(chapter.id)"
      >
        <i aria-hidden="true"></i>
        <span>{{ chapter.code }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.signal-rail {
  --signal-progress: 0;
  --signal-offset: 0px;
  --rail-height: min(46vh, 430px);

  position: fixed;
  z-index: 34;
  right: max(18px, calc((100vw - 1880px) / 2));
  top: 50%;
  width: 58px;
  height: var(--rail-height);
  transform: translateY(-50%);
  display: none;
  pointer-events: none;

  @include mixins.mq("lg") {
    display: block;
  }

  &-status {
    position: absolute;
    right: 50px;
    top: 50%;
    width: 130px;
    transform: translateY(-50%) rotate(-90deg);
    display: flex;
    justify-content: space-between;
    gap: 12px;
    color: #696969;
    font: 700 8px/1 "Urbanist", sans-serif;
    letter-spacing: 0.16em;
    text-transform: uppercase;

    strong {
      color: #c6c6c6;
      font-weight: 700;
    }
  }

  &-track {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background: rgba(255, 255, 255, 0.15);
    overflow: visible;
  }

  &-fill {
    position: absolute;
    inset: 0;
    background: #8d93cb;
    transform: scaleY(var(--signal-progress));
    transform-origin: top;
    will-change: transform;
  }

  &-pulse {
    position: absolute;
    left: 50%;
    top: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 0 16px rgba(198, 202, 255, 0.8);
    transform: translate3d(-50%, var(--signal-offset), 0);
    will-change: transform;
  }

  &-nodes {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  button {
    pointer-events: auto;
    position: relative;
    width: 58px;
    height: 28px;
    padding: 0;
    border: 0;
    background: transparent;
    color: #626262;
    font: 700 8px/1 "ProFontWindows", monospace;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;

    i {
      order: 2;
      width: 7px;
      height: 7px;
      border: 1px solid #666;
      border-radius: 50%;
      background: #000;
      transition:
        border-color 0.2s ease,
        background-color 0.2s ease,
        transform 0.2s ease;
    }

    &.active {
      color: #fff;

      i {
        border-color: #fff;
        background: #8d93cb;
        transform: scale(1.35);
      }
    }
  }
}

@media (max-width: 1023px) {
  .signal-rail {
    display: block;
    top: auto;
    left: 16px;
    right: 16px;
    bottom: 14px;
    width: auto;
    height: 34px;
    transform: none;
    border: 1px solid rgba(255, 255, 255, 0.19);
    border-radius: 500px;
    background: rgba(0, 0, 0, 0.78);
    backdrop-filter: blur(12px);

    &-status {
      left: 15px;
      right: auto;
      top: 50%;
      width: auto;
      transform: translateY(-50%);
      gap: 8px;
    }

    &-track {
      left: 118px;
      right: 15px;
      top: 50%;
      bottom: auto;
      width: auto;
      height: 1px;
    }

    &-fill {
      transform: scaleX(var(--signal-progress));
      transform-origin: left;
    }

    &-pulse {
      top: 50%;
      left: 0;
      transform: translate3d(var(--signal-offset), -50%, 0);
    }

    &-nodes {
      display: none;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .signal-rail-fill,
  .signal-rail-pulse {
    display: none;
  }
}
</style>
