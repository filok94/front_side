import axios from 'axios'
export const authInstance = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_URL}`
})

export const SIGN_URLS = {
  sign_in: 'sign_in',
  sign_up: 'sign_up',
  refresh_token: 'refresh_tokens'
} as const
// eslint-disable-next-line no-redeclare
export type SIGN_URLS = typeof SIGN_URLS[keyof typeof SIGN_URLS];

export interface ISignInRequest {
  login: string;
  password: string;
}

export interface ISignInResponse {
  access_token: string;
  refresh_token: string;
  user: string;
  is_admin: boolean;
}

export interface IRefreshTokensRequest {
  token: string;
}

export const USER_STORAGE = {
  access_token: 'access_token',
  user: 'user',
  refresh_token: 'refresh_token',
  is_admin: 'is_admin'
} as const
// eslint-disable-next-line no-redeclare
export type USER_STORAGE = typeof USER_STORAGE[keyof typeof USER_STORAGE];
