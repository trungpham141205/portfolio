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
  if (!card.value || ScrollTrigger.isInViewport(card.value)) return;
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
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    height: 100%;
    padding: clamp(14px, 2.1vw, 28px);
    border: 1px solid #4d4d4d;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.46);
    backdrop-filter: blur(4px);
    transition:
      border-color 0.3s ease,
      background-color 0.3s ease;
  }

  &-top {
    position: relative;
    transition: transform 0.45s var(--ease-smooth);
  }

  &-index,
  &-open {
    position: absolute;
    z-index: 3;
    bottom: 12px;
    border: 1px solid var(--color-grayscale-500);
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(8px);
  }

  &-index {
    left: 12px;
    padding: 6px 10px;
    border-radius: 500px;
    color: var(--color-text-300);
    font: 700 10px/1 "Urbanist", sans-serif;
  }

  &-open {
    right: 12px;
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
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: var(--space-md);
    padding-bottom: var(--space-lg);
    border-bottom: 1px solid var(--color-grayscale-500);
  }

  &-category {
    color: var(--color-text-300);
    font: 700 9px/1.4 "Urbanist", sans-serif;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  &-title {
    font-size: clamp(21px, 2.4vw, 31px);
    line-height: 1;
    letter-spacing: -0.025em;
  }

  &-description {
    color: var(--color-gray-400);
    font-size: var(--font-size-sm);
    line-height: 1.35;
  }

  &-tags {
    grid-column: 1 / -1;
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
        transform: translateY(-6px);
      }

      .preview-card-open {
        transform: rotate(45deg);
        background: #ffffff;
        color: #000000;
      }
    }
  }
}

@media (max-width: 620px) {
  .preview-card-content {
    grid-template-columns: 1fr;
  }

  .preview-card-tags {
    grid-column: 1;
  }
}
</style>
