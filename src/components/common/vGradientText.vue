<script setup lang="ts">
const { gradientColor = "gradient" } = defineProps<{
  gradientColor?: "gradient" | "gradient-green" | "gradient-red"
}>();

</script>
<template>
  <div
    class="gradient-text"
    :class="{'gradient-primary': gradientColor=='gradient',
             'gradient-red': gradientColor=='gradient-red',
             'gradient-green': gradientColor=='gradient-green'}"
  >
    <slot />
  </div>
</template>
<style lang="postcss">
.gradient-primary {
  background: var(--gradient);
}

.gradient-green {
  background: var(--gradient-green);
}

.gradient-red {
  background: var(--gradient-red);
}

.gradient-text {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    align-self: center;
}
</style>
