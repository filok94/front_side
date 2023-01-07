<script lang="ts" setup>
import { reactive, computed, ref, watch, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import VButton from "../components/common/vButton.vue";
import VInput from "../components/common/vInput.vue";
import VPanel from "../components/common/vPanel.vue";
import { loginPageErrorHandler } from "../Helpers/errorHandlers/loginPageErrorHandler";
import { loginPage } from "../locales/loginPage";
import { setAuthDataToStorage, signIn } from "../api/auth/auth.api";
import { ISignInResponse, SIGN_URLS } from "../api/auth/auth.interfaces";
import { ROUTER_NAMES } from "../router";
import { AxiosResponse } from "axios";

const router = useRouter();
const route = useRoute();

let userInputs = reactive({
	login: "",
	password: "",
	confirmationPassowrd: "",
});
const { login, password, confirmationPassowrd } = toRefs(userInputs);

const passwordError = ref<string | undefined>(undefined);
const loginError = ref<string | undefined>(undefined);
watch(password, (nValue, oValue) => {
	if (passwordError.value) {
		passwordError.value =
      nValue.length != oValue.length ? undefined : passwordError.value;
	}
});
watch(login, (nValue, oValue) => {
	if (loginError.value) {
		loginError.value =
      nValue.length != oValue.length ? undefined : loginError.value;
	}
});

const confirmPasswordWrongCondition = computed(
	() => confirmationPassowrd.value != password.value
);
const disableButtonCondition = computed(() => {
	const lengthCondition = login.value.length < 6 || password.value.length < 8;
	return route.name == ROUTER_NAMES.login.sign_in
		? lengthCondition
		: lengthCondition || confirmPasswordWrongCondition.value;
});

const signByButton = async () => {
	if (!disableButtonCondition.value) {
		const methodUrl =
      route.name == ROUTER_NAMES.login.sign_in ? SIGN_URLS.sign_in : SIGN_URLS.sign_up;
		const res = (await signIn(methodUrl, {
			login: login.value,
			password: password.value,
		})) as AxiosResponse<ISignInResponse> | number;

		if (typeof res == "number") {
			loginPageErrorHandler(res, passwordError, loginError);
		}
		else if (typeof res != "number" && res.status == 200) {
			setAuthDataToStorage({
				...res.data,
			});
			router.push({ 
				name: ROUTER_NAMES.main,
				params: {
					userId: window.localStorage.getItem("user")
				},
			});
		}
	}
};
</script>

<template>
  <VPanel class="login_page_panel">
    <div class="left-side">
      <VInput
        ref="panel"
        v-model="login"
        :label="'Login'"
        :max-length="20"
        :min-length="6"
        :type="'text'"
        :error="loginError"
      />
    </div>
    <div class="right-side">
      <VInput
        v-model="password"
        :label="'Password'"
        :max-length="20"
        :min-length="6"
        :type="'password'"
        :error="passwordError"
      />
      <VInput
        v-if="route.name == ROUTER_NAMES.login.sign_up"
        v-model="confirmationPassowrd"
        :label="'Confirm password'"
        :max-length="20"
        :min-length="6"
        :type="'password'"
        :error="
          confirmPasswordWrongCondition ? 'Passwords are different' : undefined
        "
      />
    </div>
    <VButton
      class="auth_button"
      :purpose="'primary'"
      :disable="disableButtonCondition"
      @click.prevent="signByButton"
      @entered="signByButton"
    >
      {{
        route.name == ROUTER_NAMES.login.sign_in
          ? loginPage.authButton
          : loginPage.regButton
      }}
    </VButton>
  </VPanel>
</template>

<style lang="postcss">
.login_page_panel {
  margin: 2rem auto;
  max-width: 20%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 0.3fr;

  .left-side {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .right-side {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 3;
  }

  .auth_button {
    justify-self: center;
    align-self: center;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
</style>
