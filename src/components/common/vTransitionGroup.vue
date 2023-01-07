<script setup lang="ts"></script>
<template>
  <TransitionGroup name="list">
    <slot />
  </TransitionGroup>
</template>

<style lang="postcss">
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 1.1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.list-leave-active {
  position: absolute;
}
</style>
