<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Loading from './OneLoading.vue'
import { AnimationFlickeringOnText } from '../Helpers/Animations/GameCollection'
import { useGamesStore } from '../stores/games_store'
import { ROUTER_NAMES } from '../router'
import vCard from './common/vCard.vue'
import { HTMLRef } from '../types/testsTypes.interface'
import vGradient from './common/vGradientText.vue'

const router = useRouter()
const gamesStore = useGamesStore()
const gamesList = computed(() => gamesStore.games)

const goToTest = (i: number) => {
  if (gamesList.value) {
    router.push({
      name: ROUTER_NAMES.test.root,
      params: {
        gameTitle: gamesList.value[i].title
      }
    })
  }
}

const brokenLetter: HTMLRef = ref(null)
onMounted(() => AnimationFlickeringOnText(brokenLetter))
</script>

<template>
  <div class="game-collection-container">
    <div
      v-if="gamesList"
      class="games-collection"
    >
      <v-card
        v-for="(game, i) in gamesList"
        :key="i"
        :title="game.title"
        :description="game.description"
        :hover="{ isHoverable: true, onElement: 'description' }"
        @click.stop="goToTest(i)"
      />
    </div>
    <Loading v-else />

    <div
      v-show="gamesList"
      class="background-text-container"
    >
      <v-gradient>
        <h1 id="background-text">
          GAME
        </h1>
      </v-gradient>
      <h1
        id="broken-letter"
        ref="brokenLetter"
      >
        S
      </h1>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import '../assets/vars.css';

.game-collection-container {
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: 90%;
  margin: 0;
  .games-collection {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10vw, 400px));
    grid-gap: 1rem;
  }
}
.background-text-container {
  align-self: end;

  font-size: 2.5rem;
  transform: rotate(-35deg);
  display: flex;
  align-items: center;
  font-family: var(--neon-font);
  z-index: -1;

  user-select: none;
  #background-text {
    margin: 0;
  }
  #broken-letter {
    margin: 0;
  }
}

.is-test-ended-container {
  position: relative;
  width: 0;
  height: 0;
  left: 90%;
  top: 1rem;
}
.is-test-ended {
  position: absolute;
  color: var(--color-violet);
  background: var(--gradient-green);
  padding: 0.6rem;
  border-radius: 100%;
}
@media (--large-screen) {
  .game-collection-container {
    grid-template-columns: 5fr 1fr;
    .background-text-container {
      font-size: 3.5rem;
    }
  }
}
</style>
