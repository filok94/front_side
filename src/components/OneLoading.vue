<script lang="ts" setup>
import { circlesMovement } from '../Helpers/Animations/CommonAnimations'
import { onMounted, Ref, ref } from 'vue'
const loaderCirclesArray = ref<never | HTMLElement[]>([])

const changingBorders = (stringToChange: Ref<string>) => {
  const arrayHelper = []
  for (let i = 0; i < 4; i++) {
    arrayHelper.push((Math.random() * (99 - 75) + 75).toFixed())
  }
  stringToChange.value = arrayHelper.join('% ') + '%'
}
const borders = ref('76px 93px 85px 92px')
onMounted(() => {
  circlesMovement(0, loaderCirclesArray.value)
  circlesMovement(1, loaderCirclesArray.value)
  circlesMovement(2, loaderCirclesArray.value)
  circlesMovement(3, loaderCirclesArray.value)

  setInterval(() => changingBorders(borders), 1000)
})
</script>

<template>
  <div class="loader-square-container">
    <div
      v-for="(square, i) of [1, 2, 3, 4]"
      :key="i"
      :ref="
        (el: Element | any) => {
          if (el) loaderCirclesArray[i] = el;
        }
      "
      class="loader-square"
    />
  </div>
</template>

<style lang="postcss">
.loader-square-container {
  position: fixed;
  top: 40%;
  right: -50%;
  width: 100%;
  height: 100%;
  .loader-square {
    position: fixed;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background: var(--color-violet);
    border-radius: v-bind("borders");
  }
}
</style>
