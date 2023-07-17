<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      :width="width"
      top="10vh"
      v-bind="dialogOperation"
    >
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

interface IProps {
  width: string
}

withDefaults(defineProps<IProps>(), {
  width: '50%'
})

const dialogVisible = ref(false)
const dialogOperation = reactive({
  showClose: false,
  closeOnClickModal: false,
  closeOnPressEscape: false,
  destroyOnClose: false,
  fullscreen: false
})
</script>
