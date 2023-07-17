<template>
  <!-- 递归实现无限子菜单 -->
  <template v-for="item in menuList" :key="item.id">
    <template v-if="item.children && item.children.length">
      <el-sub-menu :index="item.id + ''">
        <template #title>
          <i v-if="item.icon" :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <nav-menu-item :menu-list="item.children"></nav-menu-item>
      </el-sub-menu>
    </template>
    <!-- 情况二：没子集的情况 -->
    <el-menu-item
      v-else
      :class="item.id == selectIndex && 'select'"
      :index="item.id + ''"
      @click="handleMenuItem(item)"
    >
      <i v-if="item.icon" :class="item.icon"></i>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

interface IProps {
  defaultValue: string
  menuList: any[]
}
const props = defineProps<IProps>()

const router = useRouter()
const selectIndex = ref<any>()
watchEffect(() => {
  if (props.defaultValue) {
    selectIndex.value = props.defaultValue
  }
})
const handleMenuItem = (item: any) => {
  selectIndex.value = item.id
  router.push({
    path: item.url ?? '/not-found'
  })
}
</script>
