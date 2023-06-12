import { localCache } from '@/utils/localCache'
import { BASE_URL, TIME_OUT } from './config'
import HttpRequest from './request'

// 使用实例完整
const http = new HttpRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestInterceptor(config) {
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default http
