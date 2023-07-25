import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * @description 使用 hooks 写法
 * 1. ref reactive 定义的数据就是 state
 * 2. function 就是 actions
 * 3. computed 就是 getters
 */
const useMainStore = defineStore('main', () => {
  const state = ref({
    loading: false
  })

  function hideLoading() {
    state.value.loading = false
  }
  function showLoading() {
    state.value.loading = true
  }
  return {
    state,
    showLoading,
    hideLoading
  }
})

export default useMainStore
