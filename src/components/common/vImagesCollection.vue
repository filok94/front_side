<script setup lang="ts">
import { computed, ref } from "vue";
import { IResponseGetAllAvatars } from "../../api/avatarController/avatar.api.interfaces";
import { Nullable } from "../../types/testsTypes.interface";

const props = defineProps<{
  srcArray: Nullable<IResponseGetAllAvatars[]>;
}>();
let emit = defineEmits<{ (e: "clickImage", target: string): void }>();

const cardDimension = ref(400);
const cardDimensionToPixel = computed(() => cardDimension.value + "px");

const isActiveCardId = ref<null | string>(null);
const clickOnImage = (id: string) => {
	if (isActiveCardId.value != id) {
		emit("clickImage", id);
		isActiveCardId.value = id;
	}
};
</script>
<template>
  <div
    v-if="srcArray"
    class="image-collection"
  >
    <div
      v-for="item in props.srcArray"
      :key="item._id"
      class="image-collection_item"
    >
      <img
        class="image-collection_item__image"
        :src="item.base_link"
        alt="image collection item"
        :width="cardDimension / 2"
        @click.prevent="clickOnImage(item._id)"
      >
      <h2 class="image-collection_item__title">
        {{ item.ref_name.toUpperCase() }}
      </h2>
    </div>
  </div>
  <div
    v-else
    class="image-collection_item image-collection_skeleton"
  />
</template>
<style lang="scss">
.image-collection {
  --title-height: 6rem;
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  &_item {
    border-radius: $border-prime;
    backdrop-filter: blur(3rem);
    cursor: pointer;

    background: hsla(0, 3%, 23%, 0.4);

    display: flex;
    flex-direction: column;
    border: 1px solid $color-violet;
    &__title {
      margin: 0;
      height: var(--title-height);

      display: flex;
      align-items: center;
      justify-content: center;

      font-family: $neon-font;
    }
    &:hover {
      background: $gradient;
    }
  }
  &_skeleton {
    --dimension: v-bind("cardDimensionToPixel");
    height: calc(var(--dimension) + var(--title-height));
    width: var(--dimension);
  }
}
</style>
