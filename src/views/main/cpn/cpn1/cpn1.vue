<template>
  <hy-card title="表单使用">
    <el-space>
      <el-tag @click="handleNewData">侧边弹框表单</el-tag>
      <el-tag @click="handleNewDialogData">弹框表单</el-tag>
    </el-space>
  </hy-card>
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
import { reactive } from 'vue'
import { usePageModal, usePageDialog } from '@/hooks'

import { modalConfig } from './config/modal.config'
import { useStoreName } from './hooks/use-page-list'
import HyCard from '@/base-ui/card'

const { pageModalRef, defaultInfo, handleNewData } = usePageModal()
const {
  pageDialogRef,
  defaultInfo: dialogDefaultInfo,
  handleNewData: handleNewDialogData
} = usePageDialog()
const { operationName } = useStoreName()
const otherInfo = reactive<any>({})
</script>

<style scoped></style>
