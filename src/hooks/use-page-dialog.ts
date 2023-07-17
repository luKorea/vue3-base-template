import { ref } from 'vue'
import PageDialog from '@/components/page-dialog'

type CallbackFn = (item?: any) => void

export function usePageDialog(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageDialogRef = ref<InstanceType<typeof PageDialog> | null>(null)
  const defaultInfo = ref({})
  const handleNewData = (item: any, other = false) => {
    // 修改新增函数执行顺序, other参数控制用户点击新增时是否传递参数，默认不传递
    newCb && newCb(item)
    if (other) {
      defaultInfo.value = { ...item }
    } else defaultInfo.value = {}
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogVisible = true
    }
  }
  const handleEditData = (item: any) => {
    editCb && editCb(item)
    defaultInfo.value = { ...item }
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogVisible = true
    }
  }
  return { pageDialogRef, defaultInfo, handleNewData, handleEditData } as const
}
