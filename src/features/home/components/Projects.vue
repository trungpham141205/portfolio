<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { previews } from "../../../content/projects/previews";
import { locale } from "../../../i18n/store";
import PreviewCard from "../../projects/components/PreviewCard.vue";
import NotchSection from "../../../components/NotchSection.vue";
import SectionAtmosphere from "../../../components/SectionAtmosphere.vue";

import type { ProjectPreview } from "../../../content/types";

const loadedPreviews = ref<ProjectPreview[] | null>(null);

const emit = defineEmits<{
  (e: "loaded", previews: ProjectPreview[]): void;
}>();

const loadPreviews = async () => {
  if (!locale.value) return;
  const func = previews[locale.value as keyof typeof previews];
  if (!func) return;
  const module = await func();
  loadedPreviews.value = module.default;
  emit("loaded", module.default);
};

watch(locale, loadPreviews);

onMounted(loadPreviews);
</script>

<template>
  <div class="projects">
    <SectionAtmosphere variant="work" />
    <NotchSection class="projects-notch-start" />
    <NotchSection class="projects-notch-end" />
    <header class="projects-title grid">
      <div class="projects-title-main">
        <p>03 / SELECTED WORK</p>
        <h2>Evidence,<br /><span>not decoration.</span></h2>
      </div>
      <div class="projects-title-note">
        <p>
          Six case studies move from processor architecture and SoC integration to control logic, registers, and
          arithmetic paths.
        </p>
        <div><span>{{ String(loadedPreviews?.length ?? 0).padStart(2, "0") }} CASE STUDIES</span><span>RTL / SOC / FPGA</span></div>
      </div>
    </header>
    <div class="grid">
      <div class="projects-cards">
        <PreviewCard v-for="preview in loadedPreviews" :key="preview.title" :preview="preview" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  gap: clamp(54px, 8vw, 110px);
  padding-left: var(--space-outer);
  padding-right: var(--space-outer);
  background-color: rgba(0, 0, 0, 0.62);
  backdrop-filter: blur(2px);
  border-top: 1px solid var(--color-grayscale-500);
  min-height: calc(var(--lvh) * 100 + var(--radius-xxl));
  padding-top: 120px;
  padding-bottom: 120px;

  @include mixins.mq("md") {
    padding-top: 144px;
    padding-bottom: 144px;
    gap: clamp(72px, 9vw, 130px);
  }

  @include mixins.mq("lg") {
    gap: var(--space-xxxl);
  }

  &-title {
    width: 100%;
    z-index: 1;
    position: relative;
    align-items: end;
    row-gap: 30px;

    &-main {
      grid-column: 1 / 13;

      @include mixins.mq("md") {
        grid-column: 1 / 8;
      }

      @include mixins.mq("lg") {
        grid-column: 2 / 8;
      }

      > p {
        margin-bottom: 14px;
        color: #8d93cb;
        font: 700 9px/1.4 "Urbanist", sans-serif;
        letter-spacing: 0.18em;
      }

      h2 {
        font-size: clamp(50px, 8vw, 124px);
        line-height: 0.82;
        letter-spacing: -0.055em;
        text-transform: uppercase;

        span {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.46);
        }
      }
    }

    &-note {
      grid-column: 1 / 13;
      max-width: 540px;
      padding-top: 16px;
      border-top: 1px solid #4d4d4d;
      display: grid;
      gap: 18px;

      @include mixins.mq("md") {
        grid-column: 9 / 13;
      }

      @include mixins.mq("lg") {
        grid-column: 9 / 12;
      }

      > p {
        color: #c6c6c6;
        font-size: clamp(15px, 1.4vw, 19px);
        line-height: 1.48;
      }

      > div {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        color: #686868;
        font: 700 8px/1 "ProFontWindows", monospace;
        letter-spacing: 0.1em;
      }
    }
  }

  &-notch {
    &-start {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      display: none;
    }

    &-end {
      position: absolute;
      bottom: 0;
      left: 0;
      display: none;
    }
  }

  &-cards {
    position: relative;
    z-index: 1;
    max-width: 100%;
    flex: 1;
    grid-column: 1 / span 12;
    display: flex;
    flex-direction: column;
    gap: clamp(18px, 3vw, 36px);

    @include mixins.mq("md") {
      grid-column: 1 / span 12;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / span 10;
    }
  }
}
</style>
