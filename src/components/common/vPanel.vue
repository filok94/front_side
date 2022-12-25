<script setup lang="ts">
import { ref } from "vue";
import { HTMLRef } from "../../types/testsTypes.interface";

const panel: HTMLRef = ref(null);
defineExpose({ panel });
</script>
<template>
  <div class="v-panel">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.v-panel {
  background-color: $color-black;
  border-radius: $border-prime;
  border: solid $color-violet 1px;
  box-shadow: $shadow-black;
  padding: 2rem 2.5rem;
  max-width: max-content;
}
</style>
