import { localCache } from '@/utils/localCache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import router from '@/router'
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
      initState.userMenus = userMenus
      mapUserMenusToRouter(userMenus)
    }
  }

  function mapUserMenusToRouter(userMenus: any[]) {
    const routes = mapMenusToRoutes(userMenus)
    routes.forEach((route) => router.addRoute('main', route))
  }

  function login() {
    return new Promise((resolve, reject) => {
      try {
        const userMenus = [
          {
            url: '/cpn/cpn1',
            title: '表单测试',
            id: 1
          },
          {
            url: '/cpn/cpn2',
            title: '表格测试',
            id: 2
          }
        ]
        localCache.setCache('token', 99999)
        localCache.setCache('userInfo', {
          name: 'korea',
          age: 20
        })
        localCache.setCache('userMenus', userMenus)
        initState.userMenus = userMenus
        mapUserMenusToRouter(userMenus)
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
