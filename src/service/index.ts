import { localCache } from '@/utils/localCache'
import { BASE_URL, TIME_OUT } from './config'
import HttpRequest from './request'
import useMainStore from '@/store/module/main/main'

import { ElLoading } from 'element-plus'
import { HttpRequestConfig } from './request/type'

let loadingInstance: any = null
const showLoading = () => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    spinner: `<path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`,
    background: 'rgba(0, 0, 0, 0.7)',
    lock: true,
    text: '加载中'
  })
}

const hideLoading = () => loadingInstance.close()

const useMain = useMainStore()

// 使用实例完整
const http = new HttpRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestInterceptor(config: HttpRequestConfig) {
      if (config.showLoading) showLoading()
      useMain.showLoading()
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    responseInterceptor(res) {
      setTimeout(() => {
        loadingInstance && hideLoading()
        useMain.hideLoading()
      }, 100)
      return res
    }
  }
})

export default http
