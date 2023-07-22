import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import 'normalize.css'
import './index.css'
import registerPinia from './store'
import globalRegister from './global'

const app = createApp(App)
console.log(app.version, 'version')
console.log(app.config, 'config')

globalRegister(app)
registerPinia(app)

app.use(router)
app.mount('#app')
