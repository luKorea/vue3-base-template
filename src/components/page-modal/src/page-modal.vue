<template>
  <div class="page-modal">
    <el-drawer v-model="dialogVisible" v-bind="drawerOperation">
      <template #title>
        <div class="modal-title">
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
          <span class="dialog-footer">
            <el-space>
              <!-- 新增自定义按钮，用于单页面中操作走不同请求操作, 增加延展性 -->
              <slot
                name="otherModalHandler"
                :row="{
                  data: formData,
                  ref: pageFormRef
                }"
              ></slot>
              <el-button
                v-if="btnOperation.showCancelBtn"
                size="mini"
                @click="dialogVisible = false"
                >{{ btnOperation.showCancelText }}</el-button
              >
              <el-button
                v-if="btnOperation.showConfirmBtn"
                size="mini"
                type="primary"
                @click="handleConfirmClick"
              >
                {{ btnOperation.showConfirmText }}
              </el-button>
            </el-space>
          </span>
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
          v-bind="modalConfig"
          v-model="formData"
          @changeSelect="handleChangeSelect"
          @remoteMethod="handleRemoteMethod"
          @uploadData="getUploadData"
        >
        </hy-form>
        <slot></slot>
      </template>
    </el-drawer>
  </div>
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
  drawerOperation: any
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
  }),
  drawerOperation: () => ({
    size: '85%',
    direction: 'rtl',
    draggable: true,
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    destroyOnClose: false
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
const pageFormRef = ref<InstanceType<typeof HyForm> | null>(null)
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

defineExpose({
  dialogVisible
})
</script>

<style scoped lang="less">
.page-modal {
  :deep(.el-drawer__header) {
    margin-bottom: 0 !important;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    padding: 10px 20px;
  }
  .modal-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
