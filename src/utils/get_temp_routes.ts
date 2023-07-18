import { uid } from 'uid'
import { RouteRecordRaw } from 'vue-router'

export default function getTempRoutes() {
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  return allRoutes.map((i) => {
    return {
      ...i,
      id: uid(),
      url: i.path
    }
  })
}
