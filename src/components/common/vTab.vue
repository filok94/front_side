<script setup lang="ts">
// eslint-disable-next-line vue/no-setup-props-destructure
const { tabStyle = 'default', isActive = false } = defineProps<{
  tabStyle: 'default' | 'danger'
  isActive: boolean
}>()
</script>
<template>
  <div
    class="v-tab"
    :tab-style="tabStyle"
    :tab-active="isActive"
  >
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.v-tab {
  border-radius: var(--border-prime);
  padding: 1rem;
  display: inline-block;
  min-width: 4rem;

  transition: .3s ease;
  cursor: pointer;

  background: var(--color-violet);
  color: var(--color-grey);
  &:hover {
    opacity:.9;
  }
}
.v-tab[tab-style='danger'] {
  background: var(--gradient-red);
}
.v-tab[tab-active='true'] {
  background: var(--color-violet-3);
  transform: scale(105%);
  color: white;
}
</style>
