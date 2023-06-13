import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import registerPinia from './store'

const app = createApp(App)
registerPinia(app)
app.use(router)
app.mount('#app')
