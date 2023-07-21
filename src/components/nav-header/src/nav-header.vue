<template>
  <div class="nav-header">
    <div class="left">
      <el-icon class="fold-menu" @click="handleFoldClick">
        <Expand v-if="isFold" />
        <Fold v-else />
      </el-icon>
    </div>
    <div class="right">
      <el-dropdown>
        <div class="right-title">
          Dropdown List
          <el-icon class="right-icon">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const emits = defineEmits(['foldChange'])
const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emits('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .fold-menu {
    font-size: 24px;
    cursor: pointer;
    color: #ababab;
  }
  .right {
    height: 48px;
    .right-title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      line-height: 48px;
    }
    .right-icon {
      margin-left: 6px;
    }
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
