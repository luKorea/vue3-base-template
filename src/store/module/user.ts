import { localCache } from '@/utils/localCache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import router from '@/router'
import getTempRoutes from '@/utils/get_temp_routes'
import { createUniqueString } from '@/utils'

export interface IFormData {
  username: string
  password: string
}
const userStore = defineStore('user', () => {
  interface IData {
    token: string | undefined
    userInfo: any
    userMenus: any[]
  }
  const initState = reactive<IData>({
    token: undefined,
    userInfo: {},
    userMenus: []
  })
  function initLocalStorage() {
    const token = localCache.getCache('token')
    const userInfo = localCache.getCache('userInfo')
    const userMenus = localCache.getCache('userMenus')
    token && (initState.token = token)
    userInfo && (initState.userInfo = userInfo)
    if (userMenus) {
      mapUserMenusToRouter(getTempRoutes())
    }
  }

  function mapUserMenusToRouter(userMenus: any[]) {
    initState.userMenus = userMenus
    const routes = mapMenusToRoutes(userMenus)
    routes.forEach((route) => router.addRoute('main', route))
  }

  function login(formData: IFormData) {
    return new Promise((resolve, reject) => {
      try {
        localCache.setCache('token', createUniqueString())
        localCache.setCache('userInfo', formData)
        // 暂时写法
        localCache.setCache('userMenus', getTempRoutes())
        mapUserMenusToRouter(getTempRoutes())
        resolve('success')
      } catch (error) {
        reject(error)
      }
    })
  }
  return {
    initState,
    initLocalStorage,
    login
  }
})

export default userStore
