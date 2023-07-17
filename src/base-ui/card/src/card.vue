<template>
  <el-card class="box-card" :shadow="shadow">
    <template #header>
      <div class="card-header">
        <span class="title">{{ title }}</span>
        <slot name="handler"></slot>
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

<script lang="ts" setup>
type ICard = 'always' | 'never' | 'hover'
interface IProps {
  title: string
  shadow: ICard
}
withDefaults(defineProps<IProps>(), {
  title: 'title',
  shadow: 'always'
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
