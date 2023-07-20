<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <i-ep-expand v-if="isFold"></i-ep-expand>
      <i-ep-fold v-else></i-ep-fold>
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

const emits = defineEmits(['foldChange'])
const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emits('foldChange', isFold.value)
}

// nav-header头部映射用户菜单
const store = ref<any>()
// const breadcrumbs = computed(() => {
//   const userMenus = store.value.state.login.userMenus
//   const route = useRoute()
//   const currentPath = route.path
//   return pathMapBreadcrumbs(userMenus, currentPath)
// })
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;

  .fold-menu {
    font-size: 24px;
    cursor: pointer;
    color: #ababab;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
