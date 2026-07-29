<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import Social from "../../../components/Social.vue";

const contactElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
});
</script>

<template>
  <div class="contact grid" ref="contactElement">
    <div class="contact-content">
      <p class="contact-kicker">04 / CONTACT</p>
      <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
      <p class="contact-copy">
        Interested in RTL, FPGA, processor architecture and the systems that connect them. Open to learning,
        collaboration and engineering conversations.
      </p>
      <a class="contact-email" href="mailto:pquoctrung141205@gmail.com">pquoctrung141205@gmail.com</a>
      <Social variant="background" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: calc(var(--lvh) * 100);
  padding: var(--space-outer);
  padding-top: var(--space-lg);

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
  }

  &-content {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    @include mixins.mq("sm") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("md") {
      gap: var(--space-xl);
      grid-column: 1 / 6;
      padding-top: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 6;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-md);

    @include mixins.mq("sm") {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.mq("xl") {
      font-size: var(--font-size-title-xl);
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
    width: fit-content;
    padding-bottom: 5px;
    border-bottom: 1px solid var(--color-grayscale-500);
    color: #fff;
    font-size: clamp(13px, 1.4vw, 17px);
  }
}
</style>
