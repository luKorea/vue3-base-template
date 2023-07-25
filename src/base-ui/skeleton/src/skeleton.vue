<template>
  <el-skeleton :rows="rows" :loading="loading" animated>
    <slot></slot>
  </el-skeleton>
</template>

<script setup lang="ts">
interface IProps {
  rows: number
  loading: boolean
}

withDefaults(defineProps<IProps>(), {
  rows: 20
})
</script>

<style scoped></style>
