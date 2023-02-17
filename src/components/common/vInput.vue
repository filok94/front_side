<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  ANIMATIONS_RANGE,
  useAnimation
} from '../../Helpers/Animations/CommonAnimations'
import { HTMLRef } from '../../types/testsTypes.interface'

interface Props {
	label: string;
	maxLength?: number;
	minLength?: number;
	type: 'text' | 'number' | 'password';
	error?: string | undefined;
	modelValue: string;
}
const props = defineProps<Props>()
const emit = defineEmits<{(e: 'update:modelValue', value: string): void; }>()

const updateInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const inputIsFocused = ref(false)
const inputLabelUpCondition = computed(
  () => props.modelValue.length !== 0 || inputIsFocused.value
)
const input: HTMLRef<HTMLInputElement> = ref(null)
const focusAndBlur = () => (inputIsFocused.value = !inputIsFocused.value)

const errorMessageRef = ref(null)
const { animateFrom } = useAnimation()
watch(props, (nValue) => {
  if (nValue.error) {
    animateFrom(errorMessageRef, 'fromTop', ANIMATIONS_RANGE.LOWEST)
  }
})
</script>
<template>
  <form
    ref="fromRef"
    class="v_form"
  >
    <label
      for="v_input"
      :class="{ v_form_label_up: inputLabelUpCondition }"
      class="v_form_label"
      @click="input?.focus()"
    >{{ props.label }}</label>
    <div class="v-form_wrapper">
      <input
        ref="input"
        :value="modelValue"
        class="v_form_input"
        :class="{ v_input_error: props.error }"
        :type="props.type"
        :maxlength="props.maxLength"
        :minlength="props.minLength"
        @focus="focusAndBlur"
        @blur="focusAndBlur"
        @input="updateInput"
        @keydown.enter.prevent
      >
      <svg
        width="25"
        height="25"
        :fill="props.error ? '#f94d67' : '#747ac8'"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2H2v10h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h-2v-2h-2V8h-2V6h-2V4h-2V2Zm0 2v2h2v2h2v2h2v2h2v2h-2v2h-2v2h-2v2h-2v-2h-2v-2H8v-2H6v-2H4V4h8ZM6 6h2v2H6V6Z"
        />
      </svg>
    </div>
    <p
      v-show="props.error != undefined"
      ref="errorMessageRef"
      class="v_form_error"
    >
      {{ props.error }}
    </p>
  </form>
</template>
<style lang="postcss" scoped>
.v_form_label_up {
	transform: translateY(-1.3rem);
	background-color: var(--color-black);
}

.v_input_error {
	outline-color: var(--color-red) !important;
}
.v_form {
	max-width: max-content;
	margin: 0.5rem;
	display: grid;
	grid-template-rows: repeat(3, 1fr);

	&_input {
		text-indent: 0.5rem;
		display: block;
		border-radius: var(--border-prime);
		padding: 0.7rem 1.9rem;
		font-size: 1rem;
		outline: var(--color-violet-1) solid;
		border: none;
		background-color: var(--color-black);
		color: var(--color-white);
		font-family: var(--font);
		&:focus {
			outline-color: var(--color-violet);
		}
		position: relative;
		left: 1rem;
	}

	&_label {
		padding: 0 0.5rem;
		position: relative;
		top: 3.3rem;
		left: 2rem;
		justify-self: start;
		align-self: start;
		line-height: 1.3rem;
		font-weight: bolder;
		color: rgba(255, 255, 255, 0.568);
		transition: 0.3s ease-in-out;
		border-radius: var(--border-minimal);
		cursor: text;
		z-index: 3;
	}
	&_error {
		margin: 0;
		color: var(--color-red);
		position: relative;
		font-size: 0.9rem;
	}
}
.v-form_wrapper {
	display: flex;
	align-items: center;
	svg {
		position: relative;
		left: -1rem;
	}
}
</style>
