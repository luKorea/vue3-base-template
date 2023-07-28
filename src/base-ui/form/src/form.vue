<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form
      ref="formRef"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :model="formData"
      class="animate__animated animate__fadeIn"
    >
      <el-row :gutter="16">
        <template v-for="item in formItems" :key="item.label">
          <template v-if="item.type === 'divider'">
            <el-divider style="width: 100%">{{ item.label }}</el-divider>
          </template>
          <el-col
            v-if="!item.isHidden && item.type !== 'editor'"
            v-bind="colLayout"
          >
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              :prop="item.field"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  clearable
                  :placeholder="
                    item.placeholder ? item.placeholder : `请输入${item.label}`
                  "
                  :show-password="item.type === 'password'"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                />
              </template>
              <!--扩展数字插槽-->
              <template v-if="item.type === 'inputSlot'">
                <el-input
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  clearable
                  :placeholder="
                    item.placeholder ? item.placeholder : `请输入${item.label}`
                  "
                  :data-clipboard-text="'测试一下'"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                >
                </el-input>
              </template>
              <template v-if="item.type === 'textarea'">
                <el-input
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  clearable
                  :placeholder="
                    item.placeholder ? item.placeholder : `请输入${item.label}`
                  "
                  type="textarea"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                />
              </template>
              <template v-if="item.type === 'number'">
                <el-input
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  type="number"
                  :placeholder="
                    item.placeholder ? item.placeholder : `请输入${item.label}`
                  "
                  style="width: 100%"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                />
              </template>
              <template v-if="item.type === 'inputNumber'">
                <div class="hg-flex">
                  <div
                    v-if="item.prepend"
                    class="hg-mr-1"
                    style="min-width: 50px"
                  >
                    {{ item.prepend }}
                  </div>
                  <el-input-number
                    v-bind="item.otherOptions"
                    v-model="formData[item.field]"
                    :placeholder="
                      item.placeholder
                        ? item.placeholder
                        : `请输入${item.label}`
                    "
                    style="width: 100%"
                    type="number"
                    @keyup.enter="handleKeyUp"
                    @clear="handleClear"
                  >
                  </el-input-number>
                  <div
                    v-if="item.append"
                    class="hg-ml-1"
                    style="min-width: 40px"
                  >
                    {{ item.append }}
                  </div>
                </div>
              </template>
              <template v-else-if="item.type === 'switch'">
                <el-switch
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  :active-value="1"
                  :inactive-value="0"
                />
              </template>
              <template v-else-if="item.type === 'radio'">
                <el-radio-group
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  :placeholder="
                    item.placeholder ? item.placeholder : `请输入${item.label}`
                  "
                  style="width: 100%"
                  class="hg-flex"
                  clearable
                  @change="handleChangeSelect"
                  @clear="handleClear"
                >
                  <el-radio
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{ option.title }}
                  </el-radio>
                </el-radio-group>
              </template>

              <template v-else-if="item.type === 'checkbox'">
                <el-checkbox-group
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  :placeholder="
                    item.placeholder ? item.placeholder : `请选择${item.label}`
                  "
                  style="width: 100%"
                  class="hg-flex hg-flex-wrap"
                >
                  <el-checkbox
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{ option.title }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  clearable
                  filterable
                  :placeholder="
                    item.placeholder ? item.placeholder : `请选择${item.label}`
                  "
                  style="width: 100%"
                  :disabled="item.disabled"
                  @change="handleChangeSelect($event, item.field, item.options)"
                  @clear="handleClear"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <!-- 远程搜索下拉框 selectRemote -->
              <template v-else-if="item.type === 'selectRemote'">
                <el-select
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  clearable
                  filterable
                  remote
                  reserve-keyword
                  :placeholder="
                    item.placeholder ? item.placeholder : `请选择${item.label}`
                  "
                  :remote-method="handleRemoteMethod($event, item.field)"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>

              <template v-else-if="item.type === 'cascader'">
                <el-cascader
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  :options="item.options"
                  :placeholder="
                    item.placeholder ? item.placeholder : `请选择${item.label}`
                  "
                  style="width: 100%"
                  clearable
                  filterable
                ></el-cascader>
              </template>

              <template v-else-if="item.type === 'treeSelect'">
                <el-select
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  :placeholder="
                    item.placeholder ? item.placeholder : `请选择${item.label}`
                  "
                  style="width: 100%"
                  clearable
                >
                  <el-option style="height: auto">
                    <el-tree
                      :data="item.options"
                      highlight-current
                      check-on-click-node
                      :props="{ label: 'title', children: 'children' }"
                    />
                  </el-option>
                </el-select>
              </template>

              <template
                v-else-if="
                  item.type === 'datepicker' ||
                  item.type === 'datetimerange' ||
                  item.type === 'date' ||
                  item.type === 'datetime' ||
                  item.type === 'daterange'
                "
              >
                <el-date-picker
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  style="width: 100%"
                  :type="item.type"
                ></el-date-picker>
              </template>
              <template v-else-if="item.type === 'timePicker'">
                <el-time-picker
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                  style="width: 100%"
                  :type="item.type"
                ></el-time-picker>
              </template>
              <template v-if="item.type === 'inputRange'">
                <el-input
                  v-bind="item.otherOptions"
                  v-model="formData[item.startValue]"
                  clearable
                  placeholder="请输入起始值"
                  style="width: 49%"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                />
                <span style="margin: 0 1px">-</span>
                <el-input
                  v-bind="item.otherOptions"
                  v-model="formData[item.endValue]"
                  clearable
                  placeholder="请输入结束值"
                  style="width: 49%"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                />
              </template>

              <!-- 扩展自定义插槽 -->
              <template v-else-if="item.type === 'custom'">
                <slot :name="item.slotName" :scope="item"> </slot>
              </template>
            </el-form-item>
          </el-col>
          <el-col v-if="item.type === 'editor'" :span="24">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              :prop="item.field"
            >
              <hy-editor
                v-model:value="formData[item.field]"
                :placeholder="item.placeholder"
              ></hy-editor>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <slot name="other"></slot>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, reactive, ref, watch } from 'vue'
import { IFormItem } from '../types'
import type { ElForm } from 'element-plus'
import HyEditor from '@/base-ui/editor'

interface IProps {
  modelValue: any
  formItems: IFormItem[]
  labelWidth: string
  labelPosition: string
  itemStyle: any
  colLayout: any
}

interface FormData {
  [key: string]: any
}

const props = withDefaults(defineProps<IProps>(), {
  colLayout: () => ({
    xl: 6, // >1920px 4个
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  }),
  itemStyle: () => ({}),
  labelWidth: '100px',
  labelPosition: 'top'
})
const emit = defineEmits([
  'changeSelect',
  'changeInput',
  'changeClear',
  'remoteMethod',
  'uploadData',
  'submit'
])
type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()
const formData = reactive<FormData>({})
// 初始化表单数据
watch(
  () => props.formItems,
  () => {
    props.formItems && initFormData()
  },
  { immediate: true }
)

watch(formData, (newVal) => {
  emit('submit', newVal)
})

function initFormData(isReset = false) {
  for (const item of props.formItems) {
    if (item.type === 'checkbox') {
      formData[item.field] = []
    }
    if (isReset) {
      formData[`${item.field}`] = item.defaultValue ?? ''
    }
    formData[`${item.field}`] = item.defaultValue ?? formData[`${item.field}`]
  }
}
// 校验表单数据
const validateForm = () => {
  return new Promise((resolve, reject) => {
    formRef?.value?.validate((valid: boolean) => {
      if (valid) {
        resolve(formData)
      } else reject('校验失败')
    })
  })
}
// 事件处理
// 1. 监听用户enter事件
const handleKeyUp = () => emit('changeInput')
// 2. 监听用户enter回车事件
const handleClear = () => emit('changeClear')
// 3. 监听用户选中事件
/**
 * @param item 当前行数据
 * @param field 用户点击的下拉框
 * @param data 当前行的数据
 */
const handleChangeSelect = (item: any, field: string, data: any) => {
  emit('changeSelect', {
    value: item,
    field: field,
    data: data
  })
}
// 远程搜索事件
const handleRemoteMethod = (item: any, field: string) => {
  emit('remoteMethod', {
    value: item,
    field: field
  })
}
// 上传组件数据获取
const handleUploadData = (data: any, filed: string) => {
  emit('uploadData', {
    value: data,
    field: filed
  })
}

defineExpose({
  formRef,
  validateForm,
  initFormData
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 10px;
  :deep(.el-form--label-top .el-form-item__label) {
    padding: 0 !important;
    line-height: 30px !important;
  }
}
</style>
