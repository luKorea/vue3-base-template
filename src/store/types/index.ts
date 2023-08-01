// 帮助中心
export const HELP_KEY = 'help'
export const MAIN_KEY = 'main'

export interface IDefaultStoreStructure {
  state: any
  pageListData: any
  pageListCount: any
  getPageListData: (queryInfo: any) => Promise<any>
  getItemPageDataAction: (queryInfo: any) => Promise<any>
  createPageDataAction: (createData: any) => Promise<any>
  editPageDataAction: (editData: any) => Promise<any>
  deletePageDataAction: (deleteData: any) => Promise<any>
  sortPageDataAction: (sortData: any) => Promise<any>
}
