<script setup lang="ts">
import { ref } from "vue";
import { HTMLRef } from "../../types/testsTypes.interface";

const panel: HTMLRef = ref(null);
defineExpose({
	panel 
});
</script>
<template>
  <div class="v-panel">
    <slot />
  </div>
</template>
<style lang="postcss" scoped>
.v-panel {
  background-color: var(--color-black);
  border-radius: var(--border-prime);
  border: solid var(--color-violet) 1px;
  box-shadow: var(--shadow-black);
  padding: 2rem 2.5rem;
  max-width: max-content;
}
</style>
