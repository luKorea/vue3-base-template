<template>
  <page-content-layout>
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      :page-name="HELP_KEY"
    ></page-content>
  </page-content-layout>
</template>

<script setup lang="ts">
import { HELP_KEY } from '@/store/types'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
