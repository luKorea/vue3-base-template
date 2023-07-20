<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="" />
    </div>
    <el-menu class="el-menu-vertical" :collapse="collapse">
      <nav-menu-item
        :menu-list="filterTableData"
        :default-value="defaultValue"
      ></nav-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { pathMapToMenu } from '@/utils/map-menus'
import userStore from '@/store/module/user'
import { storeToRefs } from 'pinia'
import navMenuItem from './nav-menu-item.vue'

interface IProps {
  collapse: boolean
}
withDefaults(defineProps<IProps>(), {
  collapse: false
})
// TODO nav-menu映射用户菜单列表
const store = userStore()
// TODO  1. 菜单映射修改

const { initState } = storeToRefs(store)
const userMenus = initState.value.userMenus
const searchValue = ref<any>('')
// route
const route = useRoute()
const currentPath = route.path

// data
const menu = pathMapToMenu(userMenus, currentPath)

const defaultValue = ref<string>(menu.id + '')
const expandRow = ref<any[]>([])
// 目前只做树形搜索
const filterTableData = computed(() => {
  if (searchValue.value !== '') {
    setExpandRow(userMenus)
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    expandRow.value = expandRow.value.join(',').split(',')
    return handleTreeData(userMenus, searchValue.value)
  } else {
    return userMenus
  }
})
//  树形表格过滤
const handleTreeData = (treeData: any, searchValue: any): any => {
  if (!treeData || treeData.length === 0) {
    return []
  }
  const array: any[] = []
  for (let i = 0; i < treeData.length; i += 1) {
    let match: any = false
    for (let pro in treeData[i]) {
      if (typeof treeData[i][pro] == 'string') {
        match |= treeData[i][pro].includes(searchValue)
        if (match) break
      }
    }
    if (handleTreeData(treeData[i].children, searchValue).length > 0 || match) {
      array.push({
        ...treeData[i],
        children: handleTreeData(treeData[i].children, searchValue)
      })
    }
  }
  return array
}
// 将过滤好的树形数据展开
const setExpandRow = (handleTreeData: any) => {
  if (handleTreeData.length) {
    for (let i of handleTreeData) {
      expandRow.value.push(i.id)
      if (i.children.length) {
        setExpandRow(i.children)
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-menu {
  overflow: hidden;
  overflow-y: auto;
  .logo {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 48px;
    img {
      height: 28px;
      width: 128px;
    }
  }
}
</style>
