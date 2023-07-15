import { PermissionType } from '@/types/permission'

export interface TableConfig {
  title?: string
  propList: any[]
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  showSummary?: boolean // 是否显示合计行
  summaryTextPosition?: string // 合计行显示名称位置
  sumText?: string // 合计行显示名称
  propertyList?: any[] // 需要合并的字段
  showFooter?: boolean
  permission?: PermissionType
  handleDraw?: boolean
  childrenProps?: any
  isEdit?: boolean
  editInfo?: any
}
