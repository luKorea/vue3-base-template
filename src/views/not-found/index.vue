<template>
  <div class="not-found">
    <img class="img" src="@/assets/404.svg" alt="" />
    <div class="error-code">{{ errorInfo.code }}</div>
    <div class="error-message">{{ errorInfo.errorMessage }}</div>
    <div class="error-btn" @click="goHome">Back Home</div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

interface IErrorType {
  code: number
  errorMessage: string
}
const router = useRouter()
const errorInfo = reactive<IErrorType>({
  code: 404,
  errorMessage: 'Sorry, the page you visited does not exist.'
})

function goHome() {
  router.push('/')
}
</script>

<style scoped lang="less">
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  .img {
    width: 362px;
    height: 362px;
  }
  .error-code {
    color: rgba(0, 0, 0, 0.85);
    font-size: 24px;
    line-height: 1.8;
    text-align: center;
  }
  .error-message {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 32px;
  }
  .error-btn {
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    cursor: pointer;
    user-select: none;
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
  }
}
</style>
