import { App } from 'vue'
import { createPinia } from 'pinia'
const pinia = createPinia()

import userStore from './module/user'

export default function registerPinia(app: App) {
  app.use(pinia)
  const user = userStore()
  user.initLocalStorage()
}
