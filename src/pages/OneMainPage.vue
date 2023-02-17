<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import navigation from '../components/OneNavigation.vue'
import OneSettings from '../components/OneSettings.vue'
import GameCollection from '../components/OneGameCollection.vue'
import oneAdmin from '../components/OneAdmin.vue'
import { ANIMATIONS_RANGE, useAnimation } from '../Helpers/Animations/CommonAnimations'
import { Tab } from '../types/testsTypes.interface'
import { useGamesStore } from '../stores/games_store'
import vBasePage from './vBasePage.vue'
import { USER_STORAGE } from '../api/auth/auth.interfaces'

const activeTabIndex = ref(0)

const activateTarget = (target: number) => {
  activeTabIndex.value = target
}
const components = [GameCollection, OneSettings, oneAdmin]
const tabs = reactive<Tab[]>([
  new Tab({
    id: 0, name: 'Games'
  }),
  new Tab({
    id: 1, name: 'Settings'
  })
])
const enter = (el: HTMLElement) =>
  animateFrom(el, 'fromTop', ANIMATIONS_RANGE.VERY_LOW)
const { animateFrom } = useAnimation()

const gamesStore = useGamesStore()
onMounted(async () => {
  await gamesStore.getAllGames()
  const isAdmin = JSON.parse(String(localStorage.getItem(USER_STORAGE.is_admin)))
  if (isAdmin) {
    tabs.push(new Tab({
      id: 2,
      name: 'Admin'
    }))
  }
})
</script>

<template>
  <v-base-page :title="tabs[activeTabIndex].name">
    <navigation
      :tabs="tabs"
      @activation="activateTarget"
    />

    <div class="activated-window">
      <transition
        mode="out-in"
        @enter="enter"
      >
        <component :is="components[activeTabIndex]" />
      </transition>
    </div>
  </v-base-page>
</template>
