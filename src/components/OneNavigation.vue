<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useSignOut } from '../api/auth/useSignOut'
import { Tab } from '../types/testsTypes.interface'
import vTab from './common/vTab.vue'
import oneNavCircle from './navigations/oneNavCircle.vue'

const props = defineProps<{
  tabs: Tab[]
}>()

const route = useRoute()
const router = useRouter()

const goToSubPage = (tab: Tab | null) => {
  if (tab?.routeName != null && route.name !== tab?.routeName && tab?.name !== 'Logout') {
    router.push({ name: tab?.routeName })
  }
}

const { signOut } = useSignOut()

</script>

<template>
  <nav class="nav">
    <div class="navbar-screen">
      <v-tab
        v-for="(tab, i) of props.tabs"
        :key="i"
        :tab-style="'default'"
        :is-active="tab.routeName === route.name"
        @click.prevent="goToSubPage(tab)"
      >
        {{ tab.name }}
      </v-tab>
      <v-tab
        :tab-style="'danger'"
        :is-active="false"
        @click.prevent="signOut()"
      >
        Logout
      </v-tab>
    </div>
    <one-nav-circle
      class="navigation-circle"
      :tabs="props.tabs"
      @tab-checked="goToSubPage($event)"
      @logout-tab-checked="signOut()"
    />
  </nav>
</template>

<style lang="postcss" scoped>
@import '../assets/vars.css';
.navbar-screen {
  display: none;
}

@media (--upper-medium-screen) {
  .navigation-circle {
    display: none;
  }
  .navbar-screen {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
  }
}
</style>
