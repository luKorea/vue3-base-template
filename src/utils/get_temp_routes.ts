import { uid } from 'uid'
import { RouteRecordRaw } from 'vue-router'

export default function getTempRoutes() {
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  const routes = [
    {
      title: '基础组件使用',
      type: 1,
      children: [],
      icon: 'FolderOpened'
    }
  ]
  const childrenList: any[] = allRoutes.map((i) => {
    return {
      ...i,
      id: uid(),
      url: i.path,
      icon: 'FolderOpened'
    }
  })
  for (const item of childrenList) {
    if (item.title.includes('使用')) {
      const selectItem = routes.find((i) => i.type === 1)
      if (selectItem) {
        ;(selectItem.children as any).push(item)
      }
    }
  }
  return routes
}
