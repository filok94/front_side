import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router'

import OneAuthPage from '../pages/OneAuthPage.vue'
import MainPage from '../pages/OneMainPage.vue'
import OneGame from '../pages/OneGame.vue'
import OneTestResult from '../pages/OneTestResults.vue'
import Avatar from '../pages/OneAvatar.vue'
import CLientError from '../pages/OneCLientError.vue'
import OneRegWindowVue from '../pages/OneSigninUpModal.vue'
import GameCollection from '../pages/oneGameCollection.vue'
import OneSettings from '../pages/oneSettings.vue'
import OneAdmin from '../pages/oneAdmin.vue'
import { USER_STORAGE } from '../api/auth/auth.interfaces'

export const ROUTER_NAMES = {
  redirect: 'redirect',
  login: {
    root: 'Login',
    sign_in: 'Sign_in',
    sign_up: 'Sign_up'
  },
  main: {
    root: 'Main',
    gamesList: 'GamesList',
    settings: 'Settings',
    admin: 'Admin'
  },
  test: {
    root: 'Test',
    testBlock: 'TestBlock',
    testResult: 'TestResult'
  },
  trigger: {
    root: 'Trigger',
    game: 'TriggerGame',
    conclusion: 'TriggerConclusion'
  },
  avatar: 'Avatar',
  clientError: 'ClientError'
} as const
// eslint-disable-next-line no-redeclare
export type ROUTER_NAMES = typeof ROUTER_NAMES[keyof typeof ROUTER_NAMES];

const routes = [
  {
    path: '/',
    name: ROUTER_NAMES.redirect,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const userInStorage = window.localStorage.getItem(USER_STORAGE.user)
      if (!userInStorage) {
        router.push({ name: ROUTER_NAMES.login.sign_in })
      } else {
        router.push({ name: ROUTER_NAMES.main.root, params: { userId: userInStorage } })
      }
    }
  },
  {
    path: '/login',
    name: ROUTER_NAMES.login.root,
    component: OneAuthPage,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (to.name !== ROUTER_NAMES.login.root) {
        next()
      } else {
        router.push({
          name: ROUTER_NAMES.login.sign_in
        })
      }
    },
    children: [
      {
        name: ROUTER_NAMES.login.sign_in,
        path: 'sign_in',
        component: OneRegWindowVue
      },
      {
        name: ROUTER_NAMES.login.sign_up,
        path: 'sign_up',
        component: OneRegWindowVue
      }
    ]
  },
  {
    path: '/:userId/profile',
    name: ROUTER_NAMES.main.root,
    component: MainPage,
    meta: {
      requireAuth: true
    },
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (to.name !== ROUTER_NAMES.main.root) {
        next()
      } else {
        router.push({
          name: ROUTER_NAMES.main.gamesList,
          params: {
            userId: window.localStorage.getItem(USER_STORAGE.user)
          }
        })
      }
    },
    children: [
      {
        name: ROUTER_NAMES.main.gamesList,
        path: 'games',
        component: GameCollection,
        meta: {
          requireAuth: true
        }
      },
      {
        name: ROUTER_NAMES.main.settings,
        path: 'settings',
        component: OneSettings,
        meta: {
          requireAuth: true
        }
      },
      {
        name: ROUTER_NAMES.main.admin,
        path: 'admin',
        component: OneAdmin,
        meta: {
          requireAuth: true,
          requireAdmin: true
        }
      }
    ]
  },
  {
    path: '/:gameTitle',
    name: ROUTER_NAMES.test.root,
    component: OneGame,
    meta: {
      requireAuth: true
    },
    query: '',
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (
        (Number(to.query.step) !== 1 || !to.query.step) &&
        to.name !== ROUTER_NAMES.test.testResult
      ) {
        next({
          name: ROUTER_NAMES.test.root,
          params: {
            gameTitle: to.params.gameTitle
          },
          query: {
            step: 1
          }
        })
      } else {
        next()
      }
    },
    children: [
      {
        path: 'test_result',
        name: ROUTER_NAMES.test.testResult,
        component: OneTestResult,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/:userId/avatar',
    name: ROUTER_NAMES.avatar,
    component: Avatar,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: ROUTER_NAMES.clientError,
    component: CLientError
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requireAuth)
  const isAdmin = JSON.parse(String(window.localStorage.getItem(USER_STORAGE.is_admin)))
  const requireAdmin = to.matched.some((record) => record.meta.requireAdmin)
  const isAuthed = window.localStorage.getItem(USER_STORAGE.access_token) != null
  if (requireAuth && !isAuthed) {
    next({ name: ROUTER_NAMES.login.sign_in })
  } else if (requireAdmin && !isAdmin) {
    next({ name: ROUTER_NAMES.main.root, params: { userId: window.localStorage.getItem(USER_STORAGE.user) } })
  } else {
    next()
  }
})
export default router
