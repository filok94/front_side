<script setup lang="ts">
import { useNavigation } from '../../composables/useNavigation'

const props = defineProps<{
  isHovered: boolean,
  gridArea: 'lt' | 'ct' | 'rt' | 'lc' | 'cc' | 'rc' | 'lb' | 'cb' | 'rb',
  circleStyle: 'default' | 'loguout',
  isActivePage?: boolean
}>()

const { borders, isNavcircleActive } = useNavigation()

</script>
<template>
  <Transition>
    <div
      v-show="isNavcircleActive"
      class="subnav-circle"
      :style="{'grid-area': gridArea}"
      :circle-hovered="props.isHovered"
      :circle-logout="props.circleStyle === 'loguout'"
      :circle-active="props.isActivePage"
    >
      <slot />
    </div>
  </Transition>
</template>

<style lang="postcss" scoped>
.subnav-circle {

  backdrop-filter: blur(10px);
  font-size: 0.8rem;
  line-height: 4rem;
  color: var(--color-grey);

  width: 4rem;
  height: 4rem;

  cursor: pointer;
  box-shadow: var(--shadow-black);
  border-radius: 100%;
  border-style: dotted;
  z-index: 0;
}

.subnav-circle[circle-hovered='true'] {
  border-radius: v-bind('borders');
  background: var(--color-violet-3);
}

.subnav-circle[circle-logout='true'] {
  border-color: var(--color-red);
}

.subnav-circle[circle-active='true'] {
  border-color: var(--color-pink);
  color: var(--color-pink);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}
</style>
