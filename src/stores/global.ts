import { defineStore } from "pinia";

interface State {
  errorToShow: string | undefined;
}

export const useGlobal = defineStore("global", {
	state: (): State => {
		return {
			errorToShow: undefined
		};
	},

	actions: {
		showError (message: string | undefined) {
			this.errorToShow = message;
			setTimeout(() => {
				this.errorToShow = undefined;
			}, 5000);
		},
	},
});
