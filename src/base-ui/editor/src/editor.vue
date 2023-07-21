<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      v-model="editorValue"
      :default-config="{
        ...editorConfig,
        placeholder
      }"
      :mode="mode"
      :style="{ height: `${height}`, 'overflow-y': 'hidden' }"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  reactive,
  nextTick
} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type {
  IToolbarConfig,
  IEditorConfig,
  IDomEditor
} from '@wangeditor/editor'
import { ElMessage } from 'element-plus'

interface IProps {
  value: string
  mode: string
  height: string
  placeholder: any
}

const props = withDefaults(defineProps<IProps>(), {
  mode: 'default',
  height: '400px',
  placeholder: '请输入内容...'
})

const emits = defineEmits(['update:value'])

const editorRef = shallowRef()
const editorValue = ref<string>('')
const toolbarConfig = reactive<Partial<IToolbarConfig>>({})
const editorConfig = reactive<Partial<IEditorConfig>>({
  MENU_CONF: {
    uploadImage: {
      server: '/api/upload'
    }
  }
})

function handleCreated(editor: IDomEditor) {
  initEditor()
  editorRef.value = editor
}

function initEditor() {
  editorConfig.customAlert = (s: string, t: string) => {
    switch (t) {
      case 'success':
        ElMessage.success(s)
        break
      case 'info':
        ElMessage.info(s)
        break
      case 'warning':
        ElMessage.warning(s)
        break
      case 'error':
        ElMessage.error(s)
        break
      default:
        ElMessage.info(s)
        break
    }
  }
}

async function handleChange(event: any) {
  await nextTick()
  emits('update:value', event.getHtml())
}

onMounted(async () => {
  if (props.value) {
    await nextTick()
    editorValue.value = props.value
  }
})
// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (!editor) return
  editor.destroy()
})
</script>

<style scoped></style>
