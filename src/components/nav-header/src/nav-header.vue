<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <Expand v-if="isFold" />
      <Fold v-else />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import userStore from '@/store/module/user'
import { storeToRefs } from 'pinia'

const emits = defineEmits(['foldChange'])
const isFold = ref(false)
const handleFoldClick = () => {
  // isFold.value = !isFold.value
  emits('foldChange', isFold.value)
}

// nav-header头部映射用户菜单
const store = userStore()
const { initState } = storeToRefs(store)

const breadcrumbs = computed(() => {
  const route = useRoute()
  const currentPath = route.path
  return pathMapBreadcrumbs(initState.value.userMenus, currentPath)
})

console.log(breadcrumbs.value)
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
