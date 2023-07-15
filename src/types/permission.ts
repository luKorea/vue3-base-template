export interface PermissionType {
  add?: boolean // 新增
  rowAdd?: boolean // 行增加
  update?: boolean // 编辑
  delete?: boolean // 删除
  query?: boolean // 查询
  refresh?: boolean // 刷新按钮
  drawTable?: boolean // 表格拖拽
  selectAll?: boolean // 批量操作
  operation?: boolean // 操作日志
  distribution?: boolean // 分配按钮
  export?: boolean // 导出

  // 单行编辑
  columnEdit?: boolean
  columnAdd?: boolean
  columnDelete?: boolean
}
