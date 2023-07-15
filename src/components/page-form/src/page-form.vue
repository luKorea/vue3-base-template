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
          v-if="showCancelBtn"
          size="mini"
          @click="dialogVisible = false"
          >{{ cancelText }}</el-button
        >
        <el-button
          v-if="showConfirmBtn"
          size="mini"
          type="primary"
          @click="handleConfirmClick"
        >
          {{ confirmText }}
        </el-button>
      </div>
    </div>
    <hy-form
      ref="pageFormRef"
      v-bind="modalConfig"
      v-model="formData"
      @changeSelect="handleChangeSelect"
      @remoteMethod="handleRemoteMethod"
      @uploadData="getUploadData"
    ></hy-form>
    <slot></slot>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { successTip, errorTip } from '@/utils/tip-info'

import HyForm from '@/base-ui/form'
import md5 from 'md5'
import { _debounce } from '@/utils'

interface IOperationName {
  editName: string
  createName: string
}

interface IProps {
  modalConfig: any
  defaultInfo: any
  operationName: IOperationName
  otherInfo: any
  showCancelBtn: boolean
  showConfirmBtn: boolean
  showConfigBtn: boolean
  pageName: string
  confirmText: string
  cancelText: string
}

const props = withDefaults(defineProps<IProps>(), {
  modalConfig: () => ({}),
  defaultInfo: () => ({}),
  otherInfo: () => ({}),
  showCancelBtn: true,
  showConfirmBtn: true,
  confirmText: '保存',
  cancelText: '取消',
  operationName: () => ({
    editName: 'system/editPageDataAction',
    createName: 'system/createPageDataAction'
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
const formData = ref<any>({})
// 获取表单组件，监听表单是否填写完整
const pageFormRef = ref<InstanceType<typeof HyForm>>()
// 监听defaultInfo值得变化，动态修改表单字段得值
watch(
  () => props.defaultInfo,
  (newValue) => {
    if (props?.modalConfig?.formItems) {
      for (const item of props.modalConfig.formItems) {
        if (item.type === 'checkbox') {
          formData.value[item.field] = []
        } else
          formData.value[`${item.field}`] =
            item.defaultValue ?? newValue[`${item.field}`]
      }
    }
  }
)

// 点击确定按钮的逻辑
// TODO page-form store 处理
const store = ref()
const handleConfirmClick = _debounce(() => {
  const formRef = pageFormRef.value?.formRef
  formRef?.validate((valid: any) => {
    if (valid) {
      if (formData.value.pwd) {
        formData.value.pwd = md5(formData.value.pwd)
      }
      if (props.defaultInfo.isEdit && Object.keys(props.defaultInfo).length) {
        console.log(formData.value, '表单中的数据', props.otherInfo, '其他数据')
        // 编辑
        store.value
          .dispatch(props.operationName.editName, {
            pageName: props.pageName,
            editData: {
              ...props.defaultInfo,
              ...formData.value,
              ...props.otherInfo
            }
          })
          .then((res: any) => {
            successTip('操作成功')
            // 如果hideDialog为false, 关闭当前页面, 做其他操作
            if (!res.hideDialog) {
              dialogVisible.value = false
              emit('otherOptions', res, 'edit')
            } else {
              // 如果hideDialog为true, 不关闭当前页面, 做其他操作
              emit('otherOptions', res, 'edit')
            }
          })
          .catch((err: any) => {
            dialogVisible.value = true
            errorTip(err)
          })
      } else {
        // 新建
        store.value
          .dispatch(props.operationName.createName, {
            pageName: props.pageName,
            newData: {
              ...formData.value,
              ...props.otherInfo,
              ...props.defaultInfo
            }
          })
          .then((res: any) => {
            successTip('操作成功')
            // 如果hideDialog为false, 关闭当前页面, 做其他操作
            if (!res.hideDialog) {
              dialogVisible.value = false
              emit('otherOptions', res, 'add')
            } else {
              // 如果hideDialog为true, 不关闭当前页面, 做其他操作
              emit('otherOptions', res, 'add')
            }
          })
          .catch((err: any) => {
            dialogVisible.value = true
            errorTip(err)
          })
      }
    } else return false
  })
}, 500)
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
</script>

<style>
.el-drawer__body {
  overflow: auto !important;
}
.el-drawer__header {
  margin-bottom: 0 !important;
  padding-bottom: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
}
</style>
<style scoped lang="less">
.page-modal {
  .modal-title {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    color: #fff;
  }
}
</style>

<style>
.el-drawer__header {
  background: linear-gradient(90deg, #a9c9ff, #ffbbec);
  padding: 10px 20px;
}
.search-title {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgb(182, 176, 176);
}
</style>
