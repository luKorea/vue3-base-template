import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '问题管理操作',
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '编号',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'title',
      type: 'input',
      label: '备注',
      placeholder: '请输入备注'
    },
    {
      field: 'typeId',
      type: 'select',
      label: '问题类型',
      placeholder: '请选择问题类型',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择问题类型',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'createTime',
      type: 'datetime',
      label: '发布时间',
      otherOptions: {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        placeholder: '请输入发布时间'
      }
    },
    {
      field: 'state',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      rules: [
        {
          required: true,
          message: '请选择状态',
          trigger: 'blur'
        }
      ],
      options: [
        {
          value: 1,
          title: '显示'
        },
        {
          value: 0,
          title: '不显示'
        }
      ]
    },
    {
      field: 'isHot',
      type: 'select',
      label: '是否热门',
      placeholder: '请选择是否热门',
      options: [
        {
          value: 1,
          title: '是'
        },
        {
          value: 0,
          title: '否'
        }
      ]
    }
  ]
}
