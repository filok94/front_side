<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import VTitle from '../components/typogrpaphic/vTitle.vue'
import {
  ANIMATIONS_RANGE,
  useAnimation
} from '../Helpers/Animations/CommonAnimations'

const props = defineProps<{
  title: string;
}>()
const { animateFrom } = useAnimation()
const title = ref<InstanceType<typeof VTitle> | null>(null)
watch(
  () => props.title,
  () => {
    animateFrom(title.value?.hElement as HTMLElement, 'fromLeft', ANIMATIONS_RANGE.VERY_LOW)
  }
)
onMounted(() => animateFrom(title.value?.hElement as HTMLElement,
                            'fromLeft', ANIMATIONS_RANGE.VERY_LOW))
</script>
<template>
  <div class="base_page">
    <VTitle
      ref="title"
      :h-tag="1"
    >
      {{ props.title }}
    </vTitle>
    <div class="base_page-body">
      <slot />
    </div>
  </div>
</template>
<style lang="postcss">
.base_page {
  display: grid;
  grid-template-rows: 10rem 1fr;
  margin: 0 1rem;
}
</style>
