<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from "vue";
import { postCreateGame } from "../api/gameController/games.api";
import { useAdmin } from "../stores/admin_store";
import { useGamesStore } from "../stores/games_store";
import vButton from "./common/vButton.vue";

const adminStore = useAdmin();
const gameStore = useGamesStore();

const persons = computed(() => adminStore.persons);

onMounted(async () => {
	await adminStore.getAllPersons();
});

onUnmounted(async () => {
	await gameStore.getAllGames();
});

const personsDevidedByCount = computed(() => {
	const counts = [ ...Array(9).keys() ];
	const countObject = [];

	for (const count of counts) {
		countObject[count] = persons.value.filter(e => e.count === count);
	}
  
	return countObject;
}); 

const selectedPersons = reactive<string[]>([]);
const allPersonsAreSelected = computed(() => selectedPersons.filter(e => typeof e === "string").length === personsDevidedByCount.value.length);

const emit = defineEmits<{
  (ev: "gameDone", isDone: boolean): void
}>();

const confirmPersons = async () => {
	adminStore.addPersonsToGame(selectedPersons);
	if (adminStore.gameInfo) {
		await postCreateGame({
			title: adminStore.gameInfo?.title,
			description: adminStore.gameInfo?.description,
			link: adminStore.gameInfo?.link,
			test_data: adminStore.gameInfo.test_data,
			persons: adminStore.personsToGame
		});
	}
	emit("gameDone", true);
};

const checkPerson = (data: {index: number, value: string}) => {
	selectedPersons[data.index] = data.value;
};

</script>
<template>
  <div
    v-if="persons.length > 0"
    class="count-grid"
  >
    <div
      v-for="i in personsDevidedByCount"
      :key="personsDevidedByCount.indexOf(i)"
      class="person"
    >
      <h2>{{ personsDevidedByCount.indexOf(i) }}</h2>
      <div class="person-grid">
        <div
          v-for="(person, index) of i"
          :key="index"
          class="person_item"
          :class="{'person_item_checked': selectedPersons[personsDevidedByCount.indexOf(i)] === person._id}"
          @click="checkPerson({index: personsDevidedByCount.indexOf(i), value: person._id})"
        >
          <p class="person_item_name">
            {{ person.name }}
          </p>
          <input
            :id="person._id"
            v-model="selectedPersons[personsDevidedByCount.indexOf(i)]"
            :value="person._id"
            type="radio"
            class="person_item_radio"
            :name="String(personsDevidedByCount.indexOf(i))"
          >
        </div>
      </div>
    </div>
    <v-button
      v-if="allPersonsAreSelected"
      :purpose="'primary'"
      class="confirm-button"
      @click="confirmPersons"
    >
      Save your game
    </v-button>
  </div>
</template>
<style lang="scss">
.count-grid {
  display: flex;
  flex-direction: column;
}
.person-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr) );
  gap: 2rem;

}
.person {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h2 {
      text-align: left;
      margin: 0;
      font-size: 1.9rem;
      color: $color-pink-3;
    }
  &_item {
    background: $color-violet;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .1rem 1rem;
    border-radius: $border-prime;
    cursor: pointer;
    &_name {
      color: $color-dark-grey;
      text-align: left;
    }
    &_radio {
      accent-color: $color-pink-3;
      background: $color-pink;
    }
    &_checked,
    &:hover {
      background: $color-violet-3;
    }
  }
}

.confirm-button {
    z-index: 10;
    position: fixed;
    bottom: 10rem;
    right: 0;
    left: 0;
    margin: 0 auto;
    
    box-shadow: 0px 0px 65px 18px $color-violet;
  }

</style>
