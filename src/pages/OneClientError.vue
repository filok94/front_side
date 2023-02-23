<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ROUTER_NAMES } from '../router'
import vButton from '../components/common/vButton.vue'
import vTitle from '../components/typogrpaphic/vTitle.vue'
const router = useRouter()
const backToMainPage = () => {
  router.push({
    name: ROUTER_NAMES.main.root,
    params: {
      userId: window.localStorage.getItem('user')
    }
  })
}
</script>

<template>
  <v-title
    :h-tag="1"
  >
    404
  </v-title>
  <v-button
    :purpose="'primary'"
    @click.prevent="backToMainPage"
  >
    На главную
  </v-button>
</template>
