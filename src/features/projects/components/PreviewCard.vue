<script setup lang="ts">
import Link from "../../../components/Link.vue";
import ProjectDiagram from "./ProjectDiagram.vue";
import gsap from "gsap";
import { onMounted, onUnmounted, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { t } from "../../../i18n/utils/translate";

import type { ProjectPreview } from "../../../content/types";

const timeline = ref<gsap.core.Timeline | null>(null);
const card = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  preview: ProjectPreview;
}>();

onMounted(() => {
  if (
    !card.value ||
    ScrollTrigger.isInViewport(card.value) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) return;
  timeline.value = gsap
    .timeline({ scrollTrigger: { trigger: card.value, start: "top 92%" } })
    .fromTo(card.value, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" });
});

onUnmounted(() => timeline.value?.kill());
</script>

<template>
  <Link
    class="preview-card children-unclickable"
    :to="`/project/${props.preview.slug}`"
    :aria-label="t('switch-to-project', { project: props.preview.title })"
    data-cursor="arrow"
    data-sound="click"
    data-hoversound="hover"
  >
    <article ref="card">
      <div class="preview-card-top">
        <ProjectDiagram :slug="props.preview.slug" compact />
        <span class="preview-card-index">{{ props.preview.index }}</span>
        <span class="preview-card-open" aria-hidden="true">↗</span>
      </div>
      <div class="preview-card-content">
        <div>
          <p class="preview-card-category">{{ props.preview.category }}</p>
          <h3 class="preview-card-title">{{ props.preview.title }}</h3>
        </div>
        <p class="preview-card-description">{{ props.preview.description }}</p>
        <ul class="preview-card-tags" aria-label="Technologies">
          <li v-for="tag in props.preview.tags" :key="tag">{{ tag }}</li>
        </ul>
      </div>
    </article>
  </Link>
</template>

<style scoped lang="scss">
.preview-card {
  position: relative;
  color: var(--color-text-400);

  article {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(270px, 0.75fr);
    gap: 0;
    height: 100%;
    padding: 0;
    border: 1px solid #4d4d4d;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.46);
    backdrop-filter: blur(4px);
    overflow: hidden;
    transition:
      border-color 0.3s ease,
      background-color 0.3s ease;
  }

  &-top {
    position: relative;
    min-height: clamp(320px, 43vw, 560px);
    padding: clamp(14px, 2vw, 26px);
    border-right: 1px solid #3a3a3a;
    display: flex;
    align-items: stretch;
    transition: transform 0.45s var(--ease-smooth);

    > :first-child {
      width: 100%;
    }
  }

  &-index,
  &-open {
    position: absolute;
    z-index: 3;
    top: 14px;
    bottom: auto;
    border: 1px solid var(--color-grayscale-500);
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(8px);
  }

  &-index {
    left: 14px;
    padding: 6px 10px;
    border-radius: 500px;
    color: var(--color-text-300);
    font: 700 10px/1 "Urbanist", sans-serif;
  }

  &-open {
    right: 14px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    transition:
      background 0.25s ease,
      color 0.25s ease,
      transform 0.25s ease;
  }

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: clamp(22px, 3vw, 42px);
    padding: clamp(24px, 3.2vw, 50px);

    > div:first-child {
      padding-bottom: 20px;
      border-bottom: 1px solid #353535;
    }
  }

  &-category {
    color: var(--color-text-300);
    font: 700 9px/1.4 "Urbanist", sans-serif;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  &-title {
    max-width: 12ch;
    font-size: clamp(28px, 3.2vw, 52px);
    line-height: 0.92;
    letter-spacing: -0.045em;
    text-transform: uppercase;
  }

  &-description {
    color: var(--color-gray-400);
    font-size: clamp(15px, 1.45vw, 19px);
    line-height: 1.48;
  }

  &-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    li {
      padding: 4px 8px;
      border: 1px solid #353535;
      border-radius: 500px;
      color: #808080;
      font: 700 9px/1.2 "Urbanist", sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
  }

  @include mixins.hover {
    &:hover {
      article {
        border-color: #808080;
        background: rgba(0, 0, 0, 0.62);
      }

      .preview-card-top {
        transform: scale(0.985);
      }

      .preview-card-open {
        transform: rotate(45deg);
        background: #ffffff;
        color: #000000;
      }
    }
  }

  &:nth-child(even) {
    .preview-card-top {
      order: 2;
      border-right: 0;
      border-left: 1px solid #3a3a3a;
    }

    .preview-card-content {
      order: 1;
    }
  }
}

@media (max-width: 839px) {
  .preview-card article {
    grid-template-columns: 1fr;
  }

  .preview-card-top {
    min-height: clamp(270px, 82vw, 430px);
    border-right: 0;
    border-bottom: 1px solid #3a3a3a;
  }

  .preview-card:nth-child(even) {
    .preview-card-top {
      order: 1;
      border-left: 0;
      border-bottom: 1px solid #3a3a3a;
    }

    .preview-card-content {
      order: 2;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .preview-card article,
  .preview-card-top,
  .preview-card-open {
    transition: none;
  }
}
</style>
