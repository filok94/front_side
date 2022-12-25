<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ANIMATIONS_RANGE,
	useAnimation } from "../../Helpers/Animations/CommonAnimations";
import { HTMLRef } from "../../types/testsTypes.interface";

let props = defineProps<{
  title?: string;
  description?: string;
  image?: string;
  hover?: {
    isHoverable: boolean;
    onElement?: "title" | "description";
  };
  appearsFrom?: "left" | "right" | "top" | "bottom" | null;
}>();

let card: HTMLRef = ref(null);
let titleRef: HTMLRef = ref(null);
let descriptionRef: HTMLRef = ref(null);

defineExpose({
	card 
});
const { animateFrom } = useAnimation();
onMounted(() => {
	switch (props.appearsFrom) {
	case "bottom": {
		animateFrom(card, "fromBottom", ANIMATIONS_RANGE.LOW);
		break;
	}
	case "top": {
		animateFrom(card, "fromTop", ANIMATIONS_RANGE.LOW);
		break;
	}
	case "right": {
		animateFrom(card, "fromRight", ANIMATIONS_RANGE.LOW);
		break;
	}
	case "left": {
		animateFrom(card, "fromLeft", ANIMATIONS_RANGE.LOW);
		break;
	}
	case null: {
		null;
		break;
	}
	default: {
		null;
		break;
	}
	}
});
</script>

<template>
  <div
    ref="card"
    class="vcard-container"
    :class="{ 'vcard-hover': props.hover?.isHoverable }"
  >
    <h2
      v-if="props.title"
      ref="titleRef"
      class="vcard-title"
    >
      {{ props.title }}
    </h2>
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
<style lang="scss">
.vcard-container {
  padding: 0.5rem 1.5rem;

  display: grid;
  grid-template-columns: 1fr;

  gap: 0;
  justify-items: start;
  align-items: start;
  text-align: start;

  border-radius: $border-prime;
  box-shadow: $shadow-black;
  background: $color-black;

  .vcard-description {
    color: $color-grey;
  }

  transition: .3s ease;
  &:hover {
    transform: scale(101%);
    .vcard-title {
      @include bcg-for-text($gradient);
    }
  }
}
.vcard-image {
  border-radius: $border-prime;
}
.vcard-hover {
  cursor: pointer;
}
</style>
