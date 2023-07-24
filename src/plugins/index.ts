import { App } from 'vue'
import i18nPlugin from './i18n'

export default function (app: App) {
  app.use(i18nPlugin, {
    greetings: {
      hello: 'Bonjour!'
    }
  })
}
