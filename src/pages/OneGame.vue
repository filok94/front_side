<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ROUTER_NAMES } from "../router";
import { useGamesStore } from "../stores/games_store";

import vTranistionGrop from "../components/common/vTransitionGroup.vue";
import vPanel from "../components/common/vPanel.vue";
import vFadeBorders from "../components/common/vFadeBorders.vue";
import vBasePage from "./vBasePage.vue";
import vGradient from "../components/common/vGradientText.vue";

import { HTMLRef, IAnswersList } from "../types/testsTypes.interface";
import { IGetQuestionsResponse } from "../api/gameController/games.api.interfaces";

import { cardFadingWithText, cardGoLeft } from "../Helpers/Animations/AnimationsGame";
import { ANIMATIONS_RANGE, useAnimation } from "../Helpers/Animations/CommonAnimations";

const router = useRouter();
const route = useRoute();

onMounted(async () => {
	await gamesStore.getAllGames();
	await gamesStore.setActiveGame(String(route.params.gameTitle));
});
const { activeGame, anserwsList } = storeToRefs(useGamesStore());
const gamesStore = useGamesStore();
const calcualte = async () => {
	await gamesStore.pushToCalculate({
		gameId: activeGame.value?.id as string,
		answers: anserwsList.value,
	});
	router.push({
		name: ROUTER_NAMES.test.testResult 
	});
};
const nextQuestion = () => {
	let nextStep = Number(route.query.step) + 1;
	router.push({
		name: ROUTER_NAMES.test.root,
		query: {
			step: nextStep 
		},
	});
};
const activeAnswer: HTMLRef = ref(null);
const chooseAnswer = (param: IAnswersList) => {
	if (Number(route.query.step) - 1 !== activeGame.value?.questions?.length) {
		let isFinal = param.index + 1 == activeGame.value?.questions?.length;
		cardGoLeft(activeAnswer.value, isFinal);

		isAnimate.value = true;
		setTimeout(() => {
			isAnimate.value = false;
			previousBlocks.push(currentBlock.value);
			isFinal || nextQuestion();
		}, 400);
		gamesStore.pushAnswerToList(param);
		if (Number(route.query.step) === activeGame.value?.questions?.length) {
			calcualte();
		}
	}
};

const currentBlock = computed(
	() =>
		(activeGame.value?.questions as IGetQuestionsResponse[])[
			Number(route.query.step) - 1
		]
);
const previousBlocks = reactive<IGetQuestionsResponse[]>([]);
const fillThePrevBlock = () => {
	if (activeGame.value?.questions?.length != previousBlocks.length) {
		activeGame.value?.questions?.forEach((e) => previousBlocks.push(e));
	}
};

const setResultsShowingToNull = () => (indexToShowResult.value = null);

//animations
const { animateFrom } = useAnimation();

const isAnimate = ref(false);
const onQuestionLeave = (el: HTMLElement) => cardFadingWithText(el);
const resultEnter = (el: HTMLElement) =>
	animateFrom(el, "fromTop", ANIMATIONS_RANGE.HIGH);

const previousRefs = ref<HTMLElement[]>([]);
const indexToShowResult = ref<null | number>(null);
const chooseQuestionToShowResults = (param: { index: number }) => {
	param.index == indexToShowResult.value
		? (indexToShowResult.value = null)
		: (indexToShowResult.value = param.index);
};
</script>

<template>
  <v-base-page :title="activeGame?.title as string">
    <div
      v-if="activeGame"
      class="main-game-content"
    >
      <div class="game-wrapper">
        <div
          v-if="activeGame && route.name != ROUTER_NAMES.test.testResult"
          ref="activeAnswer"
          class="active"
        >
          <v-panel
            class="active_question card-head"
            vif
          >
            <v-gradient>
              <h2>{{ currentBlock?.question }}</h2>
            </v-gradient>
          </v-panel>
          <transition
            :duration="300"
            @leave="onQuestionLeave"
          >
            <v-panel
              v-if="!isAnimate"
              class="active_answers"
            >
              <ul>
                <li
                  v-for="(answer, n) in currentBlock?.answers"
                  :key="n"
                  @click.prevent="
                    chooseAnswer({
                      answer: n == 0 || n == 1 || n == 2 || n == 3 ? n : 0,
                      index: Number(route.query.step) - 1,
                    })
                  "
                >
                  {{ answer }}
                </li>
              </ul>
            </v-panel>
          </transition>
        </div>
        <router-view
          v-slot="{ Component }"
          @fill-the-previous-block="fillThePrevBlock"
          @close-results="setResultsShowingToNull"
        >
          <transition @enter="resultEnter">
            <component
              :is="Component"
              v-if="route.name == ROUTER_NAMES.test.testResult"
              :index-to-show="indexToShowResult"
            />
          </transition>
        </router-view>
        <vFadeBorders>
          <div class="previous previous_scrollable">
            <div class="previous_container">
              <vTranistionGrop>
                <v-panel
                  v-for="block in previousBlocks"
                  ref="previousRefs"
                  :key="block.index"
                  class="previous_container_item card-head"
                  :class="{
                    selectable: route.name == ROUTER_NAMES.test.testResult,
                  }"
                  @click.prevent="
                    chooseQuestionToShowResults({ index: block.index })
                  "
                >
                  <h2>{{ block.question }}</h2>
                </v-panel>
              </vTranistionGrop>
            </div>
          </div>
        </vFadeBorders>
      </div>
    </div>

    <div
      v-else
      class="skeleton"
    >
      <div class="skeleton_left">
        <v-panel
          ref="skeletonOne"
          class="skeleton_item skeleton-bcg"
        />
        <v-panel
          ref="skeletonTwo"
          class="skeleton_left_dropdown skeleton-bcg"
        />
      </div>
      <v-panel class="skeleton_item skeleton-bcg skeleton_right" />
    </div>
  </v-base-page>
</template>

<style lang="postcss" scoped>
@keyframes skeleton-movement {
  0% {
    background-position: -100px;
  }

  40%,
  100% {
    background-position: 140px;
  }
}

.skeleton {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: 2rem;
  --skeleton-left-one: 7rem;
  --skeleton-left-two: 13rem;
  &-bcg {
    background: var(--gradient-skeleton);
    border-radius: var(--border-prime);
    animation: skeleton-movement 3s infinite linear;
    max-width: 100%;
  }
  &-title {
    width: 10rem;
    height: 5rem;
    margin: 1rem 0;
  }

  &_item {
    min-height: var(--skeleton-left-one);
    position: relative;
    z-index: 2;
  }
  &_left_dropdown {
    margin-top: -2rem;
    height: var(--skeleton-left-two);
    border-radius: 0 0 var(--border-prime) var(--border-prime);
  }
  &_right {
    transform: translateY(var(--skeleton-left-one));
    min-height: calc(var(--skeleton-left-one) + var(--skeleton-left-two));
  }
}

h1.game-title {
  text-align: left;
  font-size: 4rem;
  font-weight: 600;
  color: var(--color-violet-5);
}
.game-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: 2rem;
  grid-template-rows: 1fr;

  .active {
    width: 90%;
    &_question {
      background-color: var(--color-dark-grey);
      position: relative;
      z-index: 2;
      min-height: 6rem;
      max-width: 100%;
    }
    &_answers {
      border-radius: 0 0 var(--border-prime) var(--border-prime);
      margin-top: -1.1rem;
      position: relative;
      max-width: 100%;
      z-index: 1;
      padding: 1rem;
      ul {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        li {
          list-style-type: none;
          text-align: left;
          cursor: pointer;
          &:hover {
            color: var(--color-grey);
          }
        }
      }
    }
  }
  .previous {
    max-height: 30rem;
    min-height: 30rem;

    overflow: hidden;
    overflow-y: auto;
    scrollbar-width: none;

    padding: 1rem;

    box-shadow: 0px 5px 10px 2px rgba(14, 14, 14, 0.2) inset;

    border-width: 1px;
    border-radius: var(--border-prime);

    background: rgba(48, 45, 48, 0.86);
    backdrop-filter: blur(15px);

    &_container {
      display: flex;
      flex-direction: column-reverse;
      gap: 1rem;

      scrollbar-width: none;
      overflow-y: scroll;
      &_item {
        z-index: 3;
        &:nth-of-type(odd) {
          background: var(--darkest-violet);
        }
        &:nth-of-type(even) {
          background: var(--dark-violet);
        }
      }
    }
  }
}
.card-head {
  height: 7rem;
  font-size: 0.9rem;
  padding: 0.5rem 1.5rem;
  text-align: left;
}
.selectable {
  cursor: pointer;
  gap: 1rem;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0) inset;
  }
}
</style>
