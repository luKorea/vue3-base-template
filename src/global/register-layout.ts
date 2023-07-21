import PageContentLayout from '@/layout/page-content-layout'
import { App } from 'vue'

const components: any[] = [PageContentLayout]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
