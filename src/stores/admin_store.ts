import { defineStore } from "pinia";
import { IGameInfo } from "../api/gameController/games.api.interfaces";
import { getAllPersons } from "../api/personController/person.api";
import { IPerson } from "../api/personController/persons.api.interfaces";

interface State {
  persons: IPerson[];
  personsToGame: string[];
  gameInfo: IGameInfo | null
}

export const useAdmin = defineStore("admin", {
	state: (): State => {
		return {
			persons: [],
			personsToGame: [],
			gameInfo: null
		};
	},

	actions: {
		async getAllPersons () {
			const persons = await getAllPersons();
			if (persons !== undefined) {
				this.persons = persons;
			}
		},

		addPersonsToGame (addedPersons: string[]) {
			this.personsToGame = addedPersons;
		},
		
		addInfoToGame (gameInfo: IGameInfo) {
			this.gameInfo = gameInfo;
		}
	},
});
