<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  detailMoveFromAside,
  detailRotating
} from '../Helpers/Animations/AnimationSettings'
import vPanel from '../components/common/vPanel.vue'
import { useAvatarStore } from '../stores/avatar_store'

const { avatarLink } = storeToRefs(useAvatarStore())

const router = useRouter()
const chooseAvatar = () => {
  router.push({
    name: 'Avatar'
  })
}

class Setting {
  constructor (public data: { img: string; title: string; action: () => void }
  ) {
    this.data = data
  }
}
const settingsList: Setting[] = reactive([
  new Setting({
    img: avatarLink.value as string,
    title: 'Выбрать аватар',
    action: () => chooseAvatar()
  })
])

const imageSetting = ref<null | HTMLImageElement>(null)
let settingsRotation: ReturnType<typeof setInterval>
onMounted(() => {
  detailMoveFromAside(imageSetting.value)
  settingsRotation = setInterval(() => {
    detailRotating(imageSetting.value)
  }, 10000)
})
onUnmounted(() => {
  clearInterval(settingsRotation)
})
</script>

<template>
  <div class="settings">
    <div class="settings-container">
      <v-panel
        v-for="i in settingsList"
        :key="i.data.title"
        class="settings_item"
        @click="i.data.action"
      >
        <img
          :src="avatarLink ?? ''"
          width="40"
          class="setting-icon"
        >
        <p class="setting-text">
          {{ i.data.title }}
        </p>
      </v-panel>
    </div>
    <img
      ref="imageSetting"
      class="image-holder"
      src="../assets/setting.svg"
    >
  </div>
</template>

<style lang="postcss">
.settings {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 450px));
  justify-content: space-between;
  overflow: hidden;
  &-container {
    display: flex;
    gap: 1rem;
    align-content: start;
    flex-wrap: wrap;
    padding: 0.2rem 0;
  }

  .image-holder {
    justify-self: center;
    width: 300px;
  }
  &_item {
    --square: 5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: start;
    align-items: center;

    width: var(--square);
    height: var(--square);

    cursor: pointer;

    &:hover {
      p {
        color: var(--color-pink-3);
      }
    }

    p {
      margin: 0;
      color: var(--color-grey);
    }
  }
}
</style>
