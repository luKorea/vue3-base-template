import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '问题管理',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'title', label: '备注' },
    { prop: 'typeDec', label: '问题类型' },
    { prop: 'isHot', label: '热门', slotName: 'isHot' },
    { prop: 'state', label: '状态', slotName: 'isState' },
    { prop: 'createTime', label: '发布时间' },
    { prop: 'modUser', label: '操作人' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: false,
    update: false,
    delete: false,
    drawTable: false
  }
}
