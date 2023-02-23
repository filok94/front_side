<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { useGamesStore } from '../stores/games_store'
import vPanel from '../components/common/vPanel.vue'
import { watchOnce } from '@vueuse/core'
import {
  ANIMATIONS_RANGE,
  useAnimation
} from '../Helpers/Animations/CommonAnimations'
import { HTMLRef } from '../types/testsTypes.interface'
import VButton from '../components/common/vButton.vue'
import { useRouter } from 'vue-router'
import { ROUTER_NAMES } from '../router'
import vGradient from '../components/common/vGradientText.vue'

const { activeGame, person, gameResult } = storeToRefs(useGamesStore())
const gameStore = useGamesStore()
const router = useRouter()

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(e: 'fillThePreviousBlock', value: boolean): void;
                          (e: 'closeResults', value: boolean): void; }>()
const props = withDefaults(
  defineProps<{indexToShow: number | null }>(),
  { indexToShow: null }
)
const { animateFrom, animateTo } = useAnimation()
onMounted(async () => {
  await gameStore.setResultData(activeGame?.value?.id as string)
  emit('fillThePreviousBlock', true)
})
const skeletonPosition = ref(0)
const skeletonLoader = computed(() => `${skeletonPosition.value}deg`)
const interval = setInterval(() => {
  skeletonPosition.value += 1
}, 1)
watchOnce(person, (nV) => {
  if (nV) {
    clearInterval(interval)
  }
})
const content: HTMLRef = ref(null)
const contentResult: HTMLRef = ref(null)
const contentEnter = (el: HTMLElement) => {
  content.value != null
    ? animateFrom(el, 'fromLeft', ANIMATIONS_RANGE.LOW)
    : animateFrom(el, 'fromRight', ANIMATIONS_RANGE.LOW)
}
const contentLeave = (el: HTMLElement) =>
  content.value != null
    ? animateTo(el, 'toLeft', ANIMATIONS_RANGE.LOW)
    : animateTo(el, 'toRight', ANIMATIONS_RANGE.LOW)

const currentRightAnswer = computed(() => {
  if (activeGame.value?.questions && typeof props.indexToShow === 'number') {
    return activeGame.value.questions[props.indexToShow as number].answers[
        gameResult.value[props.indexToShow as number].right_answer
    ]
  }
  return null
})

watch(props, (nV) =>
  nV.indexToShow != null && content.value == null
    ? animateFrom(contentResult, 'fromTop', ANIMATIONS_RANGE.VERY_LOW)
    : null
)
const currentUserAnswer = computed(() => {
  if (activeGame.value?.questions && typeof props.indexToShow === 'number') {
    return activeGame.value.questions[props.indexToShow as number].answers[
        gameResult.value[props.indexToShow as number].user_answer
    ]
  }
  return null
})

const endAndGoHome = () =>
  router.push({
    name: ROUTER_NAMES.main.root,
    params: {
      userId: window.localStorage.getItem('user')
    }
  })
</script>
<template>
  <v-panel
    ref="cardPanel"
    class="result result_container"
  >
    <div class="result_close">
      <div @click.prevent="emit('closeResults', true)">
        X
      </div>
    </div>
    <transition
      mode="out-in"
      @enter="contentEnter"
      @leave="contentLeave"
    >
      <div
        v-if="person != null && props.indexToShow == null"
        ref="content"
        class="result_content_person"
      >
        <v-gradient>
          <h2 class="result_content_person_title">
            {{ person?.name }}
          </h2>
        </v-gradient>
        <h3 class="result_content_person_description">
          {{ person?.description }}
        </h3>
        <p class="result_content_person_count">
          <v-gradient>
            <span>{{ person?.count }}</span> из
          </v-gradient>
          {{ activeGame?.questions?.length }}
        </p>
        <div class="home-button">
          <v-button
            :purpose="'primary'"
            @click="endAndGoHome"
          >
            Back
          </v-button>
        </div>
      </div>
      <div
        v-else-if="person != null && props.indexToShow != null"
        ref="contentResult"
        class="result_content_answers"
      >
        <h3 class="result_content_answers_variant">
          Yours: <span>{{ currentUserAnswer }}</span>
        </h3>
        <h3 class="result_content_answers_variant">
          Right: <span>{{ currentRightAnswer }}</span>
        </h3>
        <v-gradient
          :gradient-color="gameResult[props.indexToShow].is_right
            ? 'gradient-green'
            : 'gradient-red'"
        >
          <h3
            :class="{
              result_content_answers_correct:
                gameResult[props.indexToShow].is_right,
              result_content_answers_incorrect:
                !gameResult[props.indexToShow].is_right,
            }"
          >
            {{ gameResult[props.indexToShow].is_right ? "Correct" : "Incorrect" }}
          </h3>
        </v-gradient>
      </div>
    </transition>
  </v-panel>
</template>
<style lang="postcss">
.result {
  &_close {
    display: flex;
    justify-content: end;
    div {
      font-family: var(--neon-font);
      cursor: pointer;
      color: var(--color-grey);
      user-select: none;
      &:active {
        opacity: 0.8;
        transform: scale(95%);
      }
    }
  }
  &_container {
    text-align: left;
    min-width: 90%;
    min-height: 50%;
    background: linear-gradient(v-bind(skeletonLoader), #734b6d, #42275a);
  }
  &_content {
    &_person {
      &_title {
        font-family: var(--neon-font);
        font-size: 2.5rem;
      }
      &_description {
        color: var(--color-grey);
      }
      &_count {
        span {
          font-size: 3rem;
          font-weight: bold;
        }
      }
    }
    &_answers {
      p {
        font-size: 1.5rem;
        font-weight: bold;
      }
      &_variant {
        color: var(--color-pink-3);
        font-family: var(--neon-font);
        span {
          font-size: 1rem;
          font-family: var(--font);
          color: var(--color-grey);
        }
      }
      &_correct {
        font-family: var(--neon-font);
      }
      &_incorrect {
        font-family: var(--neon-font);
      }
    }
  }
}

.home-button {
  display: flex;
  justify-content: end;
  button {
    min-width: 20%;
  }
}
</style>
