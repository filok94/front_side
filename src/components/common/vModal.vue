<script setup lang="ts">
import { onMounted, onUnmounted, Ref, ref } from "vue";
import { onClickOutside, useEventListener } from "@vueuse/core";
import vButton from "./vButton.vue";

const emit = defineEmits<{ (e: "closeModal", target: boolean): void }>();
const props = defineProps<{
  title: string,
  isEasyClosable: boolean
}>();

const vModal: Ref<HTMLDialogElement | null> = ref(null);
const vModalInner: Ref<HTMLDialogElement | null> = ref(null);
const confirmModal: Ref<HTMLDialogElement | null> = ref(null);
  
const destroyModal = () => {
	vModal.value?.close();
	emit("closeModal", true);
};

onMounted(() => {
	vModal.value?.showModal();
});
onUnmounted(() => {
	vModal.value?.close();
});

useEventListener(document,"keydown", (ev: KeyboardEvent) => {
	if (ev.code == "Escape" && !confirmModal.value?.open) {
		ev.preventDefault();
		props.isEasyClosable ? destroyModal() : confirmModal.value?.showModal();  
	}

});

onClickOutside(vModalInner, () => 
	props.isEasyClosable ? destroyModal() : confirmModal.value?.showModal()
);

const confirmToClose = (toClose: boolean) => toClose ? destroyModal() : confirmModal.value?.close();

</script>
<template>
  <dialog
    ref="vModal"
    class="v-modal"
  >
    <div
      ref="vModalInner"
      class="v-modal_inner"
    >
      <div class="v-modal_header">
        <h1>{{ props.title }}</h1>
        <button @click.prevent="props.isEasyClosable ? destroyModal() : confirmModal?.showModal()">
          X
        </button>
      </div>
      <slot />
      <dialog
        ref="confirmModal"
        class="v-modal_confirm"
      >
        <h1>
          Are you sure you want to close the window?
        </h1>
        <div
          class="v-modal_confirm_controller"
        >
          <v-button
            :purpose="'primary'"
            @click="confirmToClose(false)"
          >
            No
          </v-button>
          <v-button
            :purpose="'cancel'"
            @click="confirmToClose(true)"
          >
            Yes
          </v-button>
        </div>
      </dialog>
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
.v-modal {
  border-radius: $border-prime;
  background: $color-black;
  min-width: 40vw;
  min-height: 40vh;
  max-height: 90vh;
  overflow-y: scroll;
  padding: 0;
  border: none;
  box-shadow: $shadow-black;
  scrollbar-width: none;

  &::backdrop {
    background: $color-black;
    opacity: .5;
  }
  &_inner {
    height: 100%;
  }
}

.v-modal_header {
  display: flex;
  justify-content: space-between;

  position: sticky;
  top: 0;
  width: 100%;
  height: 20%;
  min-height: 2rem;
  z-index: 100;

  box-shadow: $shadow-black;
  background: $color-black;

  button {
    height: 4rem;
    width: 2rem;
    border: none;
    border-radius: 0 $border-prime 0 $border-prime;
    background: $color-red;
    cursor: pointer;
    &:hover {
          opacity: .8;
        }
        &:active, &:disabled {
            opacity: .6;
            outline-color: $color-pink;
        }
        &:disabled {
          cursor: default;
        }
        &:focus-visible {
          outline-style: solid;
          outline-color: $color-pink
        }

  }
}

h1 {
  @include bcg-for-text($gradient);
  text-align: left;
  font-family: $neon-font;
  font-size: 2.5rem;
  margin: 1.5rem;
}

.v-modal_confirm {
  background: $color-black;
  border: none;
  width: 40vw;
  border-radius: $border-prime;
  box-shadow: $shadow-black;

  &::backdrop {
    background: $color-black;
    opacity: .8;
  }

  &_controller {
    display: flex;
    gap: 3rem;
    justify-content: center;
  }
}
</style>
