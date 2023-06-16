import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import registerPinia from './store'
import { registerElement } from './global'

const app = createApp(App)
registerElement(app)
registerPinia(app)
app.use(router)
app.mount('#app')
