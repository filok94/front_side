<script setup lang="ts">
import { ref } from 'vue'
import { HTMLRef } from '../../types/testsTypes.interface'
import vGradient from '../common/vGradientText.vue'
const props = defineProps<{
  hTag: 1 | 2 | 3 | 4;
}>()
const hElement: HTMLRef = ref(null)
defineExpose({
  hElement
})
</script>
<template>
  <vGradient>
    <h1
      v-if="props.hTag == 1"
      ref="hElement"
      class="h-typography"
    >
      <slot />
    </h1>
    <h2
      v-if="props.hTag == 2"
      ref="hElement"
      class="h-typography"
    >
      <slot />
    </h2>
    <h3
      v-if="props.hTag == 3"
      ref="hElement"
      class="h-typography"
    >
      <slot />
    </h3>
    <h4
      v-if="props.hTag == 4"
      ref="hElement"
      class="h-typography"
    >
      <slot />
    </h4>
  </vGradient>
</template>

<style lang="postcss" scoped>
.h-typography {
  font-family: var(--neon-font);
  text-align: left;
  font-weight: 600;
  user-select: none;
}
h1 {
  font-size: 4rem;
}
h2 {
  font-size: 3rem;
}
h3 {
  font-size: 2rem;
}
h4 {
  font-size: 1rem;
}
</style>
