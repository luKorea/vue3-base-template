<template>
  <el-card v-if="dialogVisible" style="width: 100%">
    <div class="search-title">
      <!-- 优化展示标题 -->
      <slot name="titleHandler">
        <div>{{ modalConfig.title }}</div>
      </slot>
      <div>
        <slot name="otherHandle"></slot>
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
      </div>
    </div>
    <hy-form
      ref="pageFormRef"
      v-bind="modalConfig"
      @submit="getFormData"
      @changeSelect="handleChangeSelect"
      @remoteMethod="handleRemoteMethod"
      @uploadData="getUploadData"
    ></hy-form>
    <slot></slot>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { successTip, errorTip } from '@/utils/tip-info'

import HyForm from '@/base-ui/form'
import md5 from 'md5'

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
const dialogVisible = ref(false)
const btnLoading = ref(false)
// 获取表单组件，监听表单是否填写完整
const pageFormRef = ref<InstanceType<typeof HyForm> | null>(null)
const formData = ref<any>({})
function getFormData(newValue: any) {
  formData.value = newValue
}
// 点击确定按钮的逻辑
// TODO page-form store 处理
const store = ref()
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
          const res = await store.value.dispatch(props.operationName.editName, {
            pageName: props.pageName,
            editData: {
              ...props.defaultInfo,
              ...formData,
              ...props.otherInfo
            }
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
          const res = await store.value.dispatch(
            props.operationName.createName,
            {
              pageName: props.pageName,
              newData: {
                ...formData,
                ...props.otherInfo,
                ...props.defaultInfo
              }
            }
          )
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
.page-modal {
  :deep(.el-drawer__body) {
    overflow: auto !important;
  }
  :deep(.el-drawer__header) {
    margin-bottom: 0 !important;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    padding: 10px 20px;
  }
  .search-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: rgb(182, 176, 176);
  }
}
</style>
