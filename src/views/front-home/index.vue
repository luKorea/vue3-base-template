<template>
  <HySkeleton v-model:loading="loading" />
  <div v-if="!loading">这是首页</div>
</template>

<script setup lang="ts">
import HySkeleton from '@/base-ui/skeleton'
import { ref } from 'vue'

const loading = ref(true)
</script>

<style scoped></style>
