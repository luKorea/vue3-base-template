import { localCache } from '@/utils/localCache'
import { defineStore } from 'pinia'
import { ref } from 'vue'
const userStore = defineStore('user', () => {
  const initState = ref({
    token: null,
    userInfo: {}
  })

  function initLocalStorage() {
    const token = localCache.getCache('token')
    const userInfo = localCache.getCache('userInfo')
    if (token && userInfo) {
      initState.value.token = token
      initState.value.userInfo = userInfo
    }
  }

  return {
    initState,
    initLocalStorage
  }
})

export default userStore
