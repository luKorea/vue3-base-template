<template>
  <el-card>
    <div class="search-title">
      <div>高级检索</div>
      <div
        class="header"
        style="cursor: pointer"
        @click="changeFormVisible = !changeFormVisible"
      >
        <span>{{ changeFormVisible ? '收缩' : '展开' }}</span>
        <el-icon>
          <template v-if="changeFormVisible">
            <arrow-up />
          </template>
          <template v-else>
            <arrow-down />
          </template>
        </el-icon>
      </div>
    </div>
    <!-- 将 v-if 条件修改为v-show,避免数据回显时.因状态改变数据展示失败 -->
    <hy-form
      v-show="changeFormVisible"
      v-bind="searchFormConfig"
      ref="formRef"
      :class="
        !changeFormVisible
          ? 'animate__animated animate__fadeOut'
          : 'animate__animated animate__fadeIn'
      "
      @changeInput="handleQueryClick"
      @submit="getFormData"
    >
      <!-- 其他插槽 -->
      <template #other>
        <slot></slot>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="Search" @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HyForm from '@/base-ui/form'

interface IProps {
  searchFormConfig: any
  searchInfo: any
}

interface IFormData {
  [key: string]: any
}

withDefaults(defineProps<IProps>(), {
  searchInfo: {}
})

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

const formRef = ref<InstanceType<typeof HyForm> | null>(null)
const changeFormVisible = ref<boolean>(true)

const formData = ref<IFormData>({})
function getFormData(data: IFormData) {
  formData.value = data
}
// 2.优化二: 当用户点击重置
const handleResetClick = () => {
  formRef?.value.initFormData(true)
  emit('resetBtnClick', formData.value)
}

// 3.优化三: 当用户点击搜索
const handleQueryClick = () => {
  emit('queryBtnClick', {
    ...formData.value
  })
}
</script>

<style scoped lang="less">
.search-title {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgb(182, 176, 176);
}
.page-search {
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
}
.header {
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
  cursor: pointer;
}
.handle-btns {
  display: flex;
  justify-content: flex-end;
}
</style>
