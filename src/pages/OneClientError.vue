<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ROUTER_NAMES } from '../router'
import vButton from '../components/common/vButton.vue'
const router = useRouter()
const backToMainPage = () => {
  router.push({
    name: ROUTER_NAMES.main,
    params: {
      userId: window.localStorage.getItem('user')
    }
  })
}
</script>

<template>
  <h1>
    4
    <span>0</span>4
  </h1>
  <v-button
    :purpose="'primary'"
    @click.prevent="backToMainPage"
  >
    На главную
  </v-button>
</template>

<style lang="postcss" scoped>
h1 {
  font-size: 15rem;
  span {
    color: var(--color-pink);
  }
}
</style>
