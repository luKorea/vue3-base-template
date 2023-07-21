import type { App } from 'vue'
import registerProperties from './register-properties'
// import registerGlobalComponents from './register-components'
import registerIcons from './register-icons'
import registerLayout from './register-layout'

export default function globalRegister(app: App): void {
  app.use(registerLayout)
  app.use(registerProperties)
  // app.use(registerGlobalComponents)
  app.use(registerIcons)
}
