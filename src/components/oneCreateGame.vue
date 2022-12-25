<script setup lang="ts">
import { reactive, onMounted, ref, computed } from "vue";
import vInput from "./common/vInput.vue";
import vButton from "./common/vButton.vue";

const props = defineProps<{
    questionsNumber: number
}>();

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

const currentStep = ref(0);

const jumpToStep = (stepNumber: number) => {
	currentStep.value = stepNumber;
};
const allInputsAreFilled = computed(() => {
	let allValues: string[] = [];
	steps.forEach(step => step.inputs.forEach(e => allValues.push(e.value)));

	return allValues.filter(e => e === "").length === 0;
});

onMounted(() => {
	for (let i=0; i < props.questionsNumber; i++) {
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
</script>
<template>
  <div class="create-step">
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
        <!-- <div class="main_input_wrapper"> -->
        <vInput 
          v-for="(i, index) in steps[currentStep].inputs"
          :key="index"
          v-model="i.value"
          :label="i.label"
          :type="'text'"
          class="create-step_input"
        />
        <!-- </div> -->
        <v-button
          v-if="allInputsAreFilled"
          :purpose="'primary'"
          class="confirm-button"
        />
      </div>
    </div>

    <button
      class="create-step_button"
      :disabled="currentStep===steps.length-1"
      @click="jumpToStep(currentStep + 1)"
    >
      {{ currentStep===steps.length-1? "": '>' }}
    </button>
  </div>
</template>
<style scoped lang="scss">
//static
  .create-step {
    display: flex;
    justify-content: space-between;
    padding-top: 2rem;

    &_input {
      margin: 0;
      &:first-child {
          grid-column: 1  / span 2;
      }
    }

    &_body {
        
        display: grid;
        grid-template-rows: repeat(3, .1fr);
        width: 100%;
        justify-items: center;

        &_title {
             font-size: 1.4rem;
             font-family: $neon-font;
             color: $color-pink-3;
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
        
        background: $color-pink;
        color: $color-dark-grey;

        display: flex;
        align-items: center;
        &:first-of-type {
          border-radius: $border-prime 0 0 $border-prime;
        }
        &:last-of-type {
          border-radius: 0 $border-prime $border-prime 0;
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
        background: $color-violet;
        border: none;
        cursor: pointer;
        &:nth-child(1) {
            border-radius: 0 $border-prime $border-prime 0;
        }
        &:nth-child(3) {
            border-radius: $border-prime 0 0 $border-prime;
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
          outline-color: $color-pink
        }
    }
  }
  .bar-item_done {
    //dynamic class
    background: $gradient-green;
  }
  .confirm-button {
    z-index: 10;
    position: fixed;
    bottom: 10rem;
    
    box-shadow: 0px 0px 65px 18px $color-violet;
  }
</style>
