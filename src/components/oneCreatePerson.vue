<script setup lang="ts"></script>
<template>
  <div class="wrapper">
    <div class="wrapper_nested">
      nested
    </div>
    TODO
  </div>
</template>
<style scoped lang="postcss">
.wrapper {
  &_nested {
    background: var(--gradient);
  }
}
</style>
