import { ROUTER_NAMES } from './../../router/index'
import router from '../../router'
import { removeAuthDataFromStorage } from './auth.api'

export function useSignOut () {
  const signOut = () => {
    removeAuthDataFromStorage()
    router.push({
      name: ROUTER_NAMES.login.sign_in
    })
  }
  return {
    signOut
  }
}
