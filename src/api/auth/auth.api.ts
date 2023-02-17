import { AxiosError, AxiosResponse } from 'axios'
import {
  ISignInResponse,
  authInstance,
  ISignInRequest,
  SIGN_URLS,
  USER_STORAGE
} from './auth.interfaces'
import { useSignOut } from './useSignOut'

export const signIn = async (
  url: SIGN_URLS,
  credentials: ISignInRequest
): Promise<AxiosResponse<ISignInResponse> | number> => {
  try {
    const res = await authInstance.post<ISignInResponse>(url, {
      ...credentials
    })
    return res
  } catch (e) {
    return (e as AxiosError).response?.status as number
  }
}
export const refreshToken = async () => {
  try {
    const res = await authInstance.post<ISignInResponse>(
      SIGN_URLS.refresh_token,
      {
        refresh_token: localStorage.getItem(USER_STORAGE.refresh_token)
      }
    )
    if (res.status !== 200) {
      throw new Error('error on Refresh')
    }
    setAuthDataToStorage(res.data)
  } catch (e) {
    if (e === 'error on Refresh') {
      removeAuthDataFromStorage()
      useSignOut()
    }
  }
}

export const setAuthDataToStorage = (
  data: ISignInResponse | undefined
): boolean | undefined => {
  if (data) {
    localStorage.setItem(USER_STORAGE.access_token, data.access_token)
    localStorage.setItem(USER_STORAGE.refresh_token, data.refresh_token)
    localStorage.setItem(USER_STORAGE.user, data.user)
    localStorage.setItem(USER_STORAGE.is_admin, String(data.is_admin))
  }
  return data?.is_admin
}
export const removeAuthDataFromStorage = (): void => {
  const items = Object.values(USER_STORAGE)
  items.forEach((e) => localStorage.removeItem(e))
}
