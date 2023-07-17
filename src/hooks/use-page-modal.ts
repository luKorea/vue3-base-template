import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal> | null>(null)
  const defaultInfo = ref({})
  const handleNewData = (item: any, other = false) => {
    // 修改新增函数执行顺序, other参数控制用户点击新增时是否传递参数，默认不传递
    newCb && newCb(item)
    if (other) {
      defaultInfo.value = { ...item }
    } else defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
  }
  const handleEditData = (item: any) => {
    editCb && editCb(item)
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
  }
  return { pageModalRef, defaultInfo, handleNewData, handleEditData } as const
}
