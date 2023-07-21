<template>
  <page-content-layout>
    <el-space>
      <el-tag @click="handleNewData">侧边弹框表单</el-tag>
      <el-tag @click="handleNewDialogData">弹框表单</el-tag>
    </el-space>
    <el-divider />
    <div>
      <el-space><el-tag>富文本编辑器</el-tag></el-space>
      <div>{{ editorValue }}</div>
      <hy-editor v-model:value="editorValue"></hy-editor>
    </div>
  </page-content-layout>
  <page-modal
    ref="pageModalRef"
    :default-info="defaultInfo"
    page-name="questions"
    :modal-config="modalConfig"
    :operation-name="operationName"
    :other-info="otherInfo"
  >
    <template #titleWrapper>
      <el-tag type="success">扩展头部区域</el-tag>
    </template>
    <el-tag type="success">扩展表单区域</el-tag>
  </page-modal>
  <page-dialog
    ref="pageDialogRef"
    :default-info="dialogDefaultInfo"
    page-name="questions"
    :modal-config="modalConfig"
    :operation-name="operationName"
    :other-info="otherInfo"
  >
    <template #titleWrapper>
      <el-tag type="success">扩展头部区域</el-tag>
    </template>
    <el-tag type="success">扩展表单区域</el-tag>
  </page-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { usePageModal, usePageDialog } from '@/hooks'

import { modalConfig } from './config/modal.config'
import { useStoreName } from './hooks/use-page-list'
import HyEditor from '@/base-ui/editor'

const { pageModalRef, defaultInfo, handleNewData } = usePageModal()
const {
  pageDialogRef,
  defaultInfo: dialogDefaultInfo,
  handleNewData: handleNewDialogData
} = usePageDialog()
const { operationName } = useStoreName()
const otherInfo = reactive<any>({})
const editorValue = ref<string>('扩展表单区域')
</script>

<style scoped></style>
