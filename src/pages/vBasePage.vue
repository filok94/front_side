<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { ANIMATIONS_RANGE,
	useAnimation } from "../Helpers/Animations/CommonAnimations";
import { HTMLRef } from "../types/testsTypes.interface";

const props = defineProps<{
  title: string;
}>();
const { animateFrom } = useAnimation();
const title: HTMLRef = ref(null);
watch(
	() => props.title,
	() => {
		animateFrom(title, "fromLeft", ANIMATIONS_RANGE.VERY_LOW);
	}
);
onMounted(() => animateFrom(title, "fromLeft", ANIMATIONS_RANGE.VERY_LOW));
</script>
<template>
  <div class="base_page">
    <h1
      ref="title"
      class="base_page-title"
    >
      {{ props.title }}
    </h1>
    <div class="base_page-body">
      <slot />
    </div>
  </div>
</template>
<style lang="scss">
.base_page {
  display: grid;
  grid-template-rows: 10rem 1fr;
  margin: 0 1rem;

  &-title {
    text-align: left;
    font-size: 4rem;
    font-weight: 600;
    color: $color-violet-5;
    user-select: none;
  }
}
</style>
