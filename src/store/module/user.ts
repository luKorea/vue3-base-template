import { defineStore } from 'pinia'
import { ref } from 'vue'
const userStore = defineStore('user', () => {
  const initState = ref({
    token: null,
    userInfo: {}
  })

  function initLocalStorage() {
    console.log(initState.value)
  }

  return {
    initState,
    initLocalStorage
  }
})

export default userStore
