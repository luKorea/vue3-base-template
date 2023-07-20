import * as ElIconList from '@element-plus/icons-vue'
import type { App } from 'vue'

export default function registerIcons(app: App) {
  for (const name in ElIconList) {
    app.component(name, (ElIconList as any)[name])
  }
}
