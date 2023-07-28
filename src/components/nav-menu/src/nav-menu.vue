<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" />
      <span v-if="!collapse">{{ defaultSetting.title }}</span>
    </div>
    <el-menu
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse="collapse"
      :default-active="defaultValue"
    >
      <nav-menu-item
        :menu-list="filterTableData"
        :default-value="defaultValue"
        :collapse="collapse"
      ></nav-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { pathMapToMenu } from '@/utils/map-menus'
import userStore from '@/store/module/user/user'
import { storeToRefs } from 'pinia'
import navMenuItem from './nav-menu-item.vue'

import variables from '@/assets/css/variables.module.less'
import defaultSetting from '@/settings'

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
  :deep(.el-menu) {
    border-right: none;
  }
  .logo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    margin: 0;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 14px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    text-align: center;
    img {
      width: 15px;
      height: 15px;
    }
  }
}
</style>
@/store/module/user/user
