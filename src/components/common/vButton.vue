<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useEventListener } from "@vueuse/core";
import gsap from "gsap";

let props = defineProps<{
  disable?: boolean;
  purpose: "cancel" | "primary" | "white";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
}>();

let emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (ev: "entered", voice: KeyboardEvent): void;
}>();

let buttonRef = ref<null | Element>(null);

let mouseHoverEvent = (event: string) => {
	let borders = [ 30, 35 ];
	let style = borders[1];
	style = event == "mouseenter" && !props.disable ? borders[1] : borders[0];
	gsap.to(buttonRef.value, {
		borderRadius: style,
		duration: 0.3,
		ease: "ease",
	});
};

useEventListener(document, "keyup", (ev: KeyboardEvent) => {
	ev.preventDefault();
	ev.code == "Enter" ? emit("entered", ev) : undefined;
});

const dynamicClasses = reactive({
	v_button_cancel: props.purpose == "cancel",
	v_button_primary: props.purpose == "primary",
	v_button_white: props.purpose == "white",
	v_button_small: props.size == "small",
	v_button_medium: props.size == "medium" || props.size == undefined,
	v_button_large: props.size == "large",
	v_button_loading: props.isLoading,
});
</script>

<template>
  <button
    ref="buttonRef"
    :disabled="props.disable"
    :class="dynamicClasses"
    class="v_button"
    @mouseenter="mouseHoverEvent($event.type)"
    @mouseleave="mouseHoverEvent($event.type)"
  >
    <slot>Подтвердить</slot>
  </button>
</template>

<style lang="postcss" scoped>
.v_button {
  border-radius: var(--border-prime);
  border: none;
  max-height: 5rem;

  font-family: var(--font);
  font-size: 1.5rem;

  padding: 1rem;

  color: var(--color-white);
  box-shadow: var(--shadow-black);

  z-index: 1;

  cursor: pointer;
  &:disabled {
    background: var(--gradient-grey);
    box-shadow: none;
  }
  transition: 0.3s;
  &:active {
    box-shadow: none;
  }
  &_cancel {
    background: var(--gradient-grey);
    box-shadow: none;
  }
  &_primary {
    background: var(--gradient);
    box-shadow: -1px 1px 3px 1px var(--color-violet), 1px -1px 3px 1px var(--color-violet-5);
  }
  &_white {
    background: var(--color-white);
    color: var(--color-black);
  }
  &_small {
    max-width: 6rem;
    font-size: 0.5rem;
  }

  &_medium {
    max-width: 10rem;
    font-size: 1rem;
  }

  &_large {
    max-width: 16rem;
    font-size: 1.5rem;
  }
  &_loading {
    color: var(--color-black);
  }
}
</style>
