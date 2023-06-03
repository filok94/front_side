<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import navigation from '../components/OneNavigation.vue'
import { Tab } from '../types/testsTypes.interface'
import { useGamesStore } from '../stores/games_store'
import vBasePage from './vBasePage.vue'
import { USER_STORAGE } from '../api/auth/auth.interfaces'
import { ROUTER_NAMES } from '../router'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = reactive<Tab[]>([
  new Tab({
    name: 'Games', routeName: ROUTER_NAMES.main.gamesList
  }),
  new Tab({
    name: 'Settings', routeName: ROUTER_NAMES.main.settings
  })
])

const gamesStore = useGamesStore()
onMounted(async () => {
  await gamesStore.getAllGames()
  const isAdmin = JSON.parse(String(localStorage.getItem(USER_STORAGE.is_admin)))
  if (isAdmin) {
    tabs.push(new Tab({
      routeName: ROUTER_NAMES.main.admin,
      name: 'Admin'
    }))
  }
})
</script>

<template>
  <v-base-page
    :title="tabs.find(e=>e.routeName == route.name)?.name as string"
  >
    <navigation
      :tabs="tabs"
    />

    <router-view v-slot="{Component}">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-base-page>
</template>

<style lang="postcss">
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}
 </style>
