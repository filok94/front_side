<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  faderHeight?: number;
}>();
const faderHeight = computed(() => {
	return props.faderHeight ? `${ props.faderHeight }rem` : "4rem";
});
</script>

<template>
  <div class="fader-container">
    <div class="fader fader_top" />
    <slot />
    <div class="fader fader_bottom" />
  </div>
</template>
<style lang="scss">
.fader {
  content: "";
  width: 100%;
  height: v-bind(faderHeight);
  position: relative;

  z-index: 4;

  &_top {
    border-radius: $border-prime $border-prime 0 0;
    background: linear-gradient(to top, transparent, $color-black);
    top: v-bind(faderHeight);
  }
  &_bottom {
    border-radius: 0 0 $border-prime $border-prime;
    background: linear-gradient(to bottom, transparent, $color-black);
    bottom: v-bind(faderHeight);
  }

  &-container {
    position: relative;
    margin-top: calc(v-bind(faderHeight) * -1);
  }
}
</style>
