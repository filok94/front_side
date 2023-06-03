<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  ANIMATIONS_RANGE,
  useAnimation
} from '../../Helpers/Animations/CommonAnimations'
import { HTMLRef } from '../../types/testsTypes.interface'

const props = defineProps<{
  title?: string;
  description?: string;
  image?: string;
  hover?: {
    isHoverable: boolean;
    onElement?: 'title' | 'description';
  };
  appearsFrom?: 'left' | 'right' | 'top' | 'bottom' | null;
  isWithDeleteButton?: boolean
}>()

const emit = defineEmits<{(ev: 'deleteButtonClicked', voice: boolean): void; }>()

const card: HTMLRef = ref(null)
const titleRef: HTMLRef = ref(null)
const descriptionRef: HTMLRef = ref(null)

defineExpose({
  card
})
const { animateFrom } = useAnimation()
onMounted(() => {
  switch (props.appearsFrom) {
  case 'bottom': {
    animateFrom(card, 'fromBottom', ANIMATIONS_RANGE.LOW)
    break
  }
  case 'top': {
    animateFrom(card, 'fromTop', ANIMATIONS_RANGE.LOW)
    break
  }
  case 'right': {
    animateFrom(card, 'fromRight', ANIMATIONS_RANGE.LOW)
    break
  }
  case 'left': {
    animateFrom(card, 'fromLeft', ANIMATIONS_RANGE.LOW)
    break
  }
  case null: {
    break
  }
  default: {
    break
  }
  }
})
const deleteButtonEvent = () => {
  emit('deleteButtonClicked', true)
}
</script>

<template>
  <div
    ref="card"
    class="vcard-container"
    :class="{ 'vcard-hover': props.hover?.isHoverable }"
  >
    <div class="vcard-header">
      <h2
        v-if="props.title"
        ref="titleRef"
        class="vcard-title"
      >
        {{ props.title }}
      </h2>
      <button
        v-if="props.isWithDeleteButton"
        class="vcard-delete_button"
        :purpose="'white'"
        @click.prevent.stop="deleteButtonEvent"
      >
        x
      </button>
    </div>
    <img
      v-if="props.image"
      class="vcard-image"
      :src="props.image"
      alt="image in card"
      width="150"
    >
    <h3
      v-if="props.description"
      ref="descriptionRef"
      class="vcard-description"
    >
      {{ props.description }}
    </h3>
    <slot />
  </div>
</template>
<style lang="postcss">
.vcard-container {
  padding: 0.5rem 1.5rem;

  display: grid;
  grid-template-columns: 1fr;

  gap: 0;
  justify-items: start;
  align-items: start;
  text-align: start;

  border-radius: var(--border-prime);
  box-shadow: var(--shadow-black);
  background: var(--color-black);

  .vcard-description {
    color: var(--color-grey);
  }

  transition: .3s ease;
  &:hover {
    transform: scale(101%);
    .vcard-title {
      background: var(--gradient);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;;
    }
  }
}
.vcard-image {
  border-radius: var(--border-prime);
}
.vcard-hover {
  cursor: pointer;
}

.vcard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
}

h2 {
  margin: 0;
}

.vcard-delete_button {
  background: transparent;
  border: none;
  width: 10px;
  color: var(--color-white);
  font-size: 1.3rem;
}

.vcard-delete_button:hover {
  color: var(--color-grey);
}

</style>
