<template>
  <div v-if="showTags" class="tag_content">
    <div style="margin: 4px">
      <el-tag
        closable
        size="medium"
        v-for="(tag, index) in tagsList"
        :key="tag.title"
        :disable-transitions="true"
        :effect="isActive(tag.path) ? 'dark' : 'plain'"
        @close="closeTags(index)"
        @click="handleClick(tag)"
        style="margin-right: 6px; cursor: pointer"
      >
        {{ tag.title }}
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const isActive = (path: any) => {
  return path === route.fullPath
}
// TODO 获取 tags
const store = ref()
const tagsList = computed(() => store.value.state.tagsList)
const showTags = computed(() => tagsList.value.length > 0)
// 关闭单个标签
const closeTags = (index: number) => {
  //删除标签
  if (tagsList.value.length <= 1) {
    //最后一个标签不能删
    ElMessage.warning({
      message: '最后一个标签了哦！',
      type: 'warning',
      duration: 1000
    })
    return false
  }
  const delItem = tagsList.value[index]
  store.value.commit('delTagsItem', { index })
  const item = tagsList.value[index]
    ? tagsList.value[index]
    : tagsList.value[index - 1]
  if (item) {
    delItem.path === route.fullPath && router.push(item.path)
  } else {
    router.push('/')
  }
}
// 跳转到对应路由
const handleClick = (route: any) => {
  router.push({
    path: route.path
  })
}
// 设置标签
const setTags = (route: any) => {
  const isExist = tagsList.value.some((item: any) => {
    return item.path === route.fullPath
  })
  if (!isExist) {
    store.value.commit('setTagsItem', {
      name: route.name,
      title: route.meta.title,
      path: route.fullPath
    })
  }
}
setTags(route)
onBeforeRouteUpdate((to) => {
  setTags(to)
})
// 关闭全部标签
const closeAll = () => {
  store.value.commit('clearTags')
  router.push('/')
}
// 关闭其他标签
const closeOther = () => {
  const curItem = tagsList.value.filter((item: any) => {
    return item.path === route.fullPath
  })
  store.value.commit('closeTagsOther', curItem)
}
const handleTags = (command: string) => {
  command === 'other' ? closeOther() : closeAll()
}
</script>

<style lang="less" scoped>
.tag_content {
  padding: 6px 0px;
  margin: 0px 12px;
  box-sizing: border-box;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  overflow-x: auto;
  .tags {
    width: calc(100vw - 310px);
    overflow: auto;
  }
  .el-tag {
    cursor: pointer;
    margin-right: 8px;
    //height: 30px;
    //padding: 0px 13px 0 9px;
    //line-height: 28px;
    //border-radius: 0;
  }
  ::v-deep(.el-tag .el-icon-close) {
    color: rgb(97, 97, 97) !important;
  }
  ::v-deep(.el-tag .el-icon-close:hover) {
    background: none;
  }
  .tag_check {
    background-color: rgb(255, 255, 255) !important;
    border-color: rgb(255, 255, 255) !important;
    color: #409eff !important;
  }
  .tag_nocheck {
    background-color: rgb(255, 255, 255) !important;
    border-color: rgb(255, 255, 255) !important;
    color: rgb(97, 97, 97) !important;
  }
  .el-dropdown-link {
    text-align: center;
    height: 26px;
    display: block;
    width: 70px;
    background: #fff;
    line-height: 26px;
  }
}
</style>
