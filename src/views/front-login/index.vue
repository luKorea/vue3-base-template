<template>
  <div>
    <el-button @click="login">点击进入</el-button>
  </div>
</template>

<script setup lang="ts">
import userStore from '@/store/module/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = userStore()

function login() {
  user.login().then(() => {
    router.push('/main')
  })
}
</script>

<style scoped></style>
