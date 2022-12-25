import { USER_STORAGE } from "./auth/auth.interfaces";
import { refreshToken } from "./auth/auth.api";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const globalInstance = axios.create({
	baseURL: `${ import.meta.env.VITE_BASE_URL }`,
});

globalInstance.interceptors.request.use(
	(config) => {
		if (config.headers) {
			config.headers["token"] = String(
				localStorage.getItem(USER_STORAGE.access_token)
			);
			return config;
		}
	},
	(err) => Promise.reject(err)
);

createAuthRefreshInterceptor(globalInstance, () => refreshToken());
