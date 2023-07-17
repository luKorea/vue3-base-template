import { reactive } from 'vue'

export function useStoreName() {
  const storeTypeInfo = reactive({
    actionName: 'oaPermissionModule/getPageListAction',
    actionListName: 'oaPermissionModule/pageListData',
    actionCountName: 'oaPermissionModule/pageListCount',
    deleteAction: 'oaPermissionModule/deletePageDataAction'
  })
  const operationName = reactive({
    editName: 'oaPermissionModule/editPageDataAction',
    createName: 'oaPermissionModule/createPageDataAction'
  })

  return {
    operationName,
    storeTypeInfo
  }
}
