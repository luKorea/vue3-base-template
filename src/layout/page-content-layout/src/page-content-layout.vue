<template>
  <el-card v-if="state.loading">
    <HySkeleton :loading="state.loading"></HySkeleton>
  </el-card>
  <el-card v-else class="box-card" shadow="always">
    <template #header>
      <div class="card-header">
        <Hy-breadcrumb :breadcrumbs="breadcrumbs"></Hy-breadcrumb>
        <slot name="otherHandler"></slot>
      </div>
    </template>
    <div class="item">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import userStore from '@/store/module/user'
import { storeToRefs } from 'pinia'
import HyBreadcrumb from '@/base-ui/breadcrumb'
import HySkeleton from '@/base-ui/skeleton/index'
import useMainHooks from '@/hooks/use-main'

const { state } = useMainHooks()
const store = userStore()
const { initState } = storeToRefs(store)

const breadcrumbs = computed(() => {
  const route = useRoute()
  const currentPath = route.path
  return pathMapBreadcrumbs(initState.value.userMenus, currentPath)
})

defineOptions({
  name: 'PageContentLayout'
})
</script>

<style lang="less" scoped>
.box-card {
  :deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  .title {
    font-size: 14px;
    color: #b6b0b0;
  }
}

.item {
  // border: 1px solid red;
}
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
