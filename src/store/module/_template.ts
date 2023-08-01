import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { IHelpState } from '../module/cpn/help/types'
import { HELP_KEY } from '@/store/types'

const useHelpStore = defineStore(HELP_KEY, () => {
  const state = reactive<IHelpState>({
    helpList: [],
    helpCount: 0,
    currentPage: 1,
    pageSize: 10
  })

  const pageListData = computed(
    () => (pageName: string) => state[`${pageName}List`]
  )
  const pageListCount = computed(
    () => (pageName: string) => state[`${pageName}Count`]
  )

  // 获取列表
  function getPageListData(queryInfo: any) {
    console.log(queryInfo, 'getPageListData')
  }

  // 获取单行数据
  function getItemPageDataAction(queryInfo: any) {
    console.log(queryInfo, 'getItemPageDataAction')
  }

  // 新增
  function createPageDataAction(data: any) {
    console.log(data, 'createPageDataAction')
    return new Promise((resolve, reject) => {
      resolve({
        hideDialog: false
      })
    })
  }

  // 编辑
  function editPageDataAction(data: any) {
    console.log(data, 'editPageDataAction')
  }

  // 删除
  function deletePageDataAction(queryInfo: any) {
    console.log(queryInfo, 'deletePageDataAction')
  }

  // 排序
  function sortPageDataAction(queryInfo: any) {
    console.log(queryInfo, 'sortPageDataAction')
  }
  return {
    state,
    pageListData,
    pageListCount,
    getPageListData,
    getItemPageDataAction,
    createPageDataAction,
    editPageDataAction,
    deletePageDataAction,
    sortPageDataAction
  }
})

export default useHelpStore
