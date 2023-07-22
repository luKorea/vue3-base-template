<template>
  <div class="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="w-auto h-10 mx-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="formData.username"
              required
              type="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="formData.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="handleLogin"
          >
            Sign in
          </button>
        </div>
      </div>

      <p class="mt-10 text-sm text-center text-gray-500">
        Not a member?
        <a
          href="#"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Start a 14 day free trial</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import userStore from '@/store/module/user'
import { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import type { IFormData } from '@/store/module/user'

const router = useRouter()
const user = userStore()

type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()

const formData = reactive<IFormData>({
  username: '',
  password: ''
})
const formRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const loading = ref(false)

function handleLogin() {
  formRef.value?.validate((valid) => {
    if (valid) {
      loading.value = true
      user.login(formData).then(() => {
        setTimeout(() => {
          loading.value = false
          router.push('/main')
        }, 2000)
      })
    }
  })
}
</script>

<style scoped lang="less">
@primary-color: #409eff;
@success-color: #67c23a;
@warning-color: #e6a23c;
@error-color: #f56c6c;

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  :deep(.el-form-item__label) {
    color: #606266;
  }

  :deep(.el-input__inner) {
    border-color: #dcdfe6 !important;
  }

  :deep(.el-button--primary) {
    background-color: @primary-color !important;
    border-color: @primary-color !important;
  }

  :deep(.el-button--primary:hover) {
    background-color: darken(@primary-color, 10%) !important;
  }

  :deep(.el-button--primary:focus, .el-button--primary:active) {
    background-color: lighten(@primary-color, 10%) !important;
  }

  :deep(.el-button--round) {
    border-radius: 20px !important;
  }
}

.login-container {
  width: 400px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-header {
  padding: 30px;
  background-color: @primary-color;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.login-title {
  margin-bottom: 10px;
  font-size: 24px;
}

.login-subtitle {
  font-size: 14px;
}

.login-body {
  padding: 30px;
}

.login-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  span {
    margin-right: 10px;
    font-size: 14px;
    color: #606266;
  }

  a {
    font-size: 14px;
    color: @primary-color;

    &:hover {
      color: darken(@primary-color, 10%);
    }
  }
}
</style>
