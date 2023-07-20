import type { App } from 'vue'
import registerProperties from './register-properties'
import registerGlobalComponents from './register-components'
import registerIcons from './register-icons'
export default function globalRegister(app: App): void {
  app.use(registerProperties)
  app.use(registerGlobalComponents)
  app.use(registerIcons)
}
