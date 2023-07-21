<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { IBreadcrumb } from '../types'

interface IProps {
  breadcrumbs: IBreadcrumb[]
}
defineProps<IProps>()
</script>

<style scoped lang="less">
.nav-breadcrumb {
  :deep(.el-breadcrumb__item .el-breadcrumb__inner) {
    color: #00000073 !important;
  }
  :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
    color: var(--el-color-primary) !important;
  }
}
</style>
