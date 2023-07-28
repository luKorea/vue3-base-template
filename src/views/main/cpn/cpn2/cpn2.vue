<template>
  <page-content-layout>
    <page-search
      :search-form-config="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    >
    </page-search>
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
import { searchFormConfig } from './config/search.config'

import { usePageSearch } from '@/hooks'

const { handleResetClick, handleQueryClick, pageContentRef } = usePageSearch()
</script>

<style scoped></style>
