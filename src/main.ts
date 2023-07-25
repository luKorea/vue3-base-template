import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import 'animate.css'
import './index.css'
import registerPinia from './store'
import registerPlugins from './plugins'
import globalRegister from './global'

const app = createApp(App)

globalRegister(app)
registerPlugins(app)
registerPinia(app)

app.use(router)
app.mount('#app')
