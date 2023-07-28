<template>
  <div class="page-content">
    <hy-table
      v-bind="contentTableConfig"
      ref="tableRef"
      v-model:page="pageInfo"
      :list-data="dataList"
      :list-count="dataCount"
      :edit-table-draw="editTableDraw"
      :handle-draw="permissionList.isDrawTable"
      :show-header="showHeader"
      :show-search="showSearch"
      @drawTable="drawTable"
      @selectionChange="handleSelectionChange"
      @changePicker="handleChangePicker"
    >
      <!-- 用户标题操作 -->
      <template #titleHandler>
        <slot name="titleHandler"></slot>
      </template>
      <!-- 用户其他操作 -->
      <template #otherHandler>
        <slot name="otherHandler"></slot>
      </template>
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="permissionList.isCreate"
          type="primary"
          @click="handleNewClick"
        >
          新建数据
        </el-button>
        <el-button
          v-if="permissionList.isRefresh"
          icon="el-icon-refresh"
          @click="handleRefreshClick"
        ></el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.modTime) }}</span>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
      <!-- 操作插槽 -->
      <template #handler="scope">
        <!-- 扩展其他操作 -->
        <slot name="otherTableHandler" :row="scope.row"></slot>
        <el-button
          v-if="permissionList.isUpdate"
          type="text"
          @click="handleEditClick(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="permissionList.isDelete"
          type="text"
          style="color: #f56c6c; margin-right: 4px"
          @click="handleDeleteClick(scope.row)"
          >删除</el-button
        >
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'

import HyTable from '@/base-ui/table'
import { PermissionType } from '@/types/permission'
import { infoTipBox, successTip, errorTip } from '@/utils/tip-info'
import { storeToRefs } from 'pinia'

import { storeList } from '@/store'
import { IDefaultStoreStructure } from '@/store/types'

interface IProps {
  defaultSearchValue: any
  editTableDraw: boolean
  showHeader: boolean
  showSearch: boolean
  contentTableConfig: any
  pageName: string
}
const props = withDefaults(defineProps<IProps>(), {
  editTableDraw: false,
  showHeader: true,
  showSearch: false
})
const emit = defineEmits([
  'drawBtnClick',
  'newBtnClick',
  'editBtnClick',
  'removeBtnClick',
  'selectAllBtnClick',
  'distributionBtnClick',
  'operationBtnClick',
  'exportBtnClick',
  'rowBtnClick',
  'changePicker'
])

// TODO page-content 映射表格数据
let store: any
try {
  store = storeList[props.pageName]()
} catch (err) {
  console.error('请确保输入的名称有对应的 store')
}

const { pageListCount, pageListData } = storeToRefs(store)
const userSelectData = ref([])
const tableRef = ref()
// 0.获取操作的权限
const permission = props.contentTableConfig?.permission as PermissionType
const permissionList = reactive({
  isCreate: permission.add ?? false,
  isUpdate: permission.update ?? false,
  isDelete: permission.delete ?? false,
  isRefresh: permission.refresh ?? true,
  isQuery: permission.query ?? true,
  isOperation: permission.operation ?? false,
  isDistribution: permission.distribution ?? false,
  isExport: permission.export ?? false,
  isSelectAll: permission.selectAll ?? false,
  isDrawTable: permission.drawTable ?? false,
  isRowAdd: permission.rowAdd ?? false,
  isColumnAdd: permission.columnAdd ?? false,
  isColumnEdit: permission.columnEdit ?? false,
  isColumnDelete: permission.columnDelete ?? false
})

// 1.双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
const backQueryInfo = ref<any>({})
watch(pageInfo, () => {
  getPageData(backQueryInfo.value)
})
const handleRefreshClick = () => {
  // pageInfo.value = { currentPage: 1, pageSize: 10 }
  getPageData(backQueryInfo.value)
}
// 2.发送网络请求
const getPageData = (queryInfo: any = {}) => {
  if (queryInfo.currentPage) {
    delete queryInfo.currentPage
    delete queryInfo.pageSize
  }
  backQueryInfo.value = {
    ...queryInfo
  }
  if (!permissionList.isQuery) return
  store.getPageListData({
    currentPage: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    // currentPage: pageInfo.value.currentPage * pageInfo.value.pageSize, //使用偏移量
    ...backQueryInfo.value,
    ...props.defaultSearchValue
  })
}
getPageData()
// 完善 pinia 写法
let dataList = computed(() => pageListData.value(props.pageName))
const dataCount = computed(() => pageListCount.value(props.pageName))

// 4.获取其他的动态插槽名称
const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === 'status') return false
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return true
  }
)

// 5.删除/编辑/新建/多选/分配/操作日志/拖拽/批量操作/导出按钮
const handleDeleteClick = (item: any) => {
  infoTipBox({
    message: `您确定删除当前ID为${item.id}的数据吗`,
    title: '删除数据'
  })
    .then(store.deletePageDataAction(item))
    .catch(() => console.log('用户取消操作'))
}
// 拖动表格
const drawTable = async (data: any) => {
  try {
    const res = await store.sortPageDataAction(data)
    successTip(res)
  } catch (error: any) {
    errorTip(error)
  }
}
const handleExportClick = () => emit('exportBtnClick')
const handleSelectAllClick = () => emit('selectAllBtnClick', userSelectData)
// const handleDeleteClick = (item: any) => emit('removeBtnClick', item)
const handleNewClick = () => emit('newBtnClick')
const handleAddRowClick = (item: any) => emit('newBtnClick', item)
const handleEditClick = (item: any) => emit('editBtnClick', item)
// 这里只需要将用户选中的值传递出去就行
const handleSelectionChange = (item: any) => emit('selectAllBtnClick', item)
const handleDistributionClick = (item: any) =>
  emit('distributionBtnClick', item)
const handleOperationClick = (item: any) => emit('operationBtnClick', item)
const handleChangePicker = (item: any) => emit('changePicker', item)
</script>
