<template>
  <page-content-layout>
    <el-space>
      <el-tag @click="openModal">侧边弹框表单</el-tag>
      <el-tag @click="handleNewDialogData">弹框表单</el-tag>
      <el-tag>插件使用: {{ $translate('greetings.hello') }}</el-tag>
    </el-space>
    <el-divider />
    <el-space>
      <el-tag>图片上传</el-tag>
      <hy-upload v-model:value="uploadValue"></hy-upload>
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
    page-name="help"
    :modal-config="modalConfig"
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
import HyEditor from '@/base-ui/editor'
import http from '@/service'
import HyUpload from '@/base-ui/upload'

const { pageModalRef, defaultInfo, handleNewData } = usePageModal()
const {
  pageDialogRef,
  defaultInfo: dialogDefaultInfo,
  handleNewData: handleNewDialogData
} = usePageDialog()
const otherInfo = reactive({})
const uploadValue = ref<any[]>()
const editorValue = ref<string>('扩展表单区域')

async function openModal() {
  handleNewData({})
  const res = await http.get({
    url: '/home/goodprice'
  })
}
</script>

<style scoped></style>
