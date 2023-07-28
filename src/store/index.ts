import { App } from 'vue'
import { createPinia } from 'pinia'

import useMainStore from './module/main/main'
import useHelpStore from './module/cpn/help/help'
import userStore from './module/user/user'

import { HELP_KEY, MAIN_KEY } from './types'

export const storeList = {
  [HELP_KEY]: useHelpStore,
  [MAIN_KEY]: useMainStore
}

const pinia = createPinia()
export default function registerPinia(app: App) {
  app.use(pinia)
  app.provide('pinia', pinia)
  const user = userStore()
  user.initLocalStorage()
}
