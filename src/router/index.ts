import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { localCache } from '@/utils/localCache'
import { firstMenu } from '@/utils/map-menus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/front-login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 导航守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    // 当前系统是否登录，目前不适用
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  // 重定向页面
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
