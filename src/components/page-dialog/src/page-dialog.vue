<template>
  <div class="page-dialog">
    <el-dialog v-model="dialogVisible" v-bind="dialogOperation">
      <template #title>
        <div class="dialog-title">
          <!-- 优化展示标题 -->
          <slot name="titleHandler">
            <div class="hg-items-center hg-flex hg-text-left">
              <div class="hg-mr-1">{{ modalConfig?.title }}</div>
              <div class="hg-flex hg-flex-col hg-text-black hg-font-bold">
                <div v-if="formData.createOptName" style="font-size: 12px">
                  {{ formData.createTime }} 创建: {{ formData.createOptName }}
                </div>
                <div v-if="formData.auditOptName" style="font-size: 12px">
                  {{ formData.updateTime }} 最后修改:
                  {{ formData.auditOptName }}
                </div>
              </div>
            </div>
          </slot>
          <div class="dialog-operation">
            <el-icon size="20" @click="changeFullScreen">
              <FullScreen v-if="!dialogOperation.fullscreen" />
              <CircleClose v-else />
            </el-icon>
          </div>
        </div>
      </template>
      <template #default>
        <slot
          name="titleWrapper"
          :row="{
            data: formData,
            ref: pageFormRef
          }"
        ></slot>
        <hy-form
          ref="pageFormRef"
          v-bind="{
            colLayout: {
              xl: 24,
              lg: 24,
              md: 24,
              sm: 24,
              xs: 24
            },
            ...modalConfig
          }"
          @submit="getFormData"
          @changeSelect="handleChangeSelect"
          @remoteMethod="handleRemoteMethod"
          @uploadData="getUploadData"
        >
        </hy-form>
        <slot></slot>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-space>
            <!-- 新增自定义按钮，用于单页面中操作走不同请求操作, 增加延展性 -->
            <slot
              name="footerHandle"
              :row="{
                data: formData,
                ref: pageFormRef
              }"
            ></slot>
            <el-button
              v-if="btnOperation.showCancelBtn"
              @click="dialogVisible = false"
              >{{ btnOperation.showCancelText }}</el-button
            >
            <el-button
              v-if="btnOperation.showConfirmBtn"
              type="primary"
              :loading="btnLoading"
              @click="handleConfirmClick"
            >
              {{ btnOperation.showConfirmText }}
            </el-button>
          </el-space>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { successTip, errorTip } from '@/utils/tip-info'

import HyForm from '@/base-ui/form'
import md5 from 'md5'
import { IDefaultStoreStructure } from '@/store/types'
import { storeList } from '@/store'

interface IOperationName {
  editName: string
  createName: string
}
interface IBtnOperation {
  showConfirmBtn: boolean
  showConfirmText: string
  showCancelBtn: boolean
  showCancelText: string
}
interface IProps {
  modalConfig: any
  defaultInfo: any
  operationName: IOperationName
  otherInfo: any
  pageName: string
  btnOperation: IBtnOperation
}

const props = withDefaults(defineProps<IProps>(), {
  modalConfig: () => ({}),
  defaultInfo: () => ({}),
  otherInfo: () => ({}),
  operationName: () => ({
    editName: 'system/editPageDataAction',
    createName: 'system/createPageDataAction'
  }),
  btnOperation: () => ({
    showCancelBtn: true,
    showConfirmBtn: true,
    showConfirmText: '保存',
    showCancelText: '取消'
  })
})
const emit = defineEmits([
  'editClick',
  'addClick',
  'changeSelect',
  'remoteMethod',
  'uploadData',
  'otherOptions'
])
const dialogOperation = reactive({
  width: '50%',
  top: '2vh',
  draggable: false,
  showClose: false,
  closeOnClickModal: false,
  closeOnPressEscape: false,
  destroyOnClose: true,
  fullscreen: false
})

function changeFullScreen() {
  dialogOperation.fullscreen = !dialogOperation.fullscreen
}
// 获取表单组件，监听表单是否填写完整
const pageFormRef = ref<InstanceType<typeof HyForm> | null>(null)
const formData = ref<any>({})
const dialogVisible = ref(false)
const btnLoading = ref(false)
function getFormData(newValue: any) {
  formData.value = newValue
}
// 点击确定按钮的逻辑
// TODO page-form store 处理
let store: IDefaultStoreStructure
try {
  store = storeList[props.pageName]()
} catch (err) {
  console.error('请确保输入的名称有对应的 store')
}
const handleConfirmClick = async () => {
  if (pageFormRef.value) {
    try {
      btnLoading.value = true
      const formData: any = await pageFormRef.value.validateForm()
      if (formData.pwd) {
        formData.value.pwd = md5(formData.value.pwd)
      }
      // 编辑
      if (props.defaultInfo.isEdit && Object.keys(props.defaultInfo).length) {
        try {
          const res = await store.editPageDataAction({
            ...props.defaultInfo,
            ...formData,
            ...props.otherInfo
          })
          successTip('操作成功')
          btnLoading.value = false
          // 如果hideDialog为false, 关闭当前页面, 做其他操作
          if (!res.hideDialog) {
            dialogVisible.value = false
            emit('otherOptions', res, 'edit')
          } else {
            // 如果hideDialog为true, 不关闭当前页面, 做其他操作
            emit('otherOptions', res, 'edit')
          }
        } catch (error: any) {
          errorTip(error)
          btnLoading.value = false
        }
      } else {
        // 新建
        try {
          const res = await store.createPageDataAction({
            ...formData,
            ...props.otherInfo,
            ...props.defaultInfo
          })
          successTip('操作成功')
          btnLoading.value = false
          // 如果hideDialog为false, 关闭当前页面, 做其他操作
          if (!res.hideDialog) {
            dialogVisible.value = false
            emit('otherOptions', res, 'add')
          } else {
            // 如果hideDialog为true, 不关闭当前页面, 做其他操作
            emit('otherOptions', res, 'add')
          }
        } catch (error: any) {
          errorTip(error)
          btnLoading.value = false
        }
      }
    } catch (error) {
      btnLoading.value = false
    }
  }
}
// 表单事件监听
const handleChangeSelect = (item: any) => {
  emit('changeSelect', item)
}
const handleRemoteMethod = (item: any) => {
  console.log(item)
  // emit('remoteMethod', item)
}
const getUploadData = (data: any) => {
  emit('uploadData', data)
}

defineExpose({
  dialogVisible
})
</script>

<style scoped lang="less">
.page-dialog {
  :deep(.el-dialog) {
    border-radius: 10px !important;
  }
  :deep(.el-dialog__body) {
    height: calc(100vh - 120px);
    overflow: hidden;
    overflow-y: auto;
  }
  :deep(.el-dialog .el-dialog__header) {
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    margin-right: 0;
    padding-bottom: 20px;
  }
  .dialog-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dialog-operation {
    cursor: pointer;
  }
}
.hide-border {
  border-radius: 0 !important;
}
</style>
