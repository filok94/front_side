import { Ref } from "vue";
import { errors } from "../../locales/errors";

export const loginPageErrorHandler = (
	errStatus: number,
	passwordRef: Ref<string | undefined>,
	loginRef: Ref<string | undefined>
) => {
	if (errStatus == 409) {
		loginRef.value = errors.loginIsUsed;
	}
	else if (errStatus == 401) {
		passwordRef.value = errors.incorrectCredentials;
	}
	else {
		loginRef.value = errors.unknowError;
	}
	setTimeout(() => {
		loginRef.value = undefined;
		passwordRef.value = undefined;
	}, 50000);
};
