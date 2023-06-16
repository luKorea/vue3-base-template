// 请在这里注册所有需要用到的组件

import { Button } from 'ant-design-vue'
import { App } from 'vue'

const components = [Button]

export function registerElement(app: App): void {
  for (const el of components) {
    app.component(el.name, el)
  }
}
