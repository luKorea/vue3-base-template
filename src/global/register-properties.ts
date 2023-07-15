import type { App } from 'vue'

import { formatUTC } from '@/utils/format'

export default function registerProperties(app: App) {
  const APP = app.config.globalProperties
  APP.$filters = {
    // 日期时间过滤器
    formatTime(value: string) {
      if (value) {
        return formatUTC(value)
      }
    },
    formatDate(value: string) {
      return formatUTC(value)
    }
  }
}
