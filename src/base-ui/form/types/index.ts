type IFormType =
  | 'input'
  | 'inputRange'
  | 'password'
  | 'select'
  | 'selectRemote'
  | 'date'
  | 'datepicker'
  | 'datetimerange'
  | 'datetime'
  | 'timePicker'
  | 'daterange'
  | 'radio'
  | 'cascader'
  | 'checkbox'
  | 'inputNumber'
  | 'upload'
  | 'timeSelect'
  | 'treeSelect'
  | 'editor'
  | 'textarea'
  | 'switch'
  | 'number'
  | 'divider'
  | 'inputSlot'
  | 'custom'

export interface IOtherOperation {
  valueFormat?: string
  disabled?: boolean
  placeholder?: string
}

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  prop?: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: IOtherOperation
  isHidden?: boolean
  disabled?: boolean
  // 针对区间选择器
  startValue?: any
  endValue?: any
  // 配置默认值
  defaultValue?: any
  //  针对是否需要扩展
  prepend?: string
  append?: string
  slotName?: string
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
  title?: string
  subTitle?: string
}
