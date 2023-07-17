import { App } from 'vue'

// 表格
import PageContent from '@/components/page-content'

// 表单类弹框
import PageModal from '@/components/page-modal'
import PageForm from '@/components/page-form'
import PageDialog from '@/components/page-dialog'

const components: any[] = [PageContent, PageModal, PageForm, PageDialog]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
