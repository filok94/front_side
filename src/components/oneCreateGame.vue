<script setup lang="ts">
import { reactive, onMounted, ref, computed } from "vue";
import vInput from "./common/vInput.vue";
import vButton from "./common/vButton.vue";
import onePickPerson from "./OnePickPerson.vue";
import { useAdmin } from "../stores/admin_store";

const props = defineProps<{
    questionsNumber: number
}>();
const emit = defineEmits<{
  (ev: "gameDone", isDone: boolean): void
}>();

const gameDone = (ev: boolean) => emit("gameDone", ev);
const adminStore = useAdmin();

const steps = reactive([
	{
		title: "Write down your game's info",
		stepShortName: "Info",
		inputs: [
			{
				label: "Title",
				value: ""
			},
			{
				label: "Description",
				value: ""
			},
			{
				label: "Link",
				value: ""
			}
		]
	}
]);

const isRightValues = reactive<number[]>(Array(9).fill(0));

const currentStep = ref(0);

const jumpToStep = (stepNumber: number) => {
	currentStep.value = stepNumber;
};

onMounted(() => {
	for (let i = 0; i < props.questionsNumber; i++) {
		steps.push({
			title: `Write down question ${ i + 1 } and it's answers`,
			stepShortName: `${ i + 1 }`,
			inputs: [
				{
					label: `Question ${ i + 1 }`,
					value: ""
				},
				{
					label: "Answer 1",
					value: ""
				},
				{
					label: "Answer 2",
					value: ""
				},
				{
					label: "Answer 3",
					value: ""
				},
				{
					label: "Answer 4",
					value: ""
				}
			]
		});
	}
});

const allInputsAreFilled = computed(() => {
	let allValues: string[] = [];
	steps.forEach(step => step.inputs.forEach(e => allValues.push(e.value)));

	return allValues.filter(e => e === "").length === 0 &&
    isRightValues.length === steps.length &&
    isRightValues.slice(1).filter(e => e === undefined).length === 0;
});

const createGamesisActive = ref(true);
const goToPersonPick = () => {
	const test_data = steps.slice(1).map((e, index) => {
		return {
			question: e.inputs[0].value,
			answers: e.inputs.slice(1).map(a => a.value),
			right_answer: isRightValues.slice(1)[index],
			index
		};
	});
	adminStore.addInfoToGame( {
		title: steps[0].inputs[0].value,
		description: steps[0].inputs[1].value,
		link: steps[0].inputs[2].value,
		test_data
	});
	createGamesisActive.value = !createGamesisActive.value;
};

</script>
<template>
  <div
    v-if="createGamesisActive"
    class="create-step"
  >
    <button
      class="create-step_button"
      :disabled="currentStep===0"
      @click="jumpToStep(currentStep - 1)"
    >
      {{ currentStep===0? "": '<' }}
    </button>
    <div class="create-step_body">
      <div class="create-step_bar">
        <div
          v-for="(i, index) in steps"
          :key="index"
          class="create-step_bar_item"
          :class="{'bar-item_done': i.inputs.filter((e) => e.value !== '').length === i.inputs.length}"
          @click.prevent="jumpToStep(index)"
        >
          {{ i.stepShortName }}
        </div>
      </div>
      <h2 class="create-step_body_title">
        {{ steps[currentStep].title }}
      </h2>
      <div class="create-step_body_main">
        <div
          v-for="(i, index) in steps[currentStep].inputs"
          :key="index"
          class="create-step_input"
        >
          <vInput 
            v-model="i.value"
            :label="i.label"
            :type="'text'"
          />
          <input
            v-if="currentStep >= 1 && index >= 1"
            :id="i.label"
            v-model="isRightValues[currentStep]"
            class="create-step_checkbox"
            type="radio"
            name="is_true"
            :value="index - 1"
          >
        </div>
        <v-button
          v-if="allInputsAreFilled"
          :purpose="'primary'"
          class="confirm-button"
          @click="goToPersonPick"
        />
      </div>
    </div>

    <button
      class="create-step_button"
      :disabled="currentStep === steps.length - 1"
      @click="jumpToStep(currentStep + 1)"
    >
      {{ currentStep === steps.length-1? "" : '>' }}
    </button>
  </div>
  <one-pick-person
    v-else
    class="person-picker"
    @game-done="gameDone"
  >
    123
  </one-pick-person>
</template>
<style scoped lang="postcss">
  .create-step {
    display: flex;
    justify-content: space-between;
    padding-top: 2rem;

    &_input {
      margin: 0;
      &:first-child {
          grid-column: 1  / span 2;
      }
      display: flex;
      justify-content: space-between;
    }

    &_body {
        
        display: grid;
        grid-template-rows: repeat(3, .1fr);
        width: 100%;
        justify-items: center;

        &_title {
             font-size: 1.4rem;
             font-family: var(--neon-font);
             color: var(--color-pink-3);
        }
        
        &_main {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-items: center;
        }
    }
    &_bar {

      display: flex;
      gap: .1rem;

      &_item {
        height: 1rem;
        padding: .3rem;

        cursor: pointer;
        
        background: var(--color-pink);
        color: var(--color-dark-grey);

        display: flex;
        align-items: center;
        &:first-of-type {
          border-radius: var(--border-prime) 0 0 var(--border-prime);
        }
        &:last-of-type {
          border-radius: 0 var(--border-prime) var(--border-prime) 0;
        }

        &:hover {
          opacity: .8;
        }
        &:active {
          opacity: .6;
        }
      }
    }

    &_button {
        width: 5%;
        height: 5rem;
        text-align: center;
        background: var(--color-violet);
        border: none;
        cursor: pointer;
        &:nth-child(1) {
            border-radius: 0 var(--border-prime) var(--border-prime) 0;
        }
        &:nth-child(3) {
            border-radius: var(--border-prime) 0 0 var(--border-prime);
        }
        &:hover {
          opacity: .8;
        }
        &:active, &:disabled {
            opacity: .6;
        }
        &:disabled {
          cursor: default;
        }
        &:focus-visible {
          outline-style: solid;
          outline-color: var(--color-pink);
        }
    }
  }
  .bar-item_done {
    background: var(--gradient-green);
  }
  .confirm-button {
    z-index: 10;
    position: fixed;
    bottom: 10rem;
    
    box-shadow: 0px 0px 65px 18px var(--color-violet);
  }
</style>
