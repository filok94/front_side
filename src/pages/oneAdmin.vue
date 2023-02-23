<script setup lang="ts">
import { ref } from 'vue'
import vCard from '../components/common/vCard.vue'
import vModal from '../components/common/vModal.vue'
import oneCreateGame from '../components/oneCreateGame.vue'
import oneCreatePerson from '../components/oneCreatePerson.vue'

const modal = ref(false)
const activeModalEditor = ref<null | number>(0)
const chooseTheEditor = (index: number) => {
  modal.value = !modal.value
  activeModalEditor.value = index
}
const closeModal = async () => {
  modal.value = false
  activeModalEditor.value = null
}

const titles = [{
  title: 'Create person',
  description: 'Create persons as games awards'
}, {
  title: 'Create game',
  description: 'Create tests'
}]
</script>

<template>
  <div class="admin">
    <v-card
      v-for="(i, index) in titles"
      :key="index"
      :title="`${i.title}`"
      :hover="{
        isHoverable: true,
        onElement: 'title'
      }"

      :description="titles[index].description"
      @click.prevent="chooseTheEditor(index)"
    />
    <v-modal
      v-if="modal"
      :is-easy-closable="false"
      :title="`${titles[Number(activeModalEditor)].title}`"
      style="width: 70vw;  height: 70vh;"
      @close-modal="closeModal"
    >
      <oneCreateGame
        v-if="activeModalEditor === 1"
        :questions-number="8"
        @game-done="closeModal"
      />

      <oneCreatePerson
        v-if="activeModalEditor === 0"
      />
    </v-modal>
  </div>
</template>

<style lang="postcss">
.admin {
  width: 50%;
  max-width: 35rem;
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(15rem, 1fr) );
  gap: 1rem;
  .card {
    padding: 1rem;
    width: fit-content;
  }
}

</style>
