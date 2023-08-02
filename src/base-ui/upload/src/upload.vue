<template>
  <el-upload
    ref="uploadRef"
    class="custom-uploader"
    :auto-upload="false"
    :http-request="customUpload"
    :on-progress="handleProgress"
    :disabled="uploading"
    :multiple="multiple"
    :file-list="value"
    :list-type="listType"
    :limit="limit"
  >
    <template #default>
      <template v-if="!uploading">
        <el-icon><plus /></el-icon>
      </template>
      <template v-else>
        <el-progress type="circle" :percentage="uploadProgress"></el-progress>
      </template>
    </template>
    <template #file="{ file }">
      <div style="width: 100%; height: 100%">
        <el-image
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          fit="cover"
        />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!uploading"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible" width="50%">
    <div class="img">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElUpload, ElProgress, UploadProgressEvent } from 'element-plus'

type IListType = 'text' | 'picture' | 'picture-card'
interface IProps {
  uploadUrl: string
  multiple: boolean
  value: any[]
  listType: IListType
  drag: boolean
  limit: number
}

const props = withDefaults(defineProps<IProps>(), {
  multiple: false,
  uploadUrl: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
  listType: 'picture-card',
  drag: false,
  limit: 0
})

const emit = defineEmits(['update:value'])
// Refs
const uploadRef = ref<InstanceType<typeof ElUpload> | null>(null)
const uploading = ref(false)
const uploadProgress = ref(0)
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const customUpload = async (file: File) => {
  uploading.value = true
  // Simulate file upload process
  const uploadDelay = 100
  const totalProgressSteps = 100 / uploadDelay

  for (let step = 0; step <= totalProgressSteps; step++) {
    uploadProgress.value = Math.min(step * uploadDelay, 100)
    await new Promise((resolve) => setTimeout(resolve, uploadDelay))
  }
  uploading.value = false
  uploadProgress.value = 0
}

function handleProgress(evt: UploadProgressEvent) {
  console.log(evt, 'evt')
}

const handleRemove = (file: File) => {
  const newValue = props.value.filter((item: any) => item.name !== file.name)
  emit('update:value', newValue)
}

function handlePreview(file: any) {
  dialogVisible.value = true
  dialogImageUrl.value = file.url!
}
</script>

<style lang="less" scoped>
.custom-uploader {
  :deep(.el-upload-list--picture-card .el-progress) {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 5px 10px;
    .el-progress-circle {
      width: 100% !important;
      height: 100% !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.preview-dialog {
  .img {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
