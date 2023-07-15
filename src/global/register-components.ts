import { App } from 'vue'

import PageContent from '@/components/page-content'

const components: any[] = [PageContent]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
