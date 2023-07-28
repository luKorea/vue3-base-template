// 帮助中心
export const HELP_KEY = 'help'
export const MAIN_KEY = 'main'

export interface IDefaultStoreStructure {
  state: any
  pageListData: any
  pageListCount: any
  getPageListData: (queryInfo: any) => void
  getItemPageDataAction: (queryInfo: any) => void
  createPageDataAction: (createData: any) => void
  editPageDataAction: (editData: any) => void
  deletePageDataAction: (deleteData: any) => void
  sortPageDataAction: (sortData: any) => void
}
