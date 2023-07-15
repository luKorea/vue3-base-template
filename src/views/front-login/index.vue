<template>
  <div>
    <el-button @click="login">点击进入</el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/localCache'
import { useRouter } from 'vue-router'

const router = useRouter()

function login() {
  localCache.setCache('token', '90909090')
  router.push('/main')
}
</script>

<style scoped></style>
