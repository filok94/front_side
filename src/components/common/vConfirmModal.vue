<script setup lang="ts">
import vModal from './vModal.vue'
import vButton from './vButton.vue'

const props = defineProps<{
  isShowing: boolean,
  asyncDisabling?: boolean
}>()

const emit = defineEmits<{(ev: 'isConfirmed', voice: boolean): void }>()

</script>

<template>
  <v-modal
    v-if="props.isShowing"
    :title="'Are you sure?'"
    :is-easy-closable="true"
    @close-modal="emit('isConfirmed', false)"
  >
    <div class="modal-actions">
      <v-button
        :purpose="'primary'"
        :is-loading="asyncDisabling"
        @click="emit('isConfirmed', true)"
      >
        Yes, sure
      </v-button>
      <v-button
        :purpose="'cancel'"
        :is-loading="asyncDisabling"
        @click="emit('isConfirmed', false)"
      >
        Not exactly
      </v-button>
    </div>
  </v-modal>
</template>

<style lang="postcss" scoped>
.modal-actions {
  margin: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
